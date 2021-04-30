import { getColors } from 'theme-colors'
import { Colors } from '../../types'

/**
 * Parse color definition from Docus Config.
 */
export function useColors(colors: Colors) {
  try {
    return Object.entries(colors).map(([key, color]) => [key, typeof color === 'string' ? getColors(color) : color])
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Could not parse custom colors:', e.message)
    return []
  }
}

/**
 * Generate a css string from variables definition.
 */
export function useCSSVariables(colors: Colors) {
  const { put, generate } = useCssVariableStore(['dark'])

  const colorsList = useColors(colors)

  colorsList.forEach(([color, map]) =>
    Object.entries(map).forEach(([variant, value]) => put(`${color}-${variant}`, value as string))
  )

  return generate()
}

/**
 * Create a css variable store.
 */
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
