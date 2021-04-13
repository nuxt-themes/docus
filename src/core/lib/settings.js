import defu from 'defu'
import { getColors } from 'theme-colors'

const DEFAULT_THEME_SETTINGS = {
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

const DEFAULT_SETTINGS = {
  title: 'Docus',
  description: '',
  template: 'docs',
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

export function useDefaults(settings = {}) {
  if (typeof settings.github === 'string') {
    settings.github = { repo: settings.github }
  }
  if (settings.layout) {
    // eslint-disable-next-line no-console
    console.warn('`layout` has been renamed to `template` in settings.json')
    settings.template = settings.layout
    delete settings.layout
  }
  return defu(settings, DEFAULT_SETTINGS)
}

export function useDefaultsTheme(settings = {}) {
  return defu(settings, DEFAULT_THEME_SETTINGS)
}

export function useColors(colors, aliases = {}) {
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

export function useCSSVariables(colors, aliases = {}) {
  const { put, generate } = useCssVaribaleStore(['dark'])
  colors = useColors(colors, aliases)
  colors.forEach(([color, map]) => {
    Object.entries(map).forEach(([variant, value]) => put(`${color}-${variant}`, value))
  })
  return generate()
}

function useCssVaribaleStore(scopes = ['dark']) {
  scopes = ['default', ...scopes]
  const _store = scopes.reduce((obj, scope) => ({ [scope]: {}, ...obj }), {})
  const getScope = scope => _store[scope] || null

  const putSingle = key => value => {
    const _arr = value.split(':')
    const _value = _arr.pop()
    const _scope = getScope(_arr.pop() || 'default')
    if (_scope) {
      _scope[key] = _value
    }
  }

  const put = (key, value) => {
    value.split(' ').map(putSingle(key))
  }

  const generateVar = ([key, value]) => `--${key}: ${value}`

  const generateScope = scope => {
    const vars = Object.entries(getScope(scope)).map(generateVar).join(';')
    return scope === 'default' ? `:root {${vars}}` : `html.${scope} {${vars}}`
  }

  const generate = () => scopes.map(generateScope).join(' ')

  return { put, generate }
}
