---
title: 'globalName プロパティ'
description: 'Nuxt.js ではメインの HTML テンプレートで使用されるグローバルな ID とメインとなる Vue インスタンス名、その他オプションをカスタマイズできます。'
menu: globalName
category: configuration-glossary
position: 11
---

> Nuxt.js ではメインの HTML テンプレートで使用されるグローバルな ID とメインとなる Vue インスタンス名、その他オプションをカスタマイズできます。

- 型: `String`
- デフォルト: `nuxt`

```js{}[nuxt.config.js]
{
  globalName: 'myCustomName'
}
```

<base-alert>

`globalName` は有効な JavaScript 識別子である必要があるので、変更することで Nuxt の名前がついた関数に依存する特定のプラグインが機能しなくなる可能性があります。表示されている `__nuxt` HTML ID を変更するだけの場合は `globals` プロパティを使ってください。

</base-alert>

## globals プロパティ

> デフォルトで `globalName` に基づいた特定のグローバル名をカスタマイズします。

- 型: `Object`
- デフォルト:

```js{}[nuxt.config.js]
globals: {
  id: globalName => `__${globalName}`,
  nuxt: globalName => `$${globalName}`,
  context: globalName => `__${globalName.toUpperCase()}__`,
  pluginPrefix: globalName => globalName,
  readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
  loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
},
```
