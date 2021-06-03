---
title: Surge へデプロイするには？
description: Surge へデプロイするには?
menu: Deploy on Surge
category: deployment
position: 211
---

Nuxt.js を使うと、例えば [Surge](https://surge.sh/) のような静的ホスティングサービスにウェブアプリケーションをホストすることができます。

Surge にデプロイするために、最初に Surge をインストールします:

```bash
npm install -g surge
```

それからウェブアプリケーションを Nuxt.js に生成させます:

```bash
npm run generate
```

このとき `dist` フォルダが作成され、その中に静的ホスティングサービスへデプロイされるものがすべて入ります。

そして、それらを Surge にデプロイできます:

```bash
surge dist/
```

これで完了です。:)

[動的なルーティング](/docs/2.x/directory-structure/pages#dynamic-pages)を行っているプロジェクトがある場合は、Nuxt.js に動的なルーティングをどう生成するか伝えるために [`generate` 設定](/docs/2.x/configuration-glossary/configuration-generate)を参照してください。

<div class="Alert">

`nuxt generate` でウェブアプリケーションを生成時、[asyncData](/docs/2.x/features/data-fetching#async-data) と [`fetch`](/docs/2.x/directory-structure/store#the-fetch-method) に渡される[コンテキスト](/docs/2.x/internals-glossary/context)は `req` 及び `res` をもちません。

</div>
