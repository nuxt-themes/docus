import { join } from 'path'
import defu from 'defu'
import { setupStaticGeneration } from './generate'

export default function socialImageModule (moduleOptions) {
  const { nuxt, addPlugin } = this
  const { options: nuxtOptions } = nuxt

  const defaults = {
    baseUrl: undefined,
    outDir: '_preview',
    chrome: {
      browserWSEndpoint: undefined,
      defaultViewport: { width: 1280, height: 640 },
      args: [],
      headless: true,
      executablePath: process.platform === 'win32'
        ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        : process.platform === 'linux'
          ? '/usr/bin/google-chrome'
          : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    }
  }

  const options = defu(moduleOptions, nuxt.options.socialImage, defaults)
  options._outDir = join(nuxtOptions.generate.dir, options.outDir)

  nuxt.hook('listen', (_, listener) => {
    options.internalUrl = `http://localhost:${listener.port}`
  })

  setupStaticGeneration(nuxt, options)

  addPlugin({
    src: join(__dirname, 'plugin.js'),
    fileName: join('social-image.js'),
    options
  })
}
