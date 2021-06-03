---
title: 'API: The Builder クラス'
description: Nuxt `Builder` クラス
menu: Builder
category: internals
position: 305
---

- ソース: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)**

## フック

特定のライフサイクルイベントでのフックを登録できます。

```js
// ビルドのためのフックを追加
this.nuxt.hook('build:done', (builder) => {
  ...
})
```

| フック                  | 引数                                        | タイミング                                                                                                                                                                     |
| ----------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `build:before`          | (nuxt, buildOptions)                        | Nuxt のビルドが始まる前                                                                                                                                                        |
| `builder:prepared`      | (nuxt, buildOptions)                        | ビルドディレクトリが作成された時                                                                                                                                               |
| `builder:extendPlugins` | (plugins)                                   | プラグインを生成する時                                                                                                                                                         |
| `build:templates`       | ({ templatesFiles, templateVars, resolve }) | `.nuxt` テンプレートファイルを生成する時                                                                                                                                       |
| `build:extendRoutes`    | (routes, resolve)                           | ルーティングを生成する時                                                                                                                                                       |
| `webpack:config`        | (webpackConfigs)                            | コンパイラの設定前                                                                                                                                                             |
| `build:compile`         | ({ name, compiler })                        | webpack のコンパイルを実行する前（compiler は webpack の `Compiler` インスタンス）。もしユニバーサルモードであれば、`'client'` と `'server'` という名前で 2 回呼び出されます。 |
| `build:compiled`        | ({ name, compiler, stats })                 | webpack のビルドが終了した時                                                                                                                                                   |
| `build:done`            | (nuxt)                                      | Nuxt のビルドが終了した時                                                                                                                                                      |
