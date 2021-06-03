---
title: 'API: server プロパティ'
description: Nuxt.js では、アプリケーションのサーバー接続用の変数を `nuxt.config.js` 内に定義できます。
menu: server
category: configuration
position: 126
---

- 型: `Object`

> Nuxt.js では、アプリケーションのサーバー接続用の変数を `nuxt.config.js` 内に定義できます。

## 基本的な例 (`nuxt.config.js`):

```js
export default {
  server: {
    port: 8000, // デフォルト: 3000
    host: '0.0.0.0', // デフォルト: localhost,
    timing: false
  }
}
```

こうすることで、Nuxt.js サーバーインスタンスの [ホストとポート](/docs/2.x/features/configuration#edit-host-and-port) を指定できます。

## HTTPS 設定を用いた例

`nuxt.config.js`

```js
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

秘密鍵と証明書を `localhost` で作成する方法については、 [certificates for localhost](https://letsencrypt.org/docs/certificates-for-localhost/) を参照してください。

## ソケット設定を用いた例

```js
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```

## timing

- 型: `Object` または `Boolean`
- デフォルト: `false`

`server.timing` オプションを有効にすると、サーバーサイドレンダリングの経過時間を測定するためのミドルウェアが追加され、'Server-Timing' としてヘッダーに追加されます。

### timing 設定を用いた例

`server.timing` はオプションを提供するためのオブジェクトです。現在、`total` のみがサポートされています。（これはサーバーサイドレンダリングで費やした全ての時間を直接追跡します）

```js
export default {
  server: {
    timing: {
      total: true
    }
  }
}
```

### timing api を使う

`timing` api は `server.time` が有効のとき、サーバーサイドの `response` にも注入されます。

#### 構文

```js
res.timing.start(name, description)
res.timing.end(name)
```

#### サーバーミドルウェアでの timing の使用例

```js
export default function (req, res, next) {
  res.timing.start('midd', 'Middleware timing description')
  // サーバーサイドの処理..
  // ...
  res.timing.end('midd')
  next()
}
```

そして `server-timing` ヘッドは以下のようにレスポンスヘッダーに含まれます。

```bash
Server-Timing: midd;desc="Middleware timing description";dur=2.4
```

詳細は [Server-Timing MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Server-Timing) を参照してください。
