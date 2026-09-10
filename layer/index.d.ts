// `app/types/index.d.ts` is a module, so its `declare module 'nuxt/schema'`
// block is a module augmentation and only applies once something pulls the file
// into the program. Nuxt adds this file to a consumer's `tsconfig` via a
// `/// <reference path>`, so importing it from here is what makes the AppConfig
// types reach apps extending the layer.
import type {} from './app/types'
import type { AssistantModuleOptions } from './modules/assistant'

export interface DocusNuxtConfig {
  assistant?: AssistantModuleOptions
  /** @deprecated Use `agentDiscovery.skills` instead */
  skills?: { dir?: string }
  /** @deprecated Use `agentDiscovery.errors` instead */
  notFound?: boolean
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    docus?: DocusNuxtConfig
    /** @deprecated Use `docus.assistant` instead */
    assistant?: AssistantModuleOptions
  }
  interface NuxtOptions {
    docus?: DocusNuxtConfig
    /** @deprecated Use `docus.assistant` instead */
    assistant?: AssistantModuleOptions
  }
}

declare module 'nuxt/schema' {
  interface NuxtConfig {
    docus?: DocusNuxtConfig
    /** @deprecated Use `docus.assistant` instead */
    assistant?: AssistantModuleOptions
  }
  interface NuxtOptions {
    docus?: DocusNuxtConfig
    /** @deprecated Use `docus.assistant` instead */
    assistant?: AssistantModuleOptions
  }
}
