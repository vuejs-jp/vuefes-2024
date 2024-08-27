import { Injectable, Logger } from '@nestjs/common'
import puppeteer, { Browser, HTTPRequest, Page, Target } from 'puppeteer'

interface BrowserAndPage {
  browser: Browser;
  page: Page;
}

export const symbol = Symbol('PuppeteerService')

export interface IPuppeteerService {
  generateBrowser(): Promise<Browser>;
  generate(
    requestHandler?: (request: HTTPRequest) => void,
  ): Promise<BrowserAndPage>;
}

@Injectable()
export class PuppeteerService implements IPuppeteerService {
  private readonly logger = new Logger(PuppeteerService.name)

  constructor() {}

  async generateBrowser(): Promise<Browser> {
    const browser = await puppeteer.launch({
      headless: process.env.DEBUG === 'true' ? false : 'new',
      devtools: process.env.DEBUG === 'true',
      handleSIGTERM: process.env.PROD !== 'true',
      handleSIGINT: process.env.PROD !== 'true',
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      ],
    })

    return browser
  }

  async generate(
    requestHandler?: (request: HTTPRequest) => void,
  ): Promise<BrowserAndPage> {
    const browser = await this.generateBrowser()

    const page = await browser.newPage()
    if (!page) throw new Error('Tab is not created.')

    if (!requestHandler) return { browser, page }
  
    browser.on('targetcreated', async (target: Target) => {
      const page = await target.page()
      if (!page) {
        return
      }
      await page.setRequestInterception(true)
      page.on('request', requestHandler)
    })

    return { browser, page }
  }
}
