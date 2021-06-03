---
title: 'modulesDir プロパティ'
description: 'Nuxt.js アプリケーションで modules ディレクトリを定義します'
menu: modulesDir
category: configuration-glossary
position: 20
---

- 型: `Array`
- デフォルト: `['node_modules']`

> モジュールディレクトリの設定でパス解決のために使用します。例えば Webpack の `resolveLoading`、`nodeExternals` や `postcss` です。設定パスは [options.rootDir](/docs/2.x/configuration-glossary/configuration-rootdir)（デフォルト: `process.cwd()`）からの相対パスになります。

```js{}[nuxt.config.js]
export default {
  modulesDir: ['../../node_modules']
}
```

プロジェクトが Yarn ワークスペーススタイルのモノリポジトリで構成されている場合はこのフィールドが必要になるかもしれません。
