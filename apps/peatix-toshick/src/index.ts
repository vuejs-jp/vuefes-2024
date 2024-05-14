import { launch } from './util'
import { login, downloadCSV } from './peatix'
;(async () => {
  const browser = await launch()
  const page = await browser.newPage()
  await login(page)
  const { csvText, errorText } = await downloadCSV(page)
  if (errorText) {
    throw new Error(`downloadCSV: ${errorText}`)
  }

  console.log('csvText', csvText)
  await browser.close()
})()
