---
title: 'ssr プロパティ'
description: 'nuxt ssr のデフォルト値を変更します'
menu: ssr
category: configuration-glossary
position: 28.1
---

- 型: `boolean`
- デフォルト: `true`
- 設定できる値:
  - `true`: サーバーサイドレンダリングが有効になります
  - `false`: サーバーサイドレンダリングを行いません（クライアント側のレンダリングのみとなります）

> **クライアント側のレンダリングのみ行いたい場合**にオプションを `false` に設定できます

```js{}[nuxt.config.js]
export default {
  ssr: false // サーバーサイドレンダリングを無効化
}
```

<base-alert type="next">

以前はサーバーサイドレンダリングを有効にするか無効にするかの設定に `mode` プロパティが使われていました。[`mode` のドキュメントはこちら](/docs/2.x/configuration-glossary/configuration-mode)です。

</base-alert>
