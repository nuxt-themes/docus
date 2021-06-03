---
title: 'API: plugins プロパティ'
description: 'Nuxt.js の plugins オプションで vue.js プラグインを使用します。'
menu: plugins
category: configuration-glossary
position: 21
---

**Note**: Nuxt.js 2.4 以降、プラグインのタイプを指定するために `plugins` のオプションとして `mode` が導入されました。指定可能な値は `client` または `server` です。`ssr: false` は `mode: 'client'` に改良され次のメジャーリリースで非推奨になります。

- 型: `Array`
  - 要素: `String` または `Object`

要素がオブジェクトの場合、プロパティは次のとおりです:

- src: `String`（ファイルパス）
- mode: `String`（`client` または `server`）_もし定義されている場合はファイルはそれぞれの（クライアントまたはサーバー）側にのみ含まれます。_

**Note**: 古いバージョン

- 型: `Array`
  - 要素: `String` または `Object`

要素がオブジェクトの場合、プロパティは次のとおりです:

- src: `String`（ファイルパス）
- ssr: `Boolean`（デフォルトは `true`）_もし false の場合はクライアントサイドでのみファイルがインクルードされます_

> plugins プロパティを使うと Vue.js プラグインをメインアプリケーションに簡単に追加できます。

```js{}[nuxt.config.js]
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

```js{}[nuxt.config.js]
export default {
  plugins: ['@/plugins/ant-design-vue']
}
```

```js{}[plugins/ant-design-vue.js]
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // Per Ant Design's docs

Vue.use(Antd)
```

css は [Ant Design ドキュメントに従ってインポートされている](https://vue.ant.design/docs/vue/getting-started/#3.-Use-antd's-Components 'External tip relevant to building plugins')ことに注意してください。

`plugins` プロパティに定義されたパスはすべてメインアプリケーションが初期化される前に**インポート**されます。
