---
title: はじめに
description: 'Nuxtは、モダンな Web アプリケーションを作成する Vue.js に基づいたプログレッシブフレームワークです。Vue.js 公式ライブラリ（vue、vue-router や vuex）および強力な開発ツール（webpack、Babel や PostCSS）に基づいています。'
category: prologue
position: 1
---

> Nuxt は、モダンな web アプリケーションを作成する Vue.js に基づいたプログレッシブフレームワークです。Vue.js 公式ライブラリ（vue、vue-router や vuex）および強力な開発ツール（webpack、Babel や PostCSS）に基づいています。Nuxt の目標は、優れた開発者エクスペリエンスを念頭に置き、Web 開発を強力かつ高性能にすることです。

## NuxtJS とは何か？

Nuxt は、Vue の公式ガイドラインに沿って強力なアーキテクチャを提供するように設計されたフレームワークです。一部分から徐々に採用することが可能で、静的なランディングページから複雑な企業向け web アプリケーションまで、あらゆるものの作成に使用できます。

本質的に汎用性があり、さまざまなターゲット（サーバー、サーバーレス、または静的）をサポートし、サーバーサイドのレンダリングは切り替えることができます。

強力なモジュールエコシステムにより拡張可能で、REST や GraphQL エンドポイント、お気に入りの CMS や CSS フレームワークなどさまざまなものに簡単に接続できます。PWA および AMP のサポートは、Nuxt プロジェクトからは隔離されたモジュールにすぎません。

NuxtJS は Vue.js プロジェクトのバックボーンであり、柔軟でありながら自信を持ってプロジェクトを構築するための構造を提供します。

## 主な機能

