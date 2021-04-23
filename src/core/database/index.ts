import Loki from '@lokidb/loki'
import QueryBuilder from './QueryBuilder'

let _db
let _items
export const useDB = () => {
  if (!_db) {
    _db = new Loki('content.db')
    _items = _db.addCollection('items', {})
  }
  return {
    db: _db,
    items: _items,
    query: createQuery,
    find,
    insert(data) {
      _items.insert(data)
    }
  }
}

function createQuery (path: string, { deep = false, text = false } = {}) {
  const query = {
    $or: [
      { path },
      { path: deep ? { $regex: new RegExp(`^${path}`) } : path }
    ]
  }
  const postprocess = [data => (!deep && data[0]?.path === path ? data[0] : data)]
  
  // @ts-ignore
  return new QueryBuilder({ query: _items.chain().find(query, !deep), path, postprocess, text }, {})
}

function find(url, params) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sortBy, skip, limit, only, without, where, search, surround, deep, text, ...other } = params
    params.where = Object.assign({}, params.where, other)
  
    // Build query from query / body
    let query = createQuery(url, { deep: params.deep, text: params.text })
    
    if (params.sortBy) {
      if (typeof params.sortBy === 'object') {
        if (Array.isArray(params.sortBy)) {
          for (const sort of params.sortBy) {
            if (typeof sort === 'string') {
              const [key, value] = sort.split(':')
              query = query.sortBy(key, value)
            } else {
              for (const [key, value] of Object.entries(sort)) {
                query = query.sortBy(key, value)
              }
            }
          }
        } else {
          for (const [key, value] of Object.entries(params.sortBy)) {
            query = query.sortBy(key, value)
          }
        }
      } else {
        const [key, value] = params.sortBy.split(':')
        query = query.sortBy(key, value)
      }
    }
    if (params.skip) {
      query = query.skip(params.skip)
    }
    if (params.limit) {
      query = query.limit(params.limit)
    }
    if (params.only) {
      query = query.only(params.only)
    }
    if (params.without) {
      query = query.without(params.without)
    }
    if (params.where) {
      const where = {}
  
      for (const [key, value] of Object.entries(params.where)) {
        const [field, operator] = key.split('_')
  
        if (operator) {
          where[field] = {
            [`$${operator}`]: value
          }
        } else {
          where[field] = value
        }
      }
      query = query.where(where)
    }
    if (params.search) {
      if (typeof params.search === 'object') {
        query = query.search(params.search.query, params.search.value)
      } else {
        query = query.search(params.search)
      }
    }
    if (params.surround) {
      query = query.surround(params.surround.slugOrPath, params.surround.options)
    }
  
    return query.fetch()
}
  