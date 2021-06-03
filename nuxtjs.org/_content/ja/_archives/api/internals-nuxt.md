---
title: 'API: Nuxt クラス'
description: Nuxt のコアクラス
menu: Nuxt
category: internals
position: 302
---

- ソース: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)**

すべてのモジュールとクラスが通信できるようにするためのコアのコンテナです。すべてのモジュールは Nuxt インスタンスに `this.nuxt` を使ってアクセスできます。

## フック

特定のライフサイクルイベントでのフックを登録できます。

```js
nuxt.hook('ready', async nuxt => {
  // ここにコードを記述してください
})
```

| プラグイン | 引数                   | タイミング                                                                                                 |
| ---------- | ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ready`    | (nuxt)                 | Nuxt が稼働する準備が整ったとき（`ModuleContainer` と `Renderer` の準備が整ったとき）                      |
| `error`    | (error)                | フックを呼び出しにおいて未処理のエラーが発生したとき                                                       |
| `close`    | (nuxt)                 | Nuxt インスタンスが graceful に終了しようとしているとき                                                    |
| `listen`   | (server, {host, port}) | Nuxt **内部の**サーバーがリッスンを始めたとき（`nuxt start` または `nuxt dev` を使っているときに発生する） |
