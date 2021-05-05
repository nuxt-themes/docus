import { resolve } from 'path'
import jiti from 'jiti'
import gracefulFs from 'graceful-fs'
import { logger } from './log'

const fs = gracefulFs.promises

export const r = (...args: string[]) => resolve(__dirname, '../..', ...args)

const _require = jiti(__filename)

export function tryRequire(name: string) {
  try {
    const _plugin = _require(require.resolve(name))

    return _plugin.default || _plugin
  } catch (e) {
    logger.error(e.toString())
    return null
  }
}

export function readFile(path: string) {
  return fs.readFile(path, { encoding: 'utf8' })
}

export async function exists(path: string) {
  const pathExists = await fs.stat(path).catch(() => false)

  return !!pathExists
}
