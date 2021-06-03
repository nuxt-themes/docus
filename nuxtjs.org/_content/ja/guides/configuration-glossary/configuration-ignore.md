---
title: 'ignore プロパティ'
description: 'Nuxt.js アプリケーションで無視するファイルを定義します'
menu: ignore
category: configuration-glossary
position: 14
---

## .nuxtignore

`.nuxtignore` ファイルを使うことで、ビルド時にプロジェクトのルートディレクトリ（`rootDir`）にある `layout`、`page`、`store` そして `middleware` ファイルを Nuxt.js に無視させることができます。`.nuxtignore` ファイルは `.gitignore` ファイルと `.eslintignore` ファイルと同じ仕様に従います。各行は無視するファイルを示す glob パターンです。

例:

```
# foo.vue レイアウトを無視する
layouts/foo.vue
# ファイル名の末尾が -ignore.vue となるレイアウトを無視する
layouts/*-ignore.vue

# bar.vue ページを無視する
pages/bar.vue
# ignore フォルダにあるページを無視する
pages/ignore/*.vue

# baz.js ストアを無視する
store/baz.js
# *.test.* にマッチするストアファイルを無視する
store/ignore/*.test.*

# foo フォルダにある foo/bar.js 以外のミドルウェアファイルを無視する
middleware/foo/*.js
!middleware/foo/bar.js
```

> 仕様に関する詳細は [gitignore のドキュメント](https://git-scm.com/docs/gitignore)を参照してください

## ignorePrefix プロパティ

- 型: `String`
- デフォルト: `'-'`

> pages/、layouts/、middleware/ や store/ ディレクトリに含まれるファイルの中で、ファイル名が `ignorePrefix` プロパティで指定された接頭辞から始まる場合にはビルド時に無視されます。

デフォルトでは `-` で始まる `store/-foo.js` や `pages/-bar.vue` のようなファイルは全て無視されます。これによりルートやストア等に変換されることなく、呼び出し元と同じ場所にテスト、ユーティリティ、コンポーネント等のファイルを置くことができます。

## ignore プロパティ

- 型: `Array`
- デフォルト: `['**/*.test.*']`

> `ignorePrefix` よりもカスタマイズ: all files matching glob patterns specified inside `ignore` will be ignored in building.

## ignoreOptions

`nuxtignore` は内部で `node-ignore` を使っており、`ignoreOptions` は`node-ignore` の `options` として設定できます。

```js{}[nuxt.config.js]
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```
