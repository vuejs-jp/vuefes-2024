import { launch } from './util'
import { login, downloadCSV } from './peatix'
;(async () => {
  const browser = await launch()
  const page = await browser.newPage()
  await login(page)
  await downloadCSV(page)

  await browser.close()
})()
