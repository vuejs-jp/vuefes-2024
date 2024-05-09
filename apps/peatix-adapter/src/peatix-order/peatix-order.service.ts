import type { Peatix, PeatixCsv } from '@vuejs-jp/model'
import { Injectable, Logger } from '@nestjs/common'
import { match } from 'ts-pattern'
import { Page } from 'puppeteer'
import { Constants } from '../constnats'
import { EnvService } from '../env/env.service'
import { IPuppeteerService } from '../puppeteer/puppeteer.service'
import { Selectors } from '../selectors'
import { promises, readFileSync } from 'fs'
import { ScraperPage } from '../scraper-page/scraper-page'
import { HttpService } from '@nestjs/axios'
import { JSON_USAGE, PUPPETEER_USAGE } from '../features'

const { parse } = require('csv-parse/sync')

@Injectable()
export class PeatixOrderService extends ScraperPage {
  private readonly logger = new Logger(PeatixOrderService.name)

  constructor(
    envService: EnvService,
    puppeteerService: IPuppeteerService,
    private readonly httpService: HttpService,
  ) {
    super(envService, puppeteerService)
  }

  private async login(page: Page) {
    await page.goto(Constants.PEATIX_LOGIN_URL, {
      waitUntil: 'domcontentloaded',
    })
    await page.type(
      Selectors.ORDERS.PEATIX.SEARCH_INPUT_EMAIL,
      this.envService.PEATIX_BASIC_EMAIL,
    )
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click(Selectors.ORDERS.PEATIX.NEXT_EXECUTE),
    ])

    await page.type(
      Selectors.ORDERS.PEATIX.SEARCH_INPUT_PASSWORD,
      this.envService.PEATIX_BASIC_PASSWORD,
    )
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click(Selectors.ORDERS.PEATIX.SEARCH_EXECUTE),
    ])
  }

  private async download(page: Page) {
    await page.goto(
      `${Constants.PEATIX_DASHBOARD_URL}${this.envService.PEATIX_EVENT_ID}/list_sales`,
      {
        waitUntil: 'domcontentloaded',
      },
    )
  
    // const downloadPath = await mkdtemp(join(tmpdir(), 'attendee'));
    const downloadPath = 'attendee'

    const client = await page.target().createCDPSession()
    await client.send('Browser.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath,
      eventsEnabled: true,
    })

    const downloaded = new Promise<PeatixCsv[]>((resolve, reject) => {
      client.on(
        'Browser.downloadProgress',
        (params: { state: 'inProgress' | 'completed' | 'canceled' }) => {
          match(params.state)
            .with('completed', async () => {
              this.logger.log('Attendee: CSV download completed')

              const filenames = await promises.readdir(downloadPath)
              if (filenames.length === 0) {
                throw new Error('Attendee: could not download the CSV file')
              }

              this.logger.log(
                `${downloadPath}/${filenames[filenames.length - 1]}`,
              )

              const buffer = readFileSync(
                `${downloadPath}/${filenames[filenames.length - 1]}`,
                { encoding: 'utf16le' },
              )
              const options = {
                delimiter: '\t',
                columns: true,
                relax_column_count: true,
                relax_quotes: true,
              }
              const { err } = this.canParse(buffer, options)
              if (err !== null) {
                this.logger.error(err)
                throw new Error('Attendee: could not parse the CSV file')
              }

              const rows: PeatixCsv[] = parse(buffer, options)

              this.logger.log(rows)

              resolve(rows)
            })
            .with('canceled', () => {
              this.logger.error('Attendee: CSV download canceled')
              reject('Attendee: CSV download canceled')  
            })
            .with('inProgress', () => {
              this.logger.log('Attendee: CSV download in progress')
            })
            .exhaustive()
        },
      )
    })

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click(Selectors.ORDERS.PEATIX.DOWNLOAD_EXECUTE),
    ])

    await Promise.race([
      downloaded,
      new Promise((resolve, reject) => {
        setTimeout(
          () => reject('Attendee: downloading the CSV file timed out'),
          100000,
        )
      }),
    ])
  }

  private async fetchJson<T>() {
    return await this.httpService
      .axiosRef
      .get<T>(`${Constants.PEATIX_DASHBOARD_URL}${this.envService.PEATIX_EVENT_ID}/get_view_data`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data)
      })
  }

  private canParse(data, options) {
    try {
      parse(data, options)
      return { ok: true, err: null }
    } catch (err) {
      return { ok: false, err }
    }
  }

  async getOrders() {
    const { browser, page } = await this.puppeteerService.generate(
      (request) => {
        this.handleRequest(request)
      },
    )

    try {
      let attendees = []

      if (PUPPETEER_USAGE) {
        await this.login(page)
        await this.download(page)
      }

      if (JSON_USAGE) {
        const res = await this.fetchJson<{ json_data: Peatix }>()
        attendees = res.json_data.event.attendees
        this.logger.log(res)
      }

      this.logger.log(attendees)

      await browser.close()

      return attendees
    } catch (e) {
      this.logger.error(e)

      await browser.close()

      return []
    }
  }
}
