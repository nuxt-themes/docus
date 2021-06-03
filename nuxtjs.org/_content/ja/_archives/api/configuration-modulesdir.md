---
title: 'API: modulesDir プロパティ'
description: あなたの Nuxt アプリケーションためのモジュールディレクトリを定義します。
menu: modulesDir
category: configuration
position: 120
---

- 型: `Array`
- デフォルト: `['node_modules']`

> パス解決のためにモジュールディレクトリを設定することに使用します。 例えば、 webpack の resovleLoading、nodeExternal や postcss です。設定パスは [options.rootDir](/api/configuration-rootdir) からの相対パスです。 (デフォルト : `process.cwd()`)

例 (`nuxt.config.js`):

```js
export default {
  modulesDir: ['../../node_modules']
}
```

もしあなたのプロジェクトが Yarn のワークスペーススタイルの mono リポジトリで構成されているなら、このフィールドの設定が必要になるでしょう。
