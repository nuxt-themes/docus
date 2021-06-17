const pick = keys => obj =>
  Object.keys(obj)
    .filter(key => keys.includes(key))
    .reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {})

const omit = keys => obj =>
  Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {})

const apply = fn => data => Array.isArray(data) ? data.map(item => fn(item)) : fn(data)

export class QueryBuilder {
  private query: any
  private path: string
  private init: any
  private postprocess: Array<(data: any) => any>
  private options: any
  private onlyKeys: string[]
  private withoutKeys: string[]
  private sortKeys = []

  constructor({ query, path, init, text, postprocess = [] }, options) {
    this.query = query
    this.path = path
    this.init = init
    this.postprocess = postprocess
    this.options = options || {}
    this.onlyKeys = null
    this.withoutKeys = null
    this.sortKeys = []

    if (!text) {
      // Remove text field from response
      this.postprocess.unshift(apply(omit(['text'])))
    }
  }

  /**
   * Select a subset of fields
   * @param {Array} keys - Array of fields to be picked.
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  only(keys) {
    // Assign keys to this.onlyKeys to be processed in fetch
    this.onlyKeys = Array.isArray(keys) ? keys : [keys]
    // Return current instance
    return this
  }

  /**
   * Remove a subset of fields
   * @param {Array} keys - Array of fields to be picked.
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  without(keys) {
    // Assign keys to this.withoutKeys to be processed in fetch
    this.withoutKeys = Array.isArray(keys) ? keys : [keys]
    // Return current instance
    return this
  }

  /**
   * Sort results
   * @param {string} field - Field key to sort on.
   * @param {string} direction - Direction of sort (asc / desc).
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  sortBy(field, direction) {
    this.sortKeys.push([field, direction === 'desc'])
    return this
  }

  /**
   * Filter results
   * @param {object} query - Where query.
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  where(query) {
    this.query = this.query.find(query)
    return this
  }

  /**
   * Search results
   * @param {(Object|string)} query - Search query object or field or search value.
   * @param {string} value - Value of search (means query equals to field).
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  search(query, value = undefined) {
    // Passing an empty or falsey value as query will avoid triggering a search to allow optional chaining
    if (!query) {
      return this
    }

    let $fts

    if (typeof query === 'object') {
      $fts = query
    } else if (value) {
      $fts = {
        query: {
          type: 'match',
          field: query,
          value,
          prefix_length: 1,
          fuzziness: 1,
          extended: true,
          minimum_should_match: 1
        }
      }
    } else {
      $fts = {
        query: {
          type: 'bool',
          should: this.options.fullTextSearchFields.map(field => ({
            type: 'match',
            field,
            value: query,
            prefix_length: 1,
            operator: 'and',
            minimum_should_match: 1,
            fuzziness: 1,
            extended: true
          }))
        }
      }
    }

    this.query = this.query.find({ $fts }).sortByScoring()

    return this
  }

  /**
   * Surround results
   * @param {string} slugOrPath - Slug or path of the file to surround.
   * @param {Object} options - Options to surround (before / after).
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  surround(slugOrPath, { before = 1, after = 1 } = {}) {
    const _key = slugOrPath.indexOf('/') === 0 ? 'path' : 'slug'

    // Add slug or path to onlyKeys if only method has been called before
    if (this.onlyKeys) {
      this.onlyKeys.push(_key)
    }
    // Remove slug or path from withoutKeys if without method has been called before
    if (this.withoutKeys) {
      this.withoutKeys = this.withoutKeys.filter(key => key !== _key)
    }

    const fn = data => {
      const index = data.findIndex(item => item[_key] === slugOrPath)
      const slice = new Array(before + after).fill(null, 0)
      if (index === -1) {
        return slice
      }

      const prevSlice = data.slice(index - before, index)
      const nextSlice = data.slice(index + 1, index + 1 + after)

      let prevIndex = 0
      for (let i = before - 1; i >= 0; i--) {
        slice[i] = prevSlice[prevIndex] || null
        prevIndex++
      }

      let nextIndex = 0
      for (let i = before; i <= after; i++) {
        slice[i] = nextSlice[nextIndex] || null
        nextIndex++
      }

      return slice
    }

    this.postprocess.push(fn)
    return this
  }

  /**
   * Limit number of results
   * @param {number} n - Limit number.
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  limit(n) {
    if (typeof n === 'string') {
      n = parseInt(n)
    }

    /**
     * Use post processes instead of `query.limit`
     * `query.limit` does not respect items sorted order if there is not filtering codition
     */
    this.postprocess.push(docs => docs.slice(0, n))
    return this
  }

  /**
   * Skip number of results
   * @param {number} n - Skip number.
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  skip(n) {
    if (typeof n === 'string') {
      n = parseInt(n)
    }

    this.query = this.query.offset(n)
    return this
  }

  /**
   * Collect data and apply process filters
   * @returns {(Object|Array)} Returns processed data
   */
  // eslint-disable-next-line require-await
  async fetch() {
    if (this.sortKeys && this.sortKeys.length) {
      this.query = this.query.compoundsort(this.sortKeys)
    }

    // Collect data without meta fields
    let data = this.query.data({ removeMeta: true })
    // Handle only keys
    if (this.onlyKeys) {
      // Add `path` and `extension` to onlyKeys if watch to ensure live edit
      if (this.options.watch) {
        this.onlyKeys.push('path', 'extension')
      }

      // Map data and returns object picked by keys
      const fn = apply(pick(this.onlyKeys))

      // Apply pick during postprocess
      this.postprocess.unshift(fn)
    }
    // Handle without keys
    if (this.withoutKeys) {
      // Remove `path` and `extension` from withoutKeys if watch to ensure live edit
      if (this.options.watch) {
        this.withoutKeys = this.withoutKeys.filter(key => !['path', 'extension'].includes(key))
      }
      // Map data and returns object picked by keys
      const fn = apply(omit(this.withoutKeys))

      // Apply pick during postprocess
      this.postprocess.unshift(fn)
    }
    // Apply postprocess fns to data
    for (const fn of this.postprocess) {
      data = fn(data)
    }

    if (!data) {
      throw new Error(`${this.path} not found`)
    }

    return JSON.parse(JSON.stringify(data))
  }
}
