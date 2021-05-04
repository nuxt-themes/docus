import { DocusAddonContext } from 'src/types'

export const useDocusAddons = (context: DocusAddonContext, addons: any[]) => {
  /**
   * Addons context to be spread into Docus injection
   */
  const addonsContext = {}

  /**
   * Setup all addons
   */
  const setupAddons = async () =>
    await Promise.all(
      addons.map(async addon => {
        const addonKeys = addon(context)

        Object.entries(addonKeys).forEach(([key, value]) => {
          if (key === 'init') return

          const contextKeys = [Object.keys(addonsContext), ...Object.keys(context.state)]

          // eslint-disable-next-line no-console
          if (contextKeys.includes(key)) console.warn(`You duplicated the key ${key} in Docus context.`)

          addonsContext[key] = value
        })

        if ((addonKeys as any)?.init) {
          return await (addonKeys as any)?.init?.()
        }
      })
    )

  return {
    addonsContext,
    setupAddons
  }
}
