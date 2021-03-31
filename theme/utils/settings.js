import defu from 'defu'
import { getColors } from 'theme-colors'

const DEFAULT_THEME_SETTINGS = {
  colors: {
    default: {
      primary: '#3073F1',
      prism: {
        foreground: 'inherit',
        background: '#fbfbfb',
        class: '#9807af',
        builtin: '#9807af',
        function: '#9807af',

        keyword: '#096d7c',

        string: '#679c0d',
        number: '#679c0d',
        selector: '#679c0d',
        boolean: '#679c0d',

        property: '#078ce5',

        punctuation: '#078ce5',

        comment: '#758575',
        literal: '#429988',
        variable: 'inherit',
        constant: '#9807af',
        deleted: '#a14f55',
        namespace: '#9807af',
        decorator: '#9807af',
        regex: '#679c0d',
        'json-property': '#078ce5',
        'line-number': '#888888',
        'line-number-gutter': '#eeeeee',
        'line-highlight-background': '#444444',
        'selection-background': '#444444'
      }
    },
    dark: {
      prism: {
        scheme: 'dark',
        foreground: 'inherit',
        background: '#1e1e1e',

        class: '#E879F9',
        builtin: '#E879F9',
        function: '#E879F9',

        keyword: '#22D3EE',

        string: '#BEF264',
        number: '#BEF264',
        selector: '#BEF264',
        boolean: '#BEF264',

        property: '#E0F2FE',
        punctuation: '#E0F2FE',

        comment: '#a0ada0',
        literal: '#2f8a89',
        constant: '#E879F9',
        deleted: '#a14f55',
        namespace: '#E879F9',
        decorator: '#E879F9',
        regex: '#BEF264',
        'json-property': '#22D3EE',
        'line-number': '#888888',
        'line-number-gutter': '#eeeeee',
        'line-highlight-background': '#444444',
        'selection-background': '#444444'
      }
    }
  }
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

export function useDefaultsTheme (settings = {}) {
  return defu(settings, DEFAULT_THEME_SETTINGS)
}

export function useColors (colors) {
  try {
    return Object.entries(colors).map(([key, color]) => [key, typeof color === 'string' ? getColors(color) : color])
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Could not parse custom colors:', e.message)
    return []
  }
}

export function useCSSVariables (colors) {
  return colors.map(([color, map]) => {
    return Object.entries(map).map(([variant, value]) => {
      return `--${color}-${variant}: ${value};`
    }).join('')
  }).join('')
}
