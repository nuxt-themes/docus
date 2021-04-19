import { DocusMarkdownHtmlNode } from './markdown'

export interface GithubRelease {
  name: string
  date: number
  body: DocusMarkdownHtmlNode
}

export interface GithubReleaseOptions {
  apiUrl: string
  repo: string
  token: string
}
