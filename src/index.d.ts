import { NuxtConfig } from '@nuxt/types'

export * from './types'

// TODO: Remove this once plugins are externalized
export * from './types/github'
export * from './types/social-image'

export declare const withDocus: (_config: NuxtConfig) => NuxtConfig

declare module '@nuxt/types' {
  interface Context {
    docus: any
  }
}
