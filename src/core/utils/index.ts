import jiti from 'jiti'

export const logger = require('consola').withScope('@docus')

const _require = jiti(__filename)
export function tryRequire(name) {
  try {
    const _plugin = _require(require.resolve(name))
    return _plugin.default || _plugin
  } catch (e) {
    logger.error(e.toString())
    return null
  }
}
