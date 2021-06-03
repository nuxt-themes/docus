---
title: 'server プロパティ'
description: 'Nuxt.js ではアプリケーションのサーバー接続用の変数を `nuxt.config.js` 内に定義できます。'
menu: server
category: configuration-glossary
position: 26
---

- 型: `Object`

> Nuxt.js では、アプリケーションのサーバー接続用の変数を `nuxt.config.js` 内に定義できます。

## 基本的な例:

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000, // デフォルト: 3000
    host: '0.0.0.0', // デフォルト: localhost,
    timing: false
  }
}
```

これで Nuxt.js のサーバーインスタンスの [host と port](/docs/2.x/features/configuration#ホストとポートを編集する) を指定できます。

## HTTPS 設定を用いる例

```js{}[nuxt.config.js]
import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

サーバーの鍵と証明書を `localhost` 上で作成する方法については [certificates for localhost](https://letsencrypt.org/docs/certificates-for-localhost/) の記事を参照してください。

## sockets 設定を用いる例

```js{}[nuxt.config.js]
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```

## timing

- 型: `Object` または `Boolean`
- デフォルト: `false`

`server.timing` オプションを有効にすると、サーバーサイドレンダリング中に経過した時間を計測するミドルウェアが追加され、'Server-Timing' としてヘッダーに追加されます。

### timing 設定用いる例

`server.timing` はオプションを提供するためのオブジェクトです。現在、`total` のみがサポートされています（これはサーバーサイドレンダリングで費やした全ての時間を直接追跡します）。

```js{}[nuxt.config.js]
export default {
  server: {
    timing: {
      total: true
    }
  }
}
```

### timing API を使う

`timing` API は `server.time` が有効な場合にサーバーサイドの `response` にも注入されます。

#### 構文

```js
res.timing.start(name, description)
res.timing.end(name)
```

#### サーバーミドルウェアで timing を用いる例

```js
export default function (req, res, next) {
  res.timing.start('midd', 'Middleware timing description')
  // サーバーサイドの処理..
  // ...
  res.timing.end('midd')
  next()
}
```

そして `server-timing` は以下のようにレスポンスヘッダーに含まれます:

```bash
Server-Timing: midd;desc="Middleware timing description";dur=2.4
```

詳細は [MDN の Server-Timing](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Server-Timing) を参照してください。
