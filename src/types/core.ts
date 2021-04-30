import { Context } from '@nuxt/types'
import { useDocusApi } from 'src/core/runtime/composables/api'
import { MetaInfo } from 'vue-meta'
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
export type PermissiveContext = Context & { [key: string]: any }

export type DocusState = {
  // Core
  settings: any
  page: any
  categories: any
  navigation: any
  theme: any
  // Addons
  ui: any
  lastRelease: any
}

export interface DocusDocument {
  // font-matter
  title: string
  description: string
  category: string
  badge: string
  version: number
  menuTitle: string
  menu: boolean
  fullscreen: boolean
  head: MetaInfo
  position: string
  draft: boolean

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
