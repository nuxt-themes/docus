import { join } from 'path'
import { promises as fsPromises } from 'fs'
import defu from 'defu'
import { defineDriver, Driver } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'
import { DocusDocument, DriverOptions } from '../../types'
import { useDB } from '../database'
import { useHooks } from '../hooks'
import { useParser } from '../parser'
import { logger } from '../utils'

export interface DocusDriver extends Driver {
  init(): Promise<void>
}

/**
 * Determine whether it is the index file or not
 *
 * @param path relative to full path of the file
 * @returns
 */
const isIndex = path => path.endsWith('index.md')

/**
 * Removes the index file name and returns directory path
 *
 * @param path relative to full path of the file
 * @returns
 */
const removeIndex = path => path.replace(/\/index.md$/, '')

/**
 * Sort keys and put index files at first
 *
 * @param keys array of files
 * @returns
 */
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
  // force ignore node_modules and .git and files with `.` prefix
  if (options.ignore) {
    options.ignore.push('**/node_modules/**', '**/.git/**', join(options.base, '**/.**/**'))
  }

  const { insert, items } = useDB()
  const { callHook } = useHooks()
  const fs = fsDriver(options)

  const parser = useParser()

  // validate key based on its extension
  const isValidKey = (key: string) => parser.extensions().some(ext => key.endsWith(ext))

  /**
   * parse specific document and insert parsed data into database
   *
   * @param key document file key
   * @param content documnet conent
   * @returns parsed object
   */
  const parseAndInsert = async (key, content) => {
    const document = await parser.parse(key, content)

    if (document.extension === '.md') {
      const stats = await fsPromises.stat(join(options.base, document.path + document.extension))
      document.createdAt = stats.birthtime
      document.updatedAt = stats.mtime
    }

    // Keep track of original path of the source file in file system
    document.source = key

    // Unify key format
    document.key = key

    // Enrich document layout based on parents data
    const parents = await getItemParents(key)
    document.layout = defu(document.layout, ...parents.map(p => p.layout))

    /**
     * Find nearest exclusive parent
     * This document will inherit features from his parents
     * Also parent will be used to group up children in bottom navigation (prev/next page)
     */
    if (document.navigation !== false) {
      const exclusiveParent = parents.find(p => p.navigation?.exclusive)
      if (exclusiveParent) {
        document.navigation = document.navigation || {}
        // Store nearest parent path
        document.navigation.parent = exclusiveParent.path
      }
    }

    // call beforeInsert Hook
    await callHook('docus:storage:beforeInsert', document)

    // use prefix in document path
    document.path = `/${options.mountPoint}` + document.path

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
      const path = parts.slice(0, parts.length - 1 - index).join('/')
      const parentKey = path + '/index.md'
      if (path && hasItem(parentKey)) {
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
  const getKeys = async () => {
    let keys = await fs.getKeys()

    // filter valid keys
    keys = keys.filter(isValidKey)

    return keys
  }

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
    const start = Date.now()
    const end = () => Date.now() - start
    // ensure directory exists
    if (!fs.hasItem('')) {
      return
    }

    // fetch content keys
    let keys = await getKeys()

    // sort keys to parse index files before others
    keys = sortItemKeys(keys)
    const total = keys.length

    while (keys.length) {
      await Promise.all(keys.splice(0, 8).map(key => fs.getItem(key).then(content => parseAndInsert(key, content))))
    }
    logger.info(`${total} files processed in ${end()}ms`)
  }

  // Watch files and revalidate data
  const watch = callback => {
    return fs.watch(async (event, key) => {
      // ignore invalid extensions
      if (!isValidKey(key)) return

      if (event === 'update') {
        const content = await fs.getItem(key)

        await parseAndInsert(key, content)
      }

      // remove item from database
      if (event === 'remove') {
        await removeItem(key)
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
