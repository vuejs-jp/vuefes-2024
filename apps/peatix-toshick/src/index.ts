import puppeteer from 'puppeteer'
import { login } from './peatix'

// (async () => {
//   // Launch the browser and open a new blank page
//   const browser = await puppeteer.launch({
//     executablePath:
//       "./chrome/mac_arm-124.0.6367.91/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
//   });
//   const page = await browser.newPage();
//   // Navigate the page to a URL
//   await page.goto("https://developer.chrome.com/");
//   const text = await page.$eval("h2", (el) => el.innerText);
//   console.log("text", text);
//   await browser.close();
// })();

;(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    executablePath:
      './chrome/mac_arm-124.0.6367.91/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  })
  const page = await browser.newPage()
  await login(page)
  // Navigate the page to a URL
  // await page.goto("https://developer.chrome.com/");
  // const text = await page.$eval("h2", (el) => el.innerText);
  // console.log("text", text);
  await browser.close()
})()
