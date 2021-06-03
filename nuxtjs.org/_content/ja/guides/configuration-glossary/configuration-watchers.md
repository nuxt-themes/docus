---
title: 'watchers プロパティ'
description: 'watchers プロパティは watcher の設定を上書きできます。'
menu: watchers
category: configuration-glossary
position: 34
---

- 型: `Object`
- デフォルト: `{}`

> nuxt.config.js の watchers プロパティは watcher の設定を上書きできます。

## chokidar

- 型: `Object`
- デフォルト: `{}`

chokidar オプションの詳細は [chokidar API](https://github.com/paulmillr/chokidar#api) を参照してください。

## webpack

- 型: `Object`
- デフォルト:

```js
watchers: {
  webpack: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

webpack の watchOptions の詳細は [webpack のドキュメント](https://webpack.js.org/configuration/watch/#watchoptions)を参照してください。

### このあとは

<base-alert type="next">

[Internals Glossary のドキュメント](/docs/2.x/internals-glossary/$nuxt)を参照してください。

</base-alert>
