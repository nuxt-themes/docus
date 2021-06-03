---
title: 'API: env プロパティ'
description: クライアントサイドとサーバーサイドで環境変数を共有します。
menu: env
category: configuration
position: 108
---

- 型: `Object`

> Nuxt.js ではクライアントサイドとサーバーサイドで共有される環境変数を作成できます。

env プロパティはクライアントサイドで使用できる環境変数を定義します。これらはサーバーサイド環境変数や [dotenv モジュール](https://github.com/nuxt-community/dotenv-module) などを使用して割り当てることができます。

**より良いトラブルシューティングのために、後述の `process.env` と `process.env == {}` を必ず読んでください。**

例（`nuxt.config.js`）:

```js
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

これにより、利用可能または定義されていれば、サーバーサイドの環境変数 `BASE_URL` と等しい `baseUrl` プロパティが作成することができます。もしそうでなければ、クライアントサイドの `baseUrl` は `http://localhost:3000` と等しくなります。したがってサーバーサイドの環境変数 BASE_URL は `nuxt.config.js` の `env` プロパティを経由してクライアントサイドにコピーされます。あるいは、他の値が定義されます（[http://localhost:3000](http://localhost:3000)）。

そして `baseUrl` 変数にアクセスするには 2 つの方法があります:

1. `process.env.baseUrl` 経由でアクセスする
2. `context.env.baseUrl` を経由する。詳細は [コンテキスト API](/api/context)

例えば `env` プロパティを使って公開トークンを付与することができます。

上記の例として env プロパティを使って [axios](https://github.com/mzabriskie/axios) を設定できます。

`plugins/axios.js`:

```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

このように記述するとページ内で `import axios from '~/plugins/axios'` という具合に axios をインポートできます。

## 環境変数の自動注入

`NUXT_ENV_` で始まる接頭辞で環境変数を定義した場合、ビルド時にプロセス環境変数へ注入されます。 (f.ex. `NUXT_ENV_COOL_WORD=freezing nuxt build`) `nuxt.config.js` 内に定義された同名変数よりも優先されるので注意してください。

## process.env == {}

Nuxt では webpack の `definePlugin` を用いて環境変数を定義します。つまり、Node.js から `process` または、`process.env` は利用可能であっても、どちらも未定義です。 nuxt.config.js で定義された `env` プロパティは、`process.env.xxxx` によって、それぞれ個別にマップされて、コンパイル時に変換されます。

つまり、`console.log（process.env）` は `{}` を出力しますが、 `console.log（process.env.you_var）` は個別に定義しマップされた値を出力します。コードが webpack でコンパイルされると、 `process.env.your_var` と記述されたすべての箇所が、定義した値に置き換えられます。すなわち、 `env.test = 'testing123'` は、コード中に `process.env.test` と記述してある箇所が、`testing123` へ置き換えられます。

ビフォー

```js
if (process.env.test == 'testing123')
```

アフター

```js
if ('testing123' == 'testing123')
```

## serverMiddleware

[serverMiddleware](/api/configuration-servermiddleware) はメインの Nuxt のビルドから分離されているので、`nuxt.config.js` に定義された `env` 変数は使用できません。
