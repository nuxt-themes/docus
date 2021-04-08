import { join, resolve } from 'path'
import defu from 'defu'
import { setupStaticGeneration } from './generate'

const r = (...args) => resolve(__dirname, ...args)

export default function socialImageModule (moduleOptions) {
  const { nuxt, addPlugin } = this
  const { options: nuxtOptions, hook } = nuxt

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

  hook('listen', (_, listener) => {
    options.internalUrl = `http://localhost:${listener.port}`
  })

  hook('build:extendRoutes', (routes) => {
    const hasRoute = name => routes.some(route => route.name === name)
    if (!hasRoute('social-image-preview')) {
      routes.unshift({
        path: '/social-image-preview',
        name: 'social-image-preview',
        component: r('pages/social-image-preview.vue')
      })
    }
  })

  setupStaticGeneration(nuxt, options)

  addPlugin({
    src: join(__dirname, 'plugin.js'),
    fileName: join('social-image.js'),
    options
  })
}
