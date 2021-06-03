---
title: 'env プロパティ'
description: 'クライアントサイドとサーバーサイドで環境変数を共有する'
menu: env
category: configuration-glossary
position: 8
---

- 型: `Object`

> Nuxt.js ではクライアントサイドとサーバーサイドで共有される環境変数を作成できます。

env プロパティはクライアントサイドで使用できる環境変数を定義します。これらはサーバーサイド環境変数や [dotenv モジュール](https://github.com/nuxt-community/dotenv-module)などを使用して割り当てることができます。

**より良いトラブルシューティングのために、後述の `process.env` と `process.env == {}` を必ず読んでください。**

```js{}[nuxt.config.js]
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

これによりサーバーサイドの環境変数 `BASE_URL` が利用可能または定義されていれば、`BASE_URL` と等しい `baseUrl` プロパティを作成できます。もし `BASE_URL` が利用不可であったり定義されていなれば、クライアントサイドの `baseUrl` は `'http://localhost:3000'` になります。サーバーサイドの環境変数 BASE_URL は `nuxt.config.js` の `env` プロパティを経由してクライアントサイドにコピーされます。または、他の値が定義されています（http://localhost:3000）。

そして `baseUrl` 変数にアクセスするには 2 つの方法があります:

1. `process.env.baseUrl` 経由でアクセスする。
2. `context.env.baseUrl` 経由でアクセスする。詳細は [context API](/docs/2.x/internals-glossary/context) を参照してください。

例えば `env` プロパティを使って公開トークンを付与できます。

上記の例として、`env` プロパティを使って [axios](https://github.com/mzabriskie/axios) を設定できます。

```js{}[plugins/axios.js]
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

このように記述するとページ内で `import axios from '~/plugins/axios'` という具合に axios をインポートできます。

## 環境変数の自動注入

ビルドフェーズで `NUXT_ENV_` で始まる環境変数を定義（例えば `NUXT_ENV_COOL_WORD=freezing nuxt build`）した場合、この環境変数はプロセス環境に自動的に注入されます。`nuxt.config.js` 内に定義した同名変数よりも優先されるので注意してください。

## process.env == {}

Nuxt は webpack の `definePlugin` を用いて環境変数を定義することに注意してください。つまり、Node.js の実際の `process` または `process.env` が利用可能でもなければ定義されてもいないことを意味します。nuxt.config.js で定義された `env` プロパティは `process.env.xxxx` へそれぞれ個別にマップされコンパイル時に変換されます。

つまり、`console.log(process.env)` は `{}` を出力しますが、`console.log(process.env.your_var)` は定義された値を出力します。コードが webpack でコンパイルされると、`process.env.your_var` と記述されたすべての箇所が定義した値に置き換えられます。例えば、`env.test = 'testing123'` と定義すると、コード中に `process.env.test` と記述してある箇所がすべて 'testing123' へ置き換えられます。

ビフォー

```js
if (process.env.test == 'testing123')
```

アフター

```js
if ('testing123' == 'testing123')
```

## serverMiddleware

[serverMiddleware](/docs/2.x/configuration-glossary/configuration-servermiddleware) はメインの Nuxt ビルドから分離されているので、`nuxt.config.js` に定義された `env` 変数は使用できません。
