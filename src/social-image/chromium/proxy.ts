import fetch from 'node-fetch'
import { HTTPRequest, Page } from 'puppeteer-core'

interface Cache {
    status: number,
    contentType: string | null,
    headers: any,
    body: Buffer
}
const cache: { [url: string]: Cache } = {}

async function _fetch(request: HTTPRequest) {
  const url = request.url()
  let result = cache[url]
  if (!result) {
    const response = await fetch(url, {
      method: request.method(),
      body: request.postData(),
      headers: request.headers()
    })
    result = {
      status: response.status,
      contentType: response.headers.get('content-type'),
      headers: response.headers,
      body: await response.buffer()
    }
    if (request.method() === 'GET') {
      cache[url] = result
    }
  }
  return result
}

export async function useProxy(page: Page) {
  await page.setRequestInterception(true)
  page.on('request', async request => {
    try {
      const response = await _fetch(request)
      await request.respond(response)
    } catch (e) {
      request.abort()
    }
  })
}
