---
title: 'A propriedade extendPlugins'
description: A propriedade extendPlugins permite personalizar os plugins do Nuxt.js.
menu: extendPlugins
category: configuration-glossary
position: 9
---

> A propriedade extendPlugins permite que você personalize os plugins do Nuxt.js ([options.plugins](/docs/2.x/configuration-glossary/configuration-plugins)).

- Tipo: `Function`
- Padrão: `undefined`

Você pode estender os plugins ou alterar a ordem dos plugins criados pelo Nuxt.js. Esta função aceita um array de objetos [plugin](/docs/2.x/configuration-glossary/configuration-plugins) e deve retornar um array de objetos plugin.

Exemplo de alteração da ordem dos plug-ins:

```js{}[nuxt.config.js]
export default {
  extendPlugins(plugins) {
    const indexDoPlugin = plugins.findIndex(
      ({ src }) => src === '~/plugins/shouldBeFirst.js'
    )
    const deveriaSeriaPrimeiroPlugin = plugins[indexDoPlugin]

    plugins.splice(indexDoPlugin, 1)
    plugins.unshift(deveriaSeriaPrimeiroPlugin)

    return plugins
  }
}
```
