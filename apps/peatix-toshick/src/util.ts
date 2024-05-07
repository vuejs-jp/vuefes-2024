import puppeteer from 'puppeteer'
import type { Page } from 'puppeteer'

export const launch = async () => {
  const browser = await puppeteer.launch({
    executablePath:
      './chrome/mac_arm-124.0.6367.91/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
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

export const goto = async (page: Page, url: string) => {
  await page.setViewport({
    width: 1024,
    height: 768,
  })

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  })
}

export const screenshot = async (page: Page) => {
  await page.screenshot({ path: './screenshots/debug.png', fullPage: true })
}

export const waitForNavigation = async (page: Page) => {
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
}

export const debugText = async (page: Page, selector: string) => {
  const text = await page.$eval(selector, (el: HTMLElement) => el.innerText)
  console.log('text', text)
}
