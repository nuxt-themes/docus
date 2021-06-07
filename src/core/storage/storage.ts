import { createStorage, Storage } from 'unstorage'
import { StorageOptions } from '../../types'
import { logger } from '..'
import { docusDriver, DocusDriver } from './driver'

let _storage: Storage
let drivers: DocusDriver[]
export function initStorage(options: StorageOptions) {
  drivers = []
  _storage = createStorage()

  if (!options?.drivers) {
    logger.warn('No driver specified for storage')
  } else {
    drivers = options.drivers.map(options => {
      // Initialize driver
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
