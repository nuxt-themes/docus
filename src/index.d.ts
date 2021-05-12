import { NuxtConfig } from '@nuxt/types'
import { DocusRuntimeInstance } from './types'

export * from './types'

// TODO: Remove this once plugins are externalized
export * from './types/github'
export * from './types/social-image'

export declare const withDocus: (_config: NuxtConfig) => NuxtConfig

declare module '@nuxt/types' {
  interface Context {
    $docus: DocusRuntimeInstance
  }
}

declare module '@nuxt/types/app' {
  interface Context {
    $docus: DocusRuntimeInstance
  }
}
