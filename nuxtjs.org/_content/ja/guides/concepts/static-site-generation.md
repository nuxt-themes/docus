---
title: 静的サイト生成
description: 静的サイト生成を使用すると、ビルドフェーズでアプリケーションをレンダリングし、Netlify、GitHub ページ、Vercel などの静的ホスティングサービスにデプロイすることができます。
position: 4
category: concepts
questions:
  - question: 静的サイトをホストするためにはサーバーが必要です。
    answers:
      - はい
      - いいえ
    correctAnswer: いいえ
  - question: 静的サイト生成にはどのようなコマンドを使用しますか？
    answers:
      - nuxt build
      - nuxt prerender
      - nuxt generate
    correctAnswer: nuxt generate
  - question: API はいつ呼び出されますか？
    answers:
      - API の呼び出しが記述されたページに遷移したとき
      - サイトを生成するとき
      - サイトを生成するときと API の呼び出しが記述されたページに遷移したとき
    correctAnswer: サイトを生成するとき
  - question: どのようなページがシングルページアプリケーションモードにフォールバックされますか？
    answers:
      - エラーページ
      - generate.excludes で生成から除外されたもの
      - 遷移する全てのページ
    correctAnswer: generate.excludes で生成から除外されたもの
  - question: どのようにしてサイトのコンテンツを更新しますか？
    answers:
      - 自動的に更新されます
      - サイトを再生成する必要があります
    correctAnswer: サイトを再生成する必要があります
---

静的サイト生成を使用すると、ビルドフェーズでアプリケーションをレンダリングし、Netlify、GitHub ページ、Vercel などの静的ホスティングサービスにデプロイすることができます。これは、アプリケーションをデプロイするためにサーバーが必要ないことを意味します。

### サイトを生成する

[target:static](/docs/2.x/features/deployment-targets#静的ホスティング) でサイトをデプロイすると、すべての `.vue` のページが HTML と JavaScript ファイルに生成されます。API へのすべての呼び出しは、生成されたコンテンツ内の static と呼ばれるフォルダにキャッシュされ、クライアントサイドの遷移で API を呼び出す必要がなくなります。

### ステップ 1：ブラウザから CDN へ

ブラウザが最初のリクエストを送信すると、CDN にヒットします。

### ステップ 2: CDN からブラウザへ

CDN は、すでに生成された HTML、JavaScript、静的アセットをブラウザに送り返します。コンテンツが表示され、Vue.js のハイドレーションが作動してリアクティブになります。この処理の後、ページはインタラクティブになります。

### ステップ 3: ブラウザからブラウザへ

ページ間の遷移は [`<NuxtLink>`](/docs/2.x/features/nuxt-components#nuxtlink-コンポーネント) を使ってクライアントサイドで行われるので、CDN に再度ヒットすることはありません。そしてブラウザをハードリフレッシュしても、すべての API への呼び出しはすでにキャッシュされている静的フォルダから読み込まれます。

### SPA フォールバック

`generate.exclude` プロパティを使用して生成から除外されたページは、シングルページアプリケーションにフォールバックします。そのため、これらのページは CDN には存在せず、ユーザーがそのページに遷移するとクライアントサイドのブラウザでレンダリングされます。

<base-alert type="next">

より深く理解するには [generate プロパティ](/docs/2.x/configuration-glossary/configuration-generate#exclude)を参照してください。

</base-alert>

### コンテンツを更新する

API から新しいコンテンツを取得するには、サイトを再生成する必要があります。ほとんどの静的サイトのホスティングプロバイダでは、git コマンドやプルリクエストで変更を master ブランチにプッシュすることで再生成することができます。

### プレビューモード

プレビューモードは API や CMS を呼び出して、デプロイ前に変更点をライブで確認できるようにします。この機能を有効にする方法については[プレビューモード](/docs/2.x/features/live-preview)を参照してください。

<quiz :questions="questions"></quiz>
