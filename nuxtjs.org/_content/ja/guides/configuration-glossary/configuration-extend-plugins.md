---
title: 'extendPlugins プロパティ'
description: 'extendPlugins プロパティで Nuxt.js プラグインのカスタマイズができます。'
menu: extendPlugins
category: configuration-glossary
position: 9
---

> extendPlugins プロパティで Nuxt.js プラグインのカスタマイズができます。（[options.plugins](/docs/2.x/configuration-glossary/configuration-plugins)）。

- 型: `Function`
- デフォルト: `undefined`

プラグインを拡張したり、Nuxt.js で作成したプラグインの順序を変更したい場合があるでしょう。この関数は [プラグイン](/docs/2.x/configuration-glossary/configuration-plugins) オブジェクトの配列を受け取り、プラグインオブジェクトの配列を返します。

プラグインの順序を変更する例:

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
