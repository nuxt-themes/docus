
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['github']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['github']?: ModuleOptions }
}


export { default } from './module'
