---
title: window または document が undefined
description: window または document が undefined のときは？
category: development
position: 101
---

これは、サーバーサイドのレンダリングに起因します。 クライアントサイドでのみリソースをインポートしたい時は `process.client` 変数を使用する必要があります。

例えば .vue ファイルに次のように書きます:

```js
if (process.client) {
  require('external_library')
}
```
