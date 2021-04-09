import core from 'puppeteer-core'
import { useProxy } from './puppeteer-proxy'
let _browser
let _page

async function getPage(options) {
  if (!_page) {
    // ensure browser is available
    const remoteBrowser = options.browserWSEndpoint
    if (!_browser) {
      _browser = remoteBrowser ? await core.connect(options) : await core.launch(options)
    }

    // initialize the page
    _page = await _browser.newPage()

    if (remoteBrowser) {
      await useProxy(_page)
    }
  }
  return _page
}

export async function takeScreenshot(options, url, type = 'jpeg') {
  const page = await getPage(options)
  await page.goto(url)
  const file = await page.screenshot({ type })
  return file
}

export async function cleanup() {
  if (_page) {
    await _page.close()
    _page = null
  }
  if (_browser) {
    _browser.close()
    _browser = null
  }
}
