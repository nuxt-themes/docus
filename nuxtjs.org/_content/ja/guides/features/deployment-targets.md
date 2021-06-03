---
title: デプロイターゲット
description: デプロイターゲット
position: 2
category: features
---

## 静的ホスティング

Nuxt.js は静的サイトジェネレータとしても機能します。Nuxt.js アプリケーションを静的にレンダリングし、サーバーなしでユニバーサルアプリケーションのいいところが全て使えます。`nuxt generate` コマンドはウェブサイトの静的バージョンを生成します。ルートごとに HTML を生成し、それを `dist/` ディレクトリ内に配置します。これによりパフォーマンスと SEO が向上し、オフラインサポートが向上します。

<base-alert type="info">

[Nuxt Crawler](/docs/2.x/configuration-glossary/configuration-generate#crawler) のおかげで動的なルートも生成されます。

</base-alert>

静的ホスティング（サーバーが必要ないホスティング）のためには、`nuxt.config` ファイルで target を `static` に設定する必要があります。

```js{}[nuxt.config.js]
export default {
  target: 'static' // デフォルトは 'server'
}
```

**target を static にした状態で nuxt dev を実行すると、開発者の体験は向上するでしょう**:

- `context` から `req` と `res` を削除します
- クライアントサイドレンダリングの 404、エラー、リダイレクトをフォールバックします [SPA フォールバックを参照](/docs/2.x/concepts/static-site-generation#spa-fallback)
- サーバーサイドレンダリングでは常に `$route.query` と `{}` は等しくなります
- `process.static` は true になります

<base-alert type="info">

また、モジュールの製作者がユーザーターゲットに応じてロジックを追加するために `process.target` を公開しています。

</base-alert>

## サーバーホスティング

サーバーホスティングはサーバーを必要とするホスティングで SSR を行うアプリケーションまたは [serverMiddleware](/docs/2.x/configuration-glossary/configuration-servermiddleware) を使うアプリケーションを対象としています。SSR と略すことで知られるサーバーサイドレンダリングは、ユーザーがページを要求したときにそのページがサーバー上でレンダリングされることを意味します。ユーザーがブラウザでページを開くと、ブラウザはそのページの要求をサーバーに送信します。ページはサーバー上でレンダリングされ、すべてのコンテンツと共にブラウザに送り返されます。

サーバーホスティングのためには target を server にします。これはデフォルトの値です。SSR では `build` コマンドを使ってアプリケーションをビルドします。

```js{}[nuxt.config.js]
export default {
  target: 'server'
}
```
