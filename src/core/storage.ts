import { join } from 'path'
import { createStorage, defineDriver, Driver, Storage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'
import { promises as FS } from 'graceful-fs'
import { DriverOptions, StorageOptions } from '../types'
import { useDB } from './database'
import { useHooks, logger, useParser } from './'

export interface DocusDriver extends Driver {
  init(): Promise<void>
}

export const docusDriver = defineDriver((options: DriverOptions) => {
  const { insert, items } = useDB()
  const parser = useParser()
  const fs = fsDriver(options)

  const parseAndIndex = async (key, content) => {
    // unify key format
    key = key.replace(/\//g, ':')

    // ignore vue files
    if (key.endsWith('.vue')) {
      return null
    }

    const document = await parser.parse(key, content)

    if (document.extension === '.md') {
      const stats = await FS.stat(join(options.base, document.path + document.extension))
      document.createdAt = stats.birthtime
      document.updatedAt = stats.mtime
    }

    document.key = key
    // use prefix in document path
    document.path = `/${options.mountPoint}` + document.path

    return insert(document)
  }
  return {
    async init() {
      // ensure directory exists
      if (!fs.hasItem('')) {
        return
      }
      const keys = await fs.getKeys()
      const tasks = keys.map(async key => {
        const content = await fs.getItem(key)
        await parseAndIndex(key, content)
      })
      await Promise.all(tasks)
    },
    hasItem(key) {
      return fs.hasItem(key)
    },
    async getItem(key) {
      let item = await items.findOne({ key })

      if (!item) {
        const content = await fs.getItem(key)
        item = await parseAndIndex(key, content)
      }

      return item
    },
    async setItem(key, value) {
      if (await fs.hasItem(key)) {
        await fs.setItem(key, value)
      }

      await parseAndIndex(key, value)
    },
    async removeItem(key) {
      await items.removeWhere(doc => doc.key === key)
      return fs.removeItem(key)
    },
    getKeys() {
      return fs.getKeys()
    },
    clear() {
      return fs.clear()
    },
    dispose() {
      return fs.dispose()
    },
    watch(callback) {
      const { callHook } = useHooks()
      return fs.watch(async (event, key) => {
        if (event === 'update') {
          const content = await fs.getItem(key)

          await parseAndIndex(key, content)

          callHook('docus:storage:updated', { event, key })
        }
        callback(event, key)
      })
    }
  }
})

let _storage: Storage
let drivers: DocusDriver[]
export function initStorage(options: StorageOptions) {
  drivers = []
  _storage = createStorage()

  if (!options?.drivers) {
    logger.warn('No driver specified for storage')
  } else {
    drivers = options.drivers.map(options => {
      const driver = docusDriver(options) as DocusDriver
      _storage.mount(options.mountPoint, driver)
      return driver
    })
  }

  return {
    storage: _storage,
    drivers,
    lazyIndex: () => Promise.all(drivers.map(d => d.init()))
  }
}

export function useStorage() {
  return {
    storage: _storage,
    drivers
  }
}
