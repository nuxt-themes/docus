---
title: 'API: plugins プロパティ'
description: Nuxt.js の plugins オプションで Vue.js プラグインを使うことができます。
menu: plugins
category: configuration
position: 121
---

**情報**: Nuxt.js 2.4 以降、プラグインタイプを指定するための `plugins` のオプションとして `mode` が導入されました。指定可能な値は `client` または `server` です。 `ssr：false` は `mode: 'client'` に適応され、次のメジャーリリースでは非推奨になります。

- 型: `Array`
  - 要素: `String` または `Object`

オブジェクトの場合にはプロパティは次のとおり:

- src: `String` (ファイルパス）
- mode: `String` (`client` もしくは `server` になります）_定義された場合, ファイルはそれぞれの（クライアントまたはサーバー）側にのみ含まれます。_

**情報**: 古いバージョン

- 型: `Array`
  - 要素: `String` または `Object`

オブジェクトの場合にはプロパティは次のとおり:

- src: `String`（ファイルパス）
- ssr: `Boolean`（デフォルトは `true`）_false のときは、クライアントサイドでのみファイルがインクルードされます_

> plugins プロパティを使うと Vue.js プラグインをメインアプリケーションに簡単に追加できます。

例（`nuxt.config.js`）:

```js
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

UI フレームワークの例 (`nuxt.config.js`):

```js
export default {
  plugins: ['@/plugins/ant-design-vue']
}
```

これは `plugins/ant-design-vue.js` のファイルを参照します:

```js
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // Ant Designのドキュメントに従っています

Vue.use(Antd)
```

css は [Ant Design のドキュメントに従ってインポートされています](https://vue.ant.design/docs/vue/getting-started/#3.-Use-antd's-Components 'プラグインを構築するためのヒント')。

`plugins` プロパティで設定されたパスはすべて、メインアプリケーションが初期化される前に **インポート** されます。

## いつプラグインを使うか？

`Vue.use()` を使う必要があるときは毎回 `plugins/` 内にファイルを作成し、そのパスを `nuxt.config.js` 内の `plugins` に追加する必要があります。

plugins の使い方をより深く理解するには [ガイド](/guide/plugins#vue-プラグイン) を参照してください。
