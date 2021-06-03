---
title: 'API: globalName プロパティ'
description: Nuxt.js はメインの Vue インスタンスとその他のオプションだけでなく、メインの HTML テンプレート上でもグローバル ID をカスタマイズできます。
menu: globalName
category: configuration
position: 111
---

> Nuxt.js はメインの Vue インスタンスとその他のオプションだけでなく、メインの HTML テンプレート上でもグローバル ID をカスタマイズできます。

- 型: `String`
- デフォルト: `nuxt`

例:

`nuxt.config.js`

```js
{
  globalName: 'myCustomName'
}
```

有効な JavaScript 識別子である必要があります。

## globals プロパティ

> デフォルトで `globalName` に基づく、特定のグローバル名をカスタマイズします。

- 型: `Object`
- デフォルト:

```js
{
  id: globalName => `__${globalName}`,
  nuxt: globalName => `$${globalName}`,
  context: globalName => `__${globalName.toUpperCase()}__`,
  pluginPrefix: globalName => globalName,
  readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
  loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
},
```
