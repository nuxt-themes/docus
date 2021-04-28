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

export interface Colors {
  [key: string]: string | Colors
}

export interface Alias {
  [key: string]: string
}
