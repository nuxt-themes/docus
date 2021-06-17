---
title: La propriété extendPlugins
description: La propriété extendPlugins permet de personnaliser les plugins de Nuxt.js.
menu: extendPlugins
category: configuration-glossary
position: 9
---

> La propriété extendPlugins permet de personnaliser les plugins de Nuxt.js ([options.plugins](/docs/2.x/configuration-glossary/configuration-plugins)).

- Type: `Function`
- Par défaut: `undefined`

On pourrait vouloir personnaliser les plugins ou changer l'ordre crée par Nuxt.js pour ceux-ci. Cette fonction accepte un tableau d'objets de [plugins](/docs/2.x/configuration-glossary/configuration-plugins) et doit renvoyer un tableau d'objets de plugins.

Exemple de changement de l'ordre des plugins:

```js{}[nuxt.config.js]
export default {
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex(
      ({ src }) => src === '~/plugins/doitEtreLePremier.js'
    )
    const doitEtreLePremierPlugin = plugins[pluginIndex]

    plugins.splice(pluginIndex, 1)
    plugins.unshift(doitEtreLePremierPlugin)

    return plugins
  }
}
```
