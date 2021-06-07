import { join } from 'path'
import defu from 'defu'
import { createStorage, defineDriver, Driver, Storage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'
import { promises as FS } from 'graceful-fs'
import { DocusDocument, DriverOptions, StorageOptions } from '../types'
import { useDB } from './database'
import { useHooks, logger, useParser } from './'

export interface DocusDriver extends Driver {
  init(): Promise<void>
}

const isIndex = path => path.endsWith('index.md')
const removeIndex = path => path.replace(/\/index.md$/, '')

// sort keys and put index files at first
function sortItemKeys(keys: string[]) {
  return [...keys].sort((a, b) => {
    const isA = isIndex(a)
    const isB = isIndex(b)
    if (isA && isB) return a.length - b.length
    if (isB) return 1
    if (isA) return -1
    return 0
  })
}

export const docusDriver = defineDriver((options: DriverOptions) => {
  const { insert, items } = useDB()
  const parser = useParser()
  const fs = fsDriver(options)

  const parseAndInsert = async (key, content) => {
    const document = await parser.parse(key, content)

    if (document.extension === '.md') {
      const stats = await FS.stat(join(options.base, document.path + document.extension))
      document.createdAt = stats.birthtime
      document.updatedAt = stats.mtime
    }

    // Keep track of original path of the source file in file system
    document.source = key

    // Unify key format
    document.key = key.replace(/\//g, ':')

    // use prefix in document path
    document.path = `/${options.mountPoint}` + document.path

    // Enrich document layout based on parents data
    const parents = await getItemParents(key)
    document.layout = defu(document.layout, ...parents.map(p => p.layout))

    return insert(document)
  }

  /**
   * retrive parent content of `key`
   * @param key content key
   * @returns list of parent contents
   */
  function getItemParents(key: string): Promise<DocusDocument[]> {
    const parts = removeIndex(key).split('/')
    const tasks = parts.reduce((parents, _part, index) => {
      const path = parts.slice(0, parts.length - 1 - index)
      if (!path.join('/')) return parents
      const parentKey = path.join('/') + '/index.md'
      if (hasItem(parentKey)) {
        parents.unshift(getItem(parentKey))
      }
      return parents
    }, [])

    return Promise.all(tasks)
  }

  // find item children and re-index
  async function revalidateChildren(key: string): Promise<void> {
    const prefix = removeIndex(key)
    const docs = items._data.filter(doc => doc.key.startsWith(prefix) && doc.key !== key)

    const tasks = docs.map(doc => parseAndInsert(doc.key, doc.text))

    await Promise.all(tasks)
  }

  // retrive contents list
  const getKeys = () => fs.getKeys().map(key => key.replace(/:/g, '/'))

  const hasItem = key => fs.hasItem(key)

  const dispose = () => fs.dispose()

  const clear = () => fs.clear()

  // Retrive and item from database
  const getItem = async key => {
    let item = await items.findOne({ key })

    if (!item) {
      const content = await fs.getItem(key)
      item = await parseAndInsert(key, content)
    }

    return item
  }

  // Insert/Update an item
  const setItem = async (key, value) => {
    if (await fs.hasItem(key)) {
      await fs.setItem(key, value)
    }

    await parseAndInsert(key, value)
  }

  // remove single item from directory and database
  const removeItem = async key => {
    await items.removeWhere(doc => doc.key === key)
    return fs.removeItem(key)
  }

  // Read contents and initialize database
  const init = async () => {
    // ensure directory exists
    if (!fs.hasItem('')) {
      return
    }

    // fetch content keys
    let keys = await fs.getKeys()

    // sort keys to parse index files before others
    keys = sortItemKeys(keys)

    const tasks = keys.map(async key => {
      const content = await fs.getItem(key)
      await parseAndInsert(key, content)
    })
    await Promise.all(tasks)
  }

  // Watch files and revalidate data
  const watch = callback => {
    const { callHook } = useHooks()
    return fs.watch(async (event, key) => {
      if (event === 'update') {
        const content = await fs.getItem(key)

        await parseAndInsert(key, content)
      }

      // remove item from database
      if (event === 'remove') {
        await items.removeWhere(doc => doc.source === key)
      }

      // Revalidate childrent of content because parent has changed
      // NOTE: We need to improve this condition, only revalidate children when parental front-matter data changes
      if (isIndex(key)) {
        await revalidateChildren(key)
      }
      callHook('docus:storage:updated', { event, key })
      callback(event, key)
    })
  }

  return {
    hasItem,
    getItem,
    setItem,
    removeItem,
    getKeys,
    clear,
    dispose,
    init,
    watch
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

export async function destroyStorage() {
  await _storage.dispose()
  _storage = null
  drivers = null
}

export function useStorage() {
  return {
    storage: _storage,
    drivers
  }
}
