---
title: 'API: ignore プロパティ'
description: ignore 対象とするファイルを定義します
menu: ignore
category: configuration
position: 114
---

## .nuxtignore

`.nuxtignore` ファイルを使用することで、ビルド時にプロジェクトルート (`rootDir`) にある `layout`, `page`, `store` そして `middleware` のファイルを Nuxt.js に無視させることが出来ます。

例:

```
# foo.vue レイアウトを無視する
layouts/foo.vue
# ファイル名の末尾が -ignore.vue のレイアウトファイルを無視する
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

> 仕様に関する詳細はこちらを参照してください [gitignore doc](https://git-scm.com/docs/gitignore)

## ignorePrefix プロパティ

- 型: `String`
- デフォルト: `'-'`

> pages/、layout/、middleware/ や store/ ディレクトリに含まれるファイルの中で、ファイル名が `ignorePrefix` プロパティで指定された接頭辞から始まる場合にはビルド時に無視されます。

デフォルトでは `-` で始まる `store/-foo.js` や `pages/-bar.vue` のようなファイルは全て無視されます。これによりルートやストア等に変換されることなく、呼び出し元と同じ場所にテスト、ユーティリティ、コンポーネント等のファイルを置くことができます。

## ignore プロパティ

- 型: `Array`
- デフォルト: `['**/*.test.*']`

> `ignorePrefix` よりもカスタマイズしやすいです: `ignore` プロパティに指定した glob パターンと一致する全てのファイルがビルド時に無視されます
