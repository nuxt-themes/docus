import { $fetch } from 'ohmyfetch'
interface SurroundOptions {
  before: boolean
  after: boolean
}
interface QueryBuilderParams {
  deep: boolean
  text: boolean
  only?: string[]
  without?: string[]
  sortBy?: any[]
  where?: any
  search?: {
    query: any
    value: string
  }
  surround?: {
    slugOrPath: string
    options: SurroundOptions
  }
  limit?: number
  skip?: number
}

export class QueryBuilder {
  private url: string
  private params: QueryBuilderParams
  constructor(url: string, { deep = false, text = false } = {}) {
    this.url = url
    this.params = {
      deep,
      text
    }
  }

  /**
   * Select a subset of fields
   * @param {Array} keys - Array of fields to be picked.
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  only(keys: string[]) {
    this.params.only = keys
    return this
  }

  /**
   * Remove a subset of fields
   * @param {Array} keys - Array of fields to be picked.
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  without(keys: string[]) {
    this.params.without = keys
    return this
  }

  /**
   * Sort results
   * @param {string} field - Field key to sort on.
   * @param {string} direction - Direction of sort (asc / desc).
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  sortBy(field: string, direction: 'asc' | 'desc' = 'asc') {
    this.params.sortBy = this.params.sortBy || []
    this.params.sortBy.push({ [field]: direction })
    return this
  }

  /**
   * Filter results
   * @param {Object} query - Where query.
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  where(query) {
    this.params.where = query
    return this
  }

  /**
   * Search results
   * @param {(Object|string)} query - Search query object or field or search value.
   * @param {string} value - Value of search (means query equals to field).
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  search(query: any, value: string) {
    this.params.search = { query, value }
    return this
  }

  /**
   * Surround results
   * @param {string} slugOrPath - Slug or path of the file to surround.
   * @param {Object} options - Options to surround (before / after).
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  surround(slugOrPath: string, options: SurroundOptions) {
    this.params.surround = { slugOrPath, options }
    return this
  }

  /**
   * Limit number of results
   * @param {number} n - Limit number.
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  limit(n: number) {
    this.params.limit = n
    return this
  }

  /**
   * Skip number of results
   * @param {number} n - Skip number.
   * @returns {QueryBuilder} Returns current instance to be chained
   */
  skip(n: number) {
    this.params.skip = n
    return this
  }

  /**
   * Call server middleware with generated params
   * @returns {(Object|Array)} Returns processed data
   */
  fetch<T>(): Promise<T> {
    return $fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(this.params),
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
