import { getColors } from 'theme-colors'
import { Alias, Colors } from '../../types'

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
  const { put, generate } = useCssVariableStore(['dark'])

  const colorsList = useColors(colors, aliases)

  colorsList.forEach(([color, map]) =>
    Object.entries(map).forEach(([variant, value]) => put(`${color}-${variant}`, value as string))
  )

  return generate()
}

function useCssVariableStore(scopes = ['dark']) {
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
