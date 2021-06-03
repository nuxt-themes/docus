---
title: 'API: css プロパティ'
description: Nuxt.js ではグローバルに適用したい（すべてのページにインクルードしたい）CSS ファイル/モジュール/ライブラリを設定できます。
menu: css
category: configuration
position: 104
---

> Nuxt.js ではグローバルに適用したい（すべてのページにインクルードしたい）CSS ファイル/モジュール/ライブラリを設定できます。

`sass` を利用したい場合は `sass` および `sass-loader` パッケージをインストールしてください。もしインストールしていなければ:

```sh
npm install --save-dev sass sass-loader fibers
```

- 型: `Array`
  - 要素: `String`

`nuxt.config.js` 内で CSS リソースを追加するには:

```js
export default {
  css: [
    // Node.js モジュールを直接ロードする (ここでは SASS ファイル)
    'bulma',
    // プロジェクト内の CSS ファイル
    '@/assets/css/main.css',
    // プロジェクト内の SCSS ファイル
    '@/assets/css/main.scss'
  ]
}
```

Nuxt.js は拡張子から自動的にファイルタイプを推測して Webpack のための適切なプリプロセッサローダを使用します。ただし使用する必要のあるローダは各自でインストールしてください。
