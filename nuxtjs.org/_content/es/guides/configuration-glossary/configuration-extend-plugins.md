---
title: 'La propiedad extendPlugins'
description: La propiedad extendPlugins te permite personalizar los plugins de Nuxt.js.
menu: extendPlugins
category: configuration-glossary
position: 9
---

> La propiedad extendPlugins te permite personalizar los plugins de Nuxt.js ([options.plugins](/docs/2.x/configuration-glossary/configuration-plugins)).

- Tipo: `Function`
- Por defecto: `undefined`

Puede que quieras extender los plugins o cambiar el orden de los plugins creado por Nuxt.js. Esta función acepta un array de objetos [plugin](/docs/2.x/configuration-glossary/configuration-plugins) y debería devolver el array de objetos plugin.

Ejemplo cambiando el orden de los plugins:

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
