import defu from 'defu'
import { getColors } from 'theme-colors'

const DEFAULT_THEME_COLORS = {
  primary: '#06B6D4',
  code: '#8B5CF6'
}

const DEFAULT_SETTINGS = {
  title: 'Docus',
  layout: 'docs',
  url: '',
  github: {
    repo: '',
    branch: '',
    url: 'https://github.com',
    apiUrl: 'https://api.github.com/repos',
    dir: '',
    releases: true
  },
  colors: DEFAULT_THEME_COLORS
}

export function useDefaults (settings) {
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
