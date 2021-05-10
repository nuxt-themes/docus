import { Context } from '@nuxt/types'
import { MetaInfo } from 'vue-meta'
import { useDocusApi } from '../core/runtime/composables/api'
import { DefaultThemeSettings } from '../defaultTheme/index.d'
import { DocusRootNode } from './markdown'

export interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

export interface Toc {
  title: string
  depth: number
  searchDepth: number
  links: TocLink[]
}

// Navigation
export interface NavItemNavigationConfig {
  title: string
  nested: boolean
  slot: string
  exclusive: boolean
}
export interface NavItem {
  slug: string
  to: string
  title: string
  draft?: boolean
  template?: {
    self: string
    nested: string
  }
  navigation: false | NavItemNavigationConfig
  children: NavItem[]
  meta: {
    icon?: string
    description?: string
  }
}

export type PermissiveContext = Context & { [key: string]: any }

export type DocusNavigation = {
  [language: string]: NavItem[]
}

export type DocusState = {
  // Core
  settings: any
  page: any
  navigation: DocusNavigation
  theme: any
  // Addons
  ui: any
  lastRelease: any
}

export interface DocusDocument {
  // font-matter
  title: string
  description: string
  badge: string
  version: number
  fullscreen: boolean
  head: MetaInfo
  position: string
  draft: boolean

  navigation: {
    title: string
    slot: string
    nested: boolean
  }
  template: {
    self: string
    nested: string
  }

  // generated
  key: string
  path: string
  slug: string
  to: string
  toc: false | Toc
  language: string
  body: DocusRootNode
  extension: string
  dir: string
  createdAt: Date
  updatedAt: Date
}

export interface DocusSettings<T = DefaultThemeSettings> {
  title: string
  description: string
  credits: boolean
  logo: string
  url: string
  layout: string
  template: string
  theme?: T
  [key: string]: any
}

export interface DocusAddonContext<T = DefaultThemeSettings> {
  context: PermissiveContext
  state: DocusState
  settings: DocusSettings<T>
  createQuery: any
  api: ReturnType<typeof useDocusApi>
  $nuxt?: any
}

export interface Colors {
  [key: string]: string | Colors
}

//  Storage
export interface DriverOptions {
  mountPoint: string
  base: string
}
export interface StorageOptions {
  drivers: DriverOptions[]
}

export interface MarkdownParserOptions {
  toc: {
    depth: number
    searchDepth: number
  }
  directives: any
  dataComponents: string[]
  remarkPlugins: (string | [string, any])[]
  rehypePlugins: (string | [string, any])[]
}

export interface ParserOptions {
  markdown: Partial<MarkdownParserOptions>
}
