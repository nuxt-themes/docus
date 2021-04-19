import { BrowserLaunchArgumentOptions, ConnectOptions, LaunchOptions } from 'puppeteer-core'

export interface ScreenshotCandidate {
  route: string
  title: string
  description: string
  imageName: string
}

export interface ScreenshotCandidates {
  [key: string]: ScreenshotCandidate
}

export interface SocialImageModuleOptions {
  baseUrl?: string
  outDir: string
  chrome: (LaunchOptions & BrowserLaunchArgumentOptions) | ConnectOptions
}
