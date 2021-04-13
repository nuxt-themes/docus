import { BrowserLaunchArgumentOptions, ConnectOptions, LaunchOptions } from "puppeteer-core";

export interface ScreenshotCondidates {
    [key: string]: ScreenshotCondidate
}

export interface ScreenshotCondidate {
    route: string
    title: string
    description: string
    imageName: string
}

export interface SocialImageModuleOptions {
    baseUrl?: string,
    outDir: string,
    chrome: (LaunchOptions & BrowserLaunchArgumentOptions) | ConnectOptions 
}