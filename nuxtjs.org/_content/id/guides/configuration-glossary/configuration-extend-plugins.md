---
title: 'Properti extensionPlugins'
description: Properti expandPlugins memungkinkan Anda menyesuaikan plugin Nuxt.js.
menu: extendPlugins
category: configuration-glossary
position: 9
---

> Properti expandPlugins memungkinkan Anda menyesuaikan _plugin_ Nuxt.js ([options.plugins](/docs/2.x/configuration-glossary/configuration-plugins)).

- Tipe: `Function`
- Nilai Anggapan: `undefined`

Anda mungkin ingin memperpanjang _plugin_ atau mengubah urutan _plugin_ yang dibuat oleh Nuxt.js. Fungsi ini menerima larik objek [_plugin_](/docs/2.x/configuration-glossary/configuration-plugins) dan harus mengembalikan larik objek _plugin_.

Contoh mengubah urutan _plugin_ :

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
