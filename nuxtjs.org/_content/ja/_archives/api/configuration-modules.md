---
title: 'API: modules プロパティ'
description: モジュールは、Nuxt.js のコア機能を拡張し、無限のインテグレーションを加える Nuxt.js の拡張機能です。
menu: modules
category: configuration
position: 119
---

- 型: `Array`

> モジュールは、Nuxt.js のコア機能を拡張し、無限のインテグレーションを加える Nuxt.js の拡張機能です。 [より深く学ぶ](/guide/modules)

例 (`nuxt.config.js`):

```js
export default {
  modules: [
    // パッケージの名前を使用する
    '@nuxtjs/axios',

    // プロジェクトの srcDir と相対的
    '~/modules/awesome.js',

    // オプションを渡す
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // インライン定義
    function () {}
  ]
}
```

モジュールの開発者は通常、使用するために必要なステップと詳細を提供します。

Nuxt.js は node の読み込みパス（`node_modules`の中）を用いてモジュール配列内の各要素を解決しようとします。`~` エイリアスが使用されている場合、プロジェクトの `srcDir` から解決されます。モジュールは順番に実行されるため、順序が重要です。

モジュールは nuxt のビルド/ランタイムを強化する機能をエクスポートし、必要に応じてそれらのジョブが完了するまで promise を返却する必要があります。実行時に必要とされるので、最新の ES6 機能に依存する場合には、すでにトランスパイルされている必要があることに注意して下さい。

モジュールの仕組みや独自のモジュール開発に興味がある場合、より詳細な情報については [モジュールガイド](/guide/modules) を参照して下さい。また、 Nuxt Community によって作られた、実績あるモジュールを掲載した公式の [モジュール](https://github.com/nuxt-community/awesome-nuxt#modules) セクションも提供しています。

## `buildModules`

<div class="Alert Alert--info">

この機能は Nuxt v2.9 から使用することができます

</div>

一部のモジュールは、開発時およびビルド時にのみ必要です。`buildModules` を使用すると、本番環境の起動を高速化し、本番環境のデプロイで `node_modules` のサイズを大幅に削減することができます。 各モジュールのドキュメントを参照して、`modules` または `buildModules` の使用が推奨されているかどうかを確認してください。

使用方法の違いは以下のとおりです：

- `nuxt.config.js` の `modules` を使うかわりに `buildModules` を使います
- `package.json` の `dependencies` に追加するかわりに、`devDependencies` を使います（`yarn add --dev` または `npm install --save-dev`）
