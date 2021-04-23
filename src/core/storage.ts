import { createStorage, defineDriver, Driver, Storage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'

import { StorageOptions } from '../types'
import { useParser } from './parser'
import { useDB } from './database'
import useHooks from './hooks'
import { logger } from './util'

export interface DocusDriver extends Driver {
  init(): Promise<void>
}

export const docusDriver = defineDriver(options => {
  const { items } = useDB()
  const { callHook } = useHooks()
  const parser = useParser()
  const fs = fsDriver(options)

  const insert = async (key, content) => {
    let document = await parser.parse(key, content)

    const useDefaults = options.defaults?.[key]
    if (useDefaults) {
      document = useDefaults(document)
    }
    // use prefix in document path
    document.path = `/${options.mountPoint}` + document.path

    await callHook('content:file:beforeInsert', document)

    return items.insert({
      key,
      // TODO: Fetch file modified time
      updatedAt: new Date(),
      ...document
    })
  }
  return {
    async init() {
      const keys = await fs.getKeys()
      const tasks = keys.map(async key => {
        const content = await fs.getItem(key)
        await insert(key, content)
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
        item = await insert(key, content)
      }

      return typeof item === 'string' ? JSON.stringify(item) : item
    },
    async setItem(key, value) {
      if (await fs.hasItem(key)) {
        await fs.setItem(key, value)
      }

      await insert(key, value)
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
      return fs.watch(async (event, key) => {
        key = key.replace(/\//g, ':')
        if (event === 'update') {
          await items.removeWhere(doc => doc.key === key)
          const content = await fs.getItem(key)

          await insert(key, content)
        }
        callback(event, key)
      })
    }
  }
})

let _storage: Storage
export function useStorage(options: StorageOptions = undefined) {
  let drivers = []
  if (!_storage) {
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
  }
  return {
    storage: _storage,
    drivers,
    init: async () => Promise.all(drivers.map(d => d.init()))
  }
}
