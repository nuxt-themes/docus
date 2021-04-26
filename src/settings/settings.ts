import defu from 'defu'
import { getColors } from 'theme-colors'
import { Alias, Colors, DocusSettings } from '../types/core'

export const DEFAULT_THEME_SETTINGS = {
  colors: {
    primary: '#3073F1',
    code: {
      foreground: 'inherit',
      background: '#fbfbfb dark:#1e1e1e',
      class: '#9807af dark:#E879F9',
      builtin: '#9807af dark:#E879F9',
      function: '#9807af dark:#E879F9',

      keyword: '#096d7c dark:#22D3EE',

      string: '#679c0d dark:#BEF264',
      number: '#679c0d dark:#BEF264',
      selector: '#679c0d dark:#BEF264',
      boolean: '#679c0d dark:#BEF264',

      property: '#078ce5 dark:#E0F2FE',

      punctuation: '#078ce5 dark:#E0F2FE',

      comment: '#758575 dark:#a0ada0',
      literal: '#429988 dark:#2f8a89',
      variable: 'inherit',
      constant: '#9807af dark:#E879F9',
      deleted: '#a14f55 #a14f55',
      namespace: '#9807af dark:#E879F9',
      decorator: '#9807af dark:#E879F9',
      regex: '#679c0d dark:#BEF264',
      'json-property': '#078ce5 dark:#22D3EE',
      'line-number': '#888888',
      'line-number-gutter': '#eeeeee',
      'line-highlight-background': '#444444',
      'selection-background': '#444444'
    }
  }
}

export const DEFAULT_SETTINGS: DocusSettings = {
  title: 'Docus',
  description: '',
  template: 'docs',
  logo: '',
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
  layout: '',
  credits: true
}

export function useDefaults(settings: Partial<DocusSettings> = {}): DocusSettings {
  if (typeof settings.github === 'string') {
    settings.github = defu(DEFAULT_SETTINGS.github, { repo: settings.github })
  }
  if (settings.layout) {
    // eslint-disable-next-line no-console
    console.warn('`layout` has been renamed to `template` in settings.json')
    settings.template = settings.layout
    delete settings.layout
  }
  return defu(settings as DocusSettings, DEFAULT_SETTINGS)
}

export function useDefaultsTheme(settings = {}) {
  return defu(settings, DEFAULT_THEME_SETTINGS)
}

export function useColors(colors: Colors, aliases: Alias = {}) {
  try {
    return Object.entries(colors).map(([key, color]) => [
      aliases[key] || key,
      typeof color === 'string' ? getColors(color) : color
    ])
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Could not parse custom colors:', e.message)
    return []
  }
}

export function useCSSVariables(colors: Colors, aliases: Alias = {}) {
  const { put, generate } = useCssVaribaleStore(['dark'])
  const colorsList = useColors(colors, aliases)
  colorsList.forEach(([color, map]) => {
    Object.entries(map).forEach(([variant, value]) => put(`${color}-${variant}`, value as string))
  })
  return generate()
}

function useCssVaribaleStore(scopes = ['dark']) {
  scopes = ['default', ...scopes]
  const _store = scopes.reduce((obj, scope) => ({ [scope]: {}, ...obj }), {} as any)
  const getScope = (scope: string) => _store[scope] || null

  const putSingle = (key: string) => (value: string) => {
    const _arr = value.split(':')
    const _value = _arr.pop()
    const _scope = getScope(_arr.pop() || 'default')
    if (_scope) {
      _scope[key] = _value
    }
  }

  const put = (key: string, value: string) => {
    value.split(' ').map(putSingle(key))
  }

  const generateVar = ([key, value]: [string, any]) => `--${key}: ${value}`

  const generateScope = (scope: string) => {
    const vars = Object.entries(getScope(scope)).map(generateVar).join(';')
    return scope === 'default' ? `:root {${vars}}` : `html.${scope} {${vars}}`
  }

  const generate = () => scopes.map(generateScope).join(' ')

  return { put, generate }
}
