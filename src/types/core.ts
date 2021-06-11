import { Context } from '@nuxt/types'
import { Ref } from '@nuxtjs/composition-api'
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
  // Collapsed aside navigation by default
  collapse: boolean
  // Useful for directories `index.md` which are empty pages, to get redirect to another page
  redirect: string
}
export interface NavItem {
  slug: string
  to: string
  title: string
  shadow: boolean
  draft?: boolean
  template?: {
    self: string
    nested: string
  }
  navigation: NavItemNavigationConfig | false
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

export type DocusCurrentNav = {
  title?: string
  to?: string
  navigation?: NavItemNavigationConfig | false
  parent?: NavItem
  links: NavItem[]
}

export interface DocusDocument {
  // FrontMatter
  title: string
  description: string
  badge: string
  version: number
  fullscreen: boolean
  head: MetaInfo
  position: string
  draft: boolean
  // Navigation
  navigation: {
    title: string
    slot: string
    nested: boolean
    [key: string]: any
  }
  // Template
  template: {
    self: string
    nested: string
    [key: string]: any
  }
  // Layout
  layout: {
    header: boolean
    footer: boolean
    aside: boolean
    asideClass: string
    fluid: boolean
    [key: string]: any
  }
  // Generated
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
  contentDir: string
  description: string
  credits: boolean
  url: string
  template: string
  theme?: T
  [key: string]: any
}

export type DocusState<T = DefaultThemeSettings> = {
  // Core
  currentPage: DocusDocument | null
  settings: DocusSettings<T> | null
  navigation: DocusNavigation
  theme: any
  layout: any
  // Addons
  ui?: any
  lastRelease?: any
}

export interface DocusAddonContext<T = DefaultThemeSettings> {
  ssrContext: Context['ssrContext']
  context: PermissiveContext
  state: DocusState
  settings: DocusSettings<T>
  createQuery: any
  api: ReturnType<typeof useDocusApi>
  $nuxt?: any
}

export type DocusRuntimeInstance<T = DefaultThemeSettings> = {
  settings: Ref<Omit<DocusSettings, 'theme'>>
  navigation: Ref<DocusNavigation>
  theme: Ref<T>
  [key: string]: any
} & ReturnType<typeof useDocusApi>

export interface DocusNavigationGetParameters {
  depth?: number
  locale?: string
  from?: string
  all?: boolean
}

export interface Colors {
  [key: string]: string | Colors
}

//  Storage
export interface DriverOptions {
  ignore?: string[]
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
  remarkPlugins: (string | [string, any])[]
  rehypePlugins: (string | [string, any])[]
}

export interface ParserOptions {
  markdown: Partial<MarkdownParserOptions>
}
