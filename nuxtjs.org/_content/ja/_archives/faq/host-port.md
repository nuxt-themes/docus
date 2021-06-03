---
title: ホストとポート番号を変更するには？
description: ホストとポート番号を変更するには？
category: configuration
position: 7
---

デフォルトでは、Nuxt の開発サーバーのホストは `localhost`（ホストマシン内からのみアクセスが可能）です。

ホストの `0.0.0.0` は、ホストマシンの _外部_ の接続（例えば LAN）にアクセス可能なホストアドレスを解決するよう Nuxt に伝えるためにデザインされています。

いくつかの方法で接続変数を設定することができます。以下は、優先度の **高い順** のものから列挙されています。

> **メモ:** もし `port` に `'0'` ( `0` ではありません) という文字列の値が使用された場合、ランダムなポートが Nuxt アプリケーションに使用されます。

## 直接の引数として

```sh
nuxt --hostname myhost --port 3333
```

もしくは

```js
"scripts": {
  "dev": "nuxt --hostname myhost --port 3333"
}
```

## `nuxt.config.js` 内の設定:

`nuxt.config.js` 内:

```js
export default {
  server: {
    port: 8000, // デフォルト: 3000
    host: '0.0.0.0' // デフォルト: localhost
  }
  // その他の設定
}
```

## 環境変数 NUXT_HOST と NUXT_PORT を使う:

HOST と PORT に似ていますが、HOST と PORT を他の用途に使っている場合に NUXT_HOST と NUXT_PORT を使います:

```js
"scripts": {
  "dev": "NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

**メモ**: より良いクロスプラットフォーム開発サポートのために [cross-env](https://www.npmjs.com/package/cross-env) を使うことができます。

インストール:

```bash
npm install --save-dev cross-env
```

```js
"scripts": {
  "dev": "cross-env NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

## 環境変数 HOST と PORT を使う:

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

## `package.json` 内の `nuxt` の設定から:

`package.json` 内:

```json
"config": {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3333"
  }
},
"scripts": {
  "dev": "nuxt"
}
```
