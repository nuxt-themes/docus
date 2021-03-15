import defu from 'defu'
import { getColors } from 'theme-colors'

const DEFAULT_THEME_COLORS = {
  primary: '#3073F1'
}

const DEFAULT_SETTINGS = {
  title: 'Docus',
  description: '',
  layout: 'docs',
  logo: null,
  url: '',
  github: {
    repo: '',
    branch: '',
    url: 'https://github.com',
    apiUrl: 'https://api.github.com/repos',
    dir: '',
    releases: true
  },
  colors: DEFAULT_THEME_COLORS,
  header: {
    logo: false,
    title: true
  },
  credits: true
}

export function useDefaults (settings = {}) {
  if (typeof settings.github === 'string') {
    settings.github = { repo: settings.github }
  }
  // backward compat for 'single' layout
  if (settings.layout === 'single') {
    settings.layout = 'readme'
  }
  return defu(settings, DEFAULT_SETTINGS)
}

export function useColors (colors) {
  try {
    return Object.entries(colors).map(([key, color]) => [key, getColors(color)])
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Could not parse custom colors:', e.message)
    return Object.entries(DEFAULT_THEME_COLORS).map(([key, color]) => [key, getColors(color)])
  }
}
