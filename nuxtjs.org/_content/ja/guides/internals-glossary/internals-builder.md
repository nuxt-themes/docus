---
title: 'Builder クラス'
description: 'Nuxt の `Builder` クラス'
menu: Builder
category: internals-glossary
position: 7
---

- ソース: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)**

## フック

特定のライフサイクルイベントにフックを登録できます。

```js
// ビルド用にフックを追加
this.nuxt.hook('build:done', (builder) => {
  ...
})
```

| フック                  | 引数                                        | タイミング                                                                                                                                              |
| ----------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build:before`          | (nuxt, buildOptions)                        | Nuxt のビルド開始前                                                                                                                                     |
| `builder:prepared`      | (nuxt, buildOptions)                        | ビルドディレクトリが作成された時                                                                                                                        |
| `builder:extendPlugins` | (plugins)                                   | プラグイン生成時                                                                                                                                        |
| `build:templates`       | ({ templatesFiles, templateVars, resolve }) | `.nuxt` テンプレートファイル生成時                                                                                                                      |
| `build:extendRoutes`    | (routes, resolve)                           | ルーティング生成時                                                                                                                                      |
| `webpack:config`        | (webpackConfigs)                            | コンパイラの設定前                                                                                                                                      |
| `build:compile`         | ({ name, compiler })                        | webpack コンパイル前（コンパイラは webpack `Compiler` インスタンス）でもし universal モードの場合 `'client'` と `'server'` の名前で二度呼び出されます。 |
| `build:compiled`        | ({ name, compiler, stats })                 | webpack のビルド終了時                                                                                                                                  |
| `build:done`            | (nuxt)                                      | Nuxt のビルド終了時                                                                                                                                     |
