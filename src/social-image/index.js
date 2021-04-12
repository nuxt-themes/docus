import { join, resolve } from 'path'
import defu from 'defu'
import { setupStaticGeneration } from './lib/generate'

const r = (...args) => resolve(__dirname, ...args)

export default function socialImageModule(moduleOptions) {
  const { nuxt, addPlugin } = this
  const { options: nuxtOptions, hook } = nuxt

  // Executable path defaults to MacOS
  // Supports Linux & Win32 too
  let executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  if (process.platform === 'linux') executablePath = '/usr/bin/google-chrome'
  if (process.platform === 'win32') executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'

  const defaults = {
    baseUrl: undefined,
    outDir: '_preview',
    chrome: {
      browserWSEndpoint: undefined,
      defaultViewport: { width: 1280, height: 640 },
      args: [],
      headless: true,
      executablePath
    }
  }

  const options = defu(moduleOptions, nuxt.options.socialImage, defaults)
  options._outDir = join(nuxtOptions.generate.dir, options.outDir)

  hook('listen', (_, listener) => {
    options.internalUrl = `http://localhost:${listener.port}`
  })

  hook('build:extendRoutes', routes => {
    const hasRoute = name => routes.some(route => route.name === name)
    if (!hasRoute('social-image-preview')) {
      routes.unshift({
        path: '/social-image-preview',
        name: 'social-image-preview',
        component: r('components/social-image-preview.vue')
      })
    }
  })

  setupStaticGeneration(nuxt, options)

  addPlugin({
    src: join(__dirname, '/lib/plugin.js'),
    fileName: join('social-image.js'),
    options
  })
}
