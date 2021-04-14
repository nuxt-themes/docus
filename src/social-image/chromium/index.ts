import { connect, launch, Page, Browser, ConnectOptions } from 'puppeteer-core'
import { useProxy } from './proxy'
let _browser: Browser
let _page: Page

async function getPage(options: ConnectOptions): Promise<Page> {
  if (!_page) {
    // ensure browser is available
    const remoteBrowser = options.browserWSEndpoint
    if (!_browser) {
      _browser = remoteBrowser ? await connect(options) : await launch(options)
    }

    // initialize the page
    _page = await _browser.newPage()

    if (remoteBrowser) {
      await useProxy(_page)
    }
  }
  return _page
}

export async function takeScreenshot(
  options: ConnectOptions,
  url: string,
  type: 'jpeg' | 'png' | undefined = 'jpeg'
): Promise<string | void | Buffer> {
  const page = await getPage(options)
  await page.goto(url)
  const file = await page.screenshot({ type })
  return file
}

export async function cleanup(): Promise<void> {
  if (_page) {
    await _page.close()
  }
  if (_browser) {
    _browser.close()
  }
}
