---
title: 'css プロパティ'
description: 'Nuxt.js ではグローバルに適用したい（すべてのページにインクルードしたい）CSS ファイル/モジュール/ライブラリを設定できます。'
menu: css
category: configuration-glossary
position: 4
---

> Nuxt.js ではグローバルに適用したい（すべてのページにインクルードしたい）CSS ファイル/モジュール/ライブラリを設定できます。

`sass` を利用したい場合は `sass` および `sass-loader` パッケージをインストールしてください。もしインストールしていない場合は以下のようにインストールしてください。

```sh
npm install --save-dev sass sass-loader@10 fibers
```

<base-alert type="info">`fibers` がインストールされている場合、`sass` の同期コンパイル（2 倍速）が[自動的に有効になります](https://github.com/webpack-contrib/sass-loader)。</base-alert>

- 型: `Array`
  - 要素: `string`

```js{}[nuxt.config.js]
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

Nuxt.js は拡張子から自動的にファイルタイプを推測して webpack のための適切なプリプロセッサローダを使用します。ただし使用する必要のあるローダーは各自でインストールしてください。

### スタイルの拡張子

nuxt.config.js の css 配列に指定するファイル（CSS/SCSS/Postcss/Less/Stylus/...）の拡張子を省略できます。

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

<base-alert>

`main.scss` と `main.css` のように同じ名前のファイルを 2 つ持っていて css 配列に拡張子を指定しない（例えば `css: ['~/assets/css/main']`）場合、`styleExtensions` の順序に応じて 1 つのファイルしか読み込まれません。デフォルトの `styleExtension` 配列の 1 番目が `css` なので、今回の場合 `css` ファイルは読み込まれますが `scss` ファイルは無視されます。

</base-alert>

デフォルトの順序: `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`
