import { Page } from 'puppeteer'
import { goto, screenshot } from './util'

const PEATIX_LOGIN_URL = 'https://peatix.com/signin'
const PEATIX_DASHBOARD_URL = 'https://peatix.com/event/'
const PEATIX_LOGIN_EMAIL = process.env.PEATIX_LOGIN_EMAIL
const PEATIX_LOGIN_PASS = process.env.PEATIX_LOGIN_PASS

export const login = async (page: Page) => {
  await goto(page, PEATIX_LOGIN_URL)

  await screenshot(page)

  // const text = await page.$eval(".email-signin-title", (el: HTMLElement) => el.innerText);
  // console.log("text", text);

  // await page.type(
  //   Selectors.ORDERS.PEATIX.SEARCH_INPUT_EMAIL,
  //   this.envService.PEATIX_BASIC_EMAIL,
  // )
  // await Promise.all([
  //   page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  //   page.click(Selectors.ORDERS.PEATIX.NEXT_EXECUTE),
  // ])

  // await page.type(
  //   Selectors.ORDERS.PEATIX.SEARCH_INPUT_PASSWORD,
  //   this.envService.PEATIX_BASIC_PASSWORD,
  // )
  // await Promise.all([
  //   page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  //   page.click(Selectors.ORDERS.PEATIX.SEARCH_EXECUTE),
  // ])
}
