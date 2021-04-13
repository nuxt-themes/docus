import { DocusMakrdownHtmlNode } from './markdown'

export interface GithubRelease {
  name: string
  date: number
  body: DocusMakrdownHtmlNode
}

export interface GithubReleaseOptions {
  apiUrl: string
  repo: string
  token: string
}
