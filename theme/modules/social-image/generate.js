import { join } from 'path'
import fs from 'fs'
import { takeScreenshot, cleanup } from './chromium'

export function setupStaticGeneration (nuxt, options) {
  const { hook } = nuxt
  const images = {}

  hook('vue-renderer:context', (ssrContext) => {
    ssrContext.addSocialImage = (options) => { images[options.imageName] = options }
  })

  hook('generate:done', async () => {
    // create out directory
    fs.mkdirSync(options._outDir)

    await Object.values(images).reduce(async (prev, shot) => {
      await prev
      const url = `${options.internalUrl}/social-image-preview?path=${shot.route}&title=${shot.title}&description=${shot.description}`
      // take shot
      const file = await takeScreenshot(options.chrome, url)
      // write file
      const path = join(options._outDir, shot.imageName)
      await new Promise((resolve, reject) => fs.writeFile(path, file, resolve))
    }, Promise.resolve())

    await cleanup()
  })

  hook('generate:page', (page) => {
    const { route } = page

    // exclude social preview page from generation
    if (route === '/social-image-preview') {
      page.exclude = true
    }
  })
}
