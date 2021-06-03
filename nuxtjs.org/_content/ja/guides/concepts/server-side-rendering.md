---
title: サーバーサイドレンダリング
description: サーバーサイドレンダリング（SSR）はウェブページのレンダリングをブラウザの代わりにサーバー上で行う、画面の表示において有用なアプリケーションの機能です。
position: 3
category: concepts
questions:
  - question: サーバーサイドレンダリングを行うために必要なサーバーは？
    answers:
      - PHP サーバー
      - JavaScript サーバー
      - Node.js サーバー
    correctAnswer: Node.js サーバー
  - question: サーバーを拡張し制御するために使うのは？
    answers:
      - Middleware
      - ServerMiddleware
      - サーバーを制御することはできません
    correctAnswer: ServerMiddleware
  - question: サーバーレスホスティングプロバイダー上でサーバーサイドレンダリングされたアプリをホスティングすることは可能です
    answers:
      - true
      - false
    correctAnswer: false
  - question: サーバーサイドのドキュメントにアクセスすることは？
    answers:
      - 常に可能です
      - ブラウザに帰属するオブジェクトにのみ可能でありサーバーサイドのオブジェクトにはできません
    correctAnswer: ブラウザに帰属するオブジェクトにのみ可能でありサーバーサイドのオブジェクトにはできません
  - question: ページがインタラクティブになるのは？
    answers:
      - サーバーからレンダリングされた HTML を受け取った時
      - Vue.js のハイドレーションが効き始めた時
      - ブラウザが最初のリクエストを送った時
    correctAnswer: Vue.js のハイドレーションが効き始めた時
  - question: <NuxtLink> を用いたページ遷移が行われるのは？
    answers:
      - クライアントサイド
      - サーバーサイド
    correctAnswer: クライアントサイド
  - question: 正しいステップは？
    answers:
      - ブラウザ → サーバー、サーバー → ブラウザ、ブラウザ → ブラウザ
      - サーバー → ブラウザ、ブラウザ → サーバー、サーバー → サーバー
      - ブラウザ → サーバー、サーバー → ブラウザ、ブラウザ → サーバー
    correctAnswer: ブラウザ → サーバー、サーバー → ブラウザ、ブラウザ → ブラウザ
---

サーバーサイドレンダリング（SSR）はウェブページのレンダリングをブラウザの代わりにサーバー上で行う、画面の表示において有用なアプリケーションの機能です。サーバーサイドは完全にレンダリングされたページをクライアントに送信します。クライアントの JavaScript バンドルが引継ぎ Vue.js のアプリが[ハイドレーション](https://ssr.vuejs.org/ja/guide/hydration.html)できるようにします。

## Node.js サーバー環境が必須

ウェブページをレンダリングするためには JavaScript の環境が必要です。

Vue.js のアプリケーションを実行するには Node.js サーバーの環境構築が必要です。

## サーバーの拡張と制御

serverMiddleware でサーバーを拡張しルートを middleware で制御することができます。

```js{}[server-middleware/logger.js]

export default function (req, res, next) {
  console.log(req.url)
  next()
}
```

```js{}[nuxt.config.js]
export default {
  serverMiddleware: ['~/server-middleware/logger']

}
```

サーバーの middleware がパスにマップされた関数のリストで構成されている場合:

## サーバー環境とブラウザ環境

Node.js の環境を利用するため `req` や `res` といった Node.js のオブジェクトにアクセス可能です。また `window` や `document` といったブラウザ環境に帰属するオブジェクトにはアクセスできません。ただし `beforeMount` や `mounted` などのフックを使うと `window` や `document` を使うことができます。

```js
beforeMount () {
  window.alert('hello');
}
mounted () {
  window.alert('hello');
}
```

## Nuxt.js でのサーバーサイドレンダリングのステップ

### ステップ 1: ブラウザからサーバーへ

ブラウザが最初のリクエストを送ると Node.js の内部サーバーへ到達します。Nuxt.js は HTML を生成し `asyncData`、 `nuxtServerInit`、 `fetch` といった関数を実行した結果と共にブラウザへ送り返します。フック関数も同様に実行されます。

### ステップ 2: サーバーからブラウザへ

サーバーによって生成された HTML と共にレンダリングされたページをブラウザが受け取ります。その内容が表示され Vue.js のハイドレーションが作用し始めます。この工程の後、ページがインタラクティブになります。

### ステップ 3: ブラウザからブラウザへ

[`<NuxtLink>`](/docs/2.x/features/nuxt-components#nuxtlink-コンポーネント) によるページ間の遷移はクライアントサイドで行われるためブラウザをハード再読み込みをしない限りサーバーへリクエストを送りません。

## 警告

### window または document undefined

これはサーバーサイドレンダリングによるものです。クライアントサイドでのみリソースをインポートするように指定する必要がある場合は `process.client` 変数を使用する必要があります。

たとえば `.vue` ファイルは次のようになります:

```js
if (process.client) {
  require('external_library')
}
```

### iOS と電話番号

モバイル Safari の一部のバージョンでは、電話番号を自動的にリンクに変換します。これにより SSR コンテンツがウェブサイトのコンテンツと一致しなくなるため、`NodeMismatch` の警告が引き起こされます。そのためこれらの Safari バージョンでアプリが使用できなくなる可能性があります。

Nuxt ページに電話番号を含める場合、2 つのオプションがあります。

## メタタグを使用して変換を停止する

```html
<meta name="format-detection" content="telephone=no" />
```

## 電話番号をリンクにラップする

```html
<!-- 電話番号の例: +7 (982) 536-50-77 -->

<template>
  <a href="tel: +7 (982) 536-50-77">+7 (982) 536-50-77</a>
</template>
```

<quiz :questions="questions"></quiz>
