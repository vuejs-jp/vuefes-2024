import { Page } from 'puppeteer'
import { goto, screenshot, waitForNavigation } from './util'

const PEATIX_LOGIN_URL = 'https://peatix.com/signin'
const PEATIX_SALES_URL = 'https://peatix.com/event/3927625/list_sales'
const PEATIX_LOGIN_EMAIL = process.env.PEATIX_LOGIN_EMAIL
const PEATIX_LOGIN_PASS = process.env.PEATIX_LOGIN_PASS
const PEATIX_CSV_DOWNLOAD_PATH = process.env.PEATIX_CSV_DOWNLOAD_PATH

/**
 * login
 */
export const login = async (page: Page) => {
  await goto(page, PEATIX_LOGIN_URL)

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
export const downloadCSV = async (page: Page) => {
  await goto(page, PEATIX_SALES_URL)

  const client = await page.target().createCDPSession()
  await client.send('Browser.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: PEATIX_CSV_DOWNLOAD_PATH,
    eventsEnabled: true,
  })

  await page.click('.js-download-attendances') // 参加者リスト
  await screenshot(page)
}
