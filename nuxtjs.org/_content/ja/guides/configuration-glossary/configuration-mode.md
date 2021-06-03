---
title: 'mode プロパティ'
description: 'デフォルトの nuxt の mode を変更します'
menu: mode
category: configuration-glossary
position: 17
---

- 型: `string`
  - デフォルト: `universal`
  - 設定できる値:
    - `'spa'`: サーバーサイドレンダリングを行いません（クライアントでの遷移のみ）
    - `'universal'`: アイソモーフィックなアプリケーション（サーバーサイドレンダリングに加え、クライアントでの遷移を行う）になります

> `nuxt.config.js` でこのオプション使うとデフォルトの nuxt の mode を変更できます。

<base-alert type="warning">

非推奨: `mode: spa` のかわりに `ssr: false` を使ってください

</base-alert>

<base-alert type="next">

`ssr` オプションについての詳細は [ssr プロパティ](/docs/2.x/configuration-glossary/configuration-ssr)を参照してください。

</base-alert>

<base-alert type="next">

`mode` オプションについての詳細は[レンダリングモードのドキュメント](/docs/2.x/features/rendering-modes)を参照してください。

</base-alert>
