import { DocusRootNode } from './markdown'

export interface GithubRelease {
  name: string
  date: number
  body: DocusRootNode
}

export interface GithubReleaseOptions {
  apiUrl: string
  repo: string
  token: string
}
