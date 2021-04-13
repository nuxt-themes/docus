import { join } from 'path'
import fs from 'fs'
import { takeScreenshot, cleanup } from './chromium'
import { ScreenshotCondidate, ScreenshotCondidates, SocialImageModuleOptions } from 'types/social-image'

interface InternalModuleOptions {
  _outDir: string
  internalUrl: string
}

export function setupStaticGeneration(nuxt: any, options: SocialImageModuleOptions & InternalModuleOptions) {
  const { hook } = nuxt
  const images: ScreenshotCondidates = {}

  hook('vue-renderer:context', (ssrContext: any) => {
    ssrContext.addSocialImage = (shot: ScreenshotCondidate) => {
      images[shot.imageName] = shot
    }
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
      if (file) {
        await new Promise(resolve => fs.writeFile(path, file, resolve))
      }
    }, Promise.resolve())

    await cleanup()
  })

  hook('generate:page', (page: { route: string, exclude: boolean }) => {
    const { route } = page

    // exclude social preview page from generation
    if (route === '/social-image-preview') {
      page.exclude = true
    }
  })
}