- Vue ファイルで記述できること（`*.vue`）
- コードを自動的に分割すること
- サーバーサイドレンダリング
- 非同期データをハンドリングするパワフルなルーティング
- 静的ファイルの配信
- [ES2015+](https://babeljs.io/docs/en/learn/) のトランスパイレーション
- JS と CSS のバンドル及びミニファイ化
- `<head>` 要素（`<title>`、`<meta>` など）の管理
- 開発モードにおけるホットリローディング
- プリプロセッサ: Sass, Less, Stylus など
- HTTP/2 push headers ready
- モジュール構造で拡張できること

## どのように動作するか？

Nuxt.js はリッチなウェブアプリケーションを構築するために下記のものを含んでいます :

- [Vue 2](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/ja/)
- [Vuex](https://vuex.vuejs.org/ja/)（[ストアオプション](/guide/vuex-store)を利用している場合に限る）
- [Vue Server Renderer](https://ssr.vuejs.org/ja/)（[`mode: 'spa'`](/api/configuration-mode) を利用している場合を除く）
- [Vue Meta](https://github.com/nuxt/vue-meta)

すべて合わせてもわずか **57kB min+gzip** です。（Vuex 利用時は 60kB）

<div class="Alert">

バンドルやソースコードの分割やミニファイ化するために内部で [webpack](https://github.com/webpack/webpack)、[vue-loader](https://github.com/vuejs/vue-loader) と [babel-loader](https://github.com/babel/babel-loader) を使います。

</div>

## 図解

下の図は、サーバーサイドで処理が実行されたときや、ユーザーが `<nuxt-link>` を通して遷移したときに Nuxt.js によって何が呼び出されるかを表しています:

![nuxt-schema](/nuxt-schema.svg)

## サーバーサイドレンダリング（ユニバーサル SSR）

Nuxt.js をプロジェクトの UI レンダリング全体を担うフレームワークとして使うことができます。

`nuxt` コマンドを実行すると開発サーバーが起動します。このサーバーはホットリローディング及び [Vue Server Renderer](https://ssr.vuejs.org/ja/) を備えており、アプリケーションが自動的にサーバーサイドレンダリングするよう設定されています。

## シングルページアプリケーション（SPA）

もし何らかの理由でサーバーサイドレンダリングを使いたくない、あるいはアプリケーションを静的にホスティングする必要があるときは `nuxt --spa` を使って、シンプルに SPA モードを使うことができます。_generate_ 機能と組み合わせて使うことで、Node.js ランタイムや特別なサーバー処理を利用する必要なしに、SPA のパワフルなデプロイを実現できます。

コマンドについてより深く理解するには [コマンド](/guide/commands) を参照してください。

サーバーが既にある場合は、Nuxt.js をミドルウェアとして組み込むことができます。ユニバーサルなウェブアプリケーションの開発に Nuxt.js を利用する際、制限は何ひとつありません。 [Nuxt.js をプログラム的に使う](/api/nuxt) ガイドを参照してください。

## 静的ファイルの生成

`nuxt generate` コマンドにより Nuxt.js に大きなイノベーションがやってきました。

アプリケーションをビルドする際、ルートやストアにあるファイル全てに対し HTML を生成します。

<div>
  <a href="https://vueschool.io/courses/static-site-generation-with-nuxtjs?friend=nuxt" target="_blank" class="Promote">
    <img src="/static-site-generation-with-nuxtjs.png" alt="Static Site Generation with Nuxt.js by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Nuxt.js による静的サイト生成</h4>
      <p class="Promote__Content__Description">ホスティングコストを削減しながら、パフォーマンスと SEO の両方を向上させるために静的サイトを生成する方法（プリレンダリング）を学びます。</p>
      <p class="Promote__Content__Signature">ビデオコースは Nuxt.js での開発をサポートするために VueSchool によって作られました｡</p>
    </div>
  </a>
</div>

例えば、以下のファイル構成だった場合:

```bash
-| pages/
----| about.vue
----| index.vue
```

次のファイルが生成されます:

```
-| dist/
----| about/
------| index.html
----| index.html
```

この方法により、生成されたウェブアプリケーションをどの静的ウェブサイトホスティングにもホストできます！

最も良い例はこのウェブサイト自体です。このサイトは [Netlify](https://www.netlify.com) で生成されホストされています。[ソースコード](https://github.com/nuxt/nuxtjs.org)もしくは Vue School の [Nuxt.js を Netlify にデプロイする方法](https://vueschool.io/lessons/how-to-deploy-nuxtjs-to-netlify?friend=nuxt)を参照してください。

[docs repository](https://github.com/nuxt/docs) をアップデートするたびに手動でアプリケーションを生成したくないので、Netlify のフックへのトリガーにします：

1. [nuxtjs.org リポジトリ](https://github.com/nuxt/nuxtjs.org)をクローンする
2. `npm install` で依存関係のあるパッケージをインストールする
3. `nuxt build && nuxt export`（Nuxt v2.13 以上）または `npm run generate`（Nuxt v2.12 以下）を実行する
4. `dist` ディレクトリに配置する

これで自動化された**静的に生成されたウェブアプリケーション**ができます。:)

Nuxt v2.13 から使えるようになった新しいフルスタティックモジュールは、HTML とスタティックアセットをビルド時に生成します。これは全てが生成されることを意味し、SEO に寄与するだけでなくどの静的ホスティングプロバイダへも無料でホストすることができます。

Nuxt v2.13 にはリンクタグをクロールし、リンクに基づいて動的なルートを生成するクローラーがインストールされているため、手動で動的なリンクを生成する必要はありません。

静的なターゲットは、API への呼び出しを静的フォルダ内の payload.js ファイルに保存することで動作します。これらのペイロードはキャッシュされ、パフォーマンスとオフラインのサポートを向上させます。また、クライアント側のナビゲーションで API が呼び出されることがなくなるため（asyncData や fetch を使用して呼び出される場合）、API を公開する必要がなくなります。

サイトが生成されると、HTML はすべてのコンテンツと共に生成され、クライアント側のナビゲーションでは、API データのペイロードファイルを使用してこれらのページが再構築されます。コードをコンテンツから分離することで、サイト全体を再構築することなくコンテンツを簡単に再生成することができます。つまり、一度サイトが構築され、コンテンツだけを変更したい場合は `nuxt export` を呼び出すだけでコンテンツだけを再生成することができます。コンテンツは webpack を経由する必要がないのでコンテンツの再生成が非常に速くなります。

Nuxt v2.13 以上で静的サイトを生成したい場合は、nuxt.config ファイルに値が `static` の `target` プロパティを追加する必要があります。`target` のデフォルト値は `server` です。

`nuxt.config.js`

```js
export default {
  target: 'static'
}
```

新しい static target についての詳細は [article](/blog/going-full-static) を参照してください。

<div class="Alert">

Netlify へデプロイする方法についての詳細は [Netlify へデプロイするには？](/faq/netlify-deployment) を参照してください。

</div>
