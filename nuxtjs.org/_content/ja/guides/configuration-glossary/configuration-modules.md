---
title: 'modules プロパティ'
description: 'モジュールは、Nuxt.js のコア機能を拡張し、無限のインテグレーションを加える Nuxt.js の拡張機能です'
menu: modules
category: configuration-glossary
position: 19
---

- 型: `Array`

> モジュールは Nuxt.js のコア機能を拡張し、無限のインテグレーションを加える Nuxt.js の拡張機能です。[詳細はこちら](/docs/2.x/directory-structure/modules)

例（`nuxt.config.js`）:

```js
export default {
  modules: [
    // パッケージ名を使う
    '@nuxtjs/axios',

    // プロジェクトの srcDir からの相対パス
    '~/modules/awesome.js',

    // オプションを渡す
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // インラインで定義
    function () {}
  ]
}
```

モジュール開発者は通常、追加で必要なステップや使用方法の詳細を提供します。

Nuxt.js は node の読み込みパス（`node_modules` の中）を用いてモジュール配列内の各要素を解決しようとします。`~` エイリアスが使用されている場合、プロジェクトの `srcDir` から解決されます。モジュールは順番に実行されるため、順序が重要です。

モジュールは nuxt のビルド/ランタイムを強化する機能をエクスポートし、必要に応じてそれらのジョブが完了するまで promise を返却する必要があります。実行時に必要とされるので、最新の ES6 機能に依存する場合には、すでにトランスパイルされている必要があることに注意して下さい。

モジュールの仕組みや独自のモジュール開発に興味がある場合、より詳細な情報については [モジュールガイド](/docs/2.x/directory-structure/modules) を参照して下さい。また、公式の[モジュール](https://github.com/nuxt-community/awesome-nuxt#modules)セクションでは Nuxt Community によって作られた数多くの本番用モジュールの一覧を提供しています。

## `buildModules`

<div class="Alert Alert--info">

この機能は Nuxt v2.9 以降で使うことができます

</div>

一部のモジュールは開発時およびビルド時にのみ必要になります。`buildModules` を使うことで本番環境の起動を速くし、本番環境にデプロイされる `node_modules` のサイズを大幅に減らすことができます。それぞれのモジュールのドキュメントを参照して、`modules` と `buildModules` どちらを使うのが推奨されているかを確認してください。

使用方法の違いは以下のとおりです:

- `nuxt.config.js` に `modules` を追加するかわりに `buildModules` を使います
- `package.json` に `dependencies` を追加するかわりに `devDependencies` を使います（`yarn add --dev` または `npm install --save-dev`）
