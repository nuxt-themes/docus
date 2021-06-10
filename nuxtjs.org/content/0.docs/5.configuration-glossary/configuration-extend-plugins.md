---
title: extendPlugins
description: The extendPlugins property lets you customize Nuxt.js plugins.
menu: extendPlugins
category: configuration-glossary
---

> The extendPlugins property lets you customize Nuxt.js plugins ([options.plugins](/docs/2.x/configuration-glossary/configuration-plugins)).

- Type: `Function`
- Default: `undefined`

You may want to extend plugins or change plugins order created by Nuxt.js. This function accepts an array of [plugin](/docs/2.x/configuration-glossary/configuration-plugins) objects and should return array of plugin objects.

Example of changing plugins order:

```js{}[nuxt.config.js]
export default {
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex(
      ({ src }) => src === '~/plugins/shouldBeFirst.js'
    )
    const shouldBeFirstPlugin = plugins[pluginIndex]

    plugins.splice(pluginIndex, 1)
    plugins.unshift(shouldBeFirstPlugin)

    return plugins
  }
}
```
