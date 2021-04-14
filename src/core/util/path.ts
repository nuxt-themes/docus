import { resolve } from 'path'
import jiti from 'jiti'
import { logger } from './log'

export const r = (...args: string[]) => resolve(__dirname, '../..', ...args)

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
