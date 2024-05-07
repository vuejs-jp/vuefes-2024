import { Page } from 'puppeteer'

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
