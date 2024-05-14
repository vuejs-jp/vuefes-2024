import { Page } from 'puppeteer'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { goto, screenshot, waitForNavigation, wait } from './util'

const PEATIX_LOGIN_URL = 'https://peatix.com/signin'
const PEATIX_SALES_URL = 'https://peatix.com/event/3927625/list_sales'
const PEATIX_LOGIN_EMAIL = process.env.PEATIX_LOGIN_EMAIL || ''
const PEATIX_LOGIN_PASS = process.env.PEATIX_LOGIN_PASS || ''
const PEATIX_CSV_DOWNLOAD_PATH = process.env.PEATIX_CSV_DOWNLOAD_PATH || ''

export type DownloadCSVResponse = {
  csvText?: string
  errorText?: string
}

/**
 * login
 */
export const login = async (page: Page) => {
  await goto(page, PEATIX_LOGIN_URL)

  if (!PEATIX_LOGIN_EMAIL) {
    throw new Error('NO PEATIX_LOGIN_EMAIL')
  }
  if (!PEATIX_LOGIN_PASS) {
    throw new Error('NO PEATIX_LOGIN_PASS')
  }

  await page.type('input[placeholder="メール"]', PEATIX_LOGIN_EMAIL)
  await page.click('#next-button') // 次に進む
  await waitForNavigation(page)
  await page.type('input[placeholder="パスワード"]', PEATIX_LOGIN_PASS)
  await page.click('#signin-button') // 同意してログイン
  await waitForNavigation(page)
}

/**
 * downloadCSV
 */
export const downloadCSV = async (page: Page): Promise<DownloadCSVResponse> => {
  let fileName = ''
  return new Promise(async (resolveDownload) => {
    await goto(page, PEATIX_SALES_URL)

    const client = await page.target().createCDPSession()
    await client.send('Browser.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: resolve(PEATIX_CSV_DOWNLOAD_PATH),
      eventsEnabled: true,
    })

    client.on('Browser.downloadWillBegin', async ({ url, suggestedFilename }) => {
      fileName = suggestedFilename
    })

    client.on(
      'Browser.downloadProgress',
      async (params: { state: 'inProgress' | 'completed' | 'canceled' }) => {
        if (params.state == 'completed') {
          // clean up
          await client.detach()
          const csvText = await readFile()
          resolveDownload({ csvText })
        } else if (params.state == 'canceled') {
          resolveDownload({ errorText: 'download canceled' })
        }
      },
    )

    await page.click('.js-download-attendances') // 参加者リスト
    await screenshot(page)
  })

  /**
   * csv encoding is utf16le
   */
  async function readFile() {
    const filePath = `${PEATIX_CSV_DOWNLOAD_PATH}/${fileName}`
    return readFileSync(filePath, { encoding: 'utf16le' })
  }
}
