import { join, resolve } from 'path'
import defu from 'defu'
import { Module } from '@nuxt/types'
import { SocialImageModuleOptions } from '../types/social-image'
import { setupStaticGeneration } from './generate'

const r = (...args: string[]) => resolve(__dirname, ...args)
interface InternalModuleOptions {
  _outDir: string
  internalUrl: string
}

export default <Module<SocialImageModuleOptions & InternalModuleOptions>>function socialImageModule(moduleOptions) {
  const { nuxt, addPlugin } = this
  const { options: nuxtOptions, hook } = nuxt

  // Executable path defaults to MacOS
  // Supports Linux & Win32 too
  let executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  if (process.platform === 'linux') executablePath = '/usr/bin/google-chrome'
  if (process.platform === 'win32') executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'

  const defaults: SocialImageModuleOptions & InternalModuleOptions = {
    baseUrl: undefined,
    outDir: '_preview',
    _outDir: '',
    internalUrl: '',
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

  hook('listen', (_: any, listener: any) => {
    options.internalUrl = `http://localhost:${listener.port}`
  })

  hook('build:extendRoutes', (routes: any[]) => {
    const hasRoute = (name: string) => routes.some(route => route.name === name)
    if (!hasRoute('social-image-preview')) {
      routes.unshift({
        path: '/social-image-preview',
        name: 'social-image-preview',
        component: r('runtime/pages/social-image-preview.vue')
      })
    }
  })

  setupStaticGeneration(nuxt, options)

  addPlugin({
    src: r('runtime/plugin.mjs'),
    fileName: join('social-image.js'),
    options
  })
}
