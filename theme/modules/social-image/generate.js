import { join } from 'path'
import fs from 'fs'
import { takeScreenshot, cleanup } from './chromium'

function generateName (route) {
  const fileName = route.replace(/^\//, '').replace(/[/]/g, '-') || 'home-page'
  return fileName + '.jpeg'
}

export function setupStaticGeneration (nuxt, options) {
  const { hook } = nuxt
  const queue = []

  hook('generate:done', async () => {
    // create out directory
    fs.mkdirSync(options._outDir)

    await queue.reduce(async (prev, shot) => {
      await prev
      // take shot
      const file = await takeScreenshot(options.chrome, shot.url)
      // write file
      const path = join(options._outDir, shot.fileName)
      await new Promise((resolve, reject) => fs.writeFile(path, file, resolve))
    }, Promise.resolve())

    await cleanup()
  })

  hook('generate:page', (page) => {
    const { route, html } = page
    // exclude social preview page from generation
    if (route === '/social-image-preview') {
      page.exclude = true
      return
    }

    const [, title] = html.match(/<title>([^<]*)<\/title>/)
    const [, description] = html.match(/<meta [^>]* name="description" content="([^"]*)">/)

    queue.push({
      url: `${options.internalUrl}/social-image-preview?title=${encodeURI(title)}&description=${encodeURI(description)}`,
      fileName: generateName(route)
    })
  })
}
