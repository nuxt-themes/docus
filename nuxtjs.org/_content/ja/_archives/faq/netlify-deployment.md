---
title: Netlify へデプロイするには？
description: Netlify へデプロイするには？
menu: Deploy on Netlify
category: deployment
position: 209
---

[Netlify](https://www.netlify.com) へのデプロイは **静的に生成された** Nuxt.js サイトを迅速にオンライン化するための低摩擦オプションです。

このプロセスの中核は、デプロイ中に Nuxt.js アプリケーションの静的なバージョンを `dist` ディレクトリ内にビルドする `nuxt generate` コマンドです。 このディレクトリの内容は、プロダクション URL にデプロイされます。

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/how-to-deploy-nuxtjs-to-netlify?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Vue School で <strong>Netlify へデプロイする方法</strong>についての無料レッスンをみる
    </p>
  </a>
</div>

## はじめに

Netlify ダッシュボードの _"New site from Git"_ ボタンを押下します。レポジトリホストで認証を行い、デプロイするレポジトリを選択、続行します。ステップ 3 : _"ビルドオプションとデプロイ！"_ に進んでください。

## 操作：

### 静的に生成されたサイトの場合

1. **ブランチをデプロイする：** `master` もしくはデプロイしたいブランチ
2. **ビルドコマンド：** `npm run generate`
3. **公開ディレクトリ：** `dist`

### SPA モードで生成されたサイトの場合

1. **ブランチをデプロイする:** `master` もしくはデプロイしたいブランチ
2. **ビルドコマンド:** `npm run build`
3. **公開ディレクトリ:** `dist`

シングルページアプリケーションの場合、Netlify は再読み込み時にデフォルトで _"404 not found"_ にリダイレクトする問題があります。生成されないページについては、SPA モードにフォールバックし、そのリンクを更新または共有すると、Netlify の 404 ページが表示されます。なぜならシングルページアプリケーションなので実際には生成されたページが存在しないからです。更新すると url のページが実際に存在しないため 404 になります。404.html にリダイレクトすることにより、Nuxt は SPA フォールバックでページを正しくリロードします。

これを修正する最も簡単な方法は、`nuxt.config` に [generate property](/docs/2.x/configuration-glossary/configuration-generate#fallback) を追加し、`fallback: true` を設定することです。

```js
export default {
  generate: {
    fallback: true
  }
}
```

ただし、SPA のヘッダーとリダイレクトを自動的に適用する場合は、そのためのモジュールが用意されています。これはカスタムヘッダー/リダイレクト（\_headers または \_redirects ファイル）がある場合に特に便利です：

[netlify-files-module](https://github.com/nuxt-community/netlify-files-module)

> Netlify リダイレクトについての詳細は [Netlify のドキュメント](https://www.netlify.com/docs/redirects/#rewrites-and-proxying) を参照してください。

> Divya Sasidharan が、Netlify のリダイレクトに関するリファレンスを [post](https://www.netlify.com/blog/2019/01/16/redirect-rules-for-all-how-to-configure-redirects-for-your-static-site) に公開しているので参考にしてください。

> オプションで、_"Advanced"_ ボタンを使用して ENV 変数を追加することができます。これらは代替 API 資格情報などを交換する際に役立ちます。Netlify はまた、ビルド時に Nuxt.js アプリケーションで読み取れる [デフォルトの ENV 変数](https://www.netlify.com/docs/build-settings/#build-environment-variables) を提供します。

_"Deploy site"_ をクリックすると、すぐにデプロイが開始されます。Netlify サイトにランダムな値の URL が割り当てられ、`nuxt generate` コマンドを使用してデプロイされます。

やりました！これで Nuxt.js アプリケーションは Netlify でホストされるようになりました！
