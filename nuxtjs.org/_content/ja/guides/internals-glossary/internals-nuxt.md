---
title: 'Nuxt クラス'
description: Nuxt のコアクラス
menu: Nuxt クラス
category: internals-glossary
position: 4
---

- ソース: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)**

すべてのモジュールとクラスが通信できるようにするためのコアコンテナです。すべてのモジュールは `this.nuxt` を使って Nuxt インスタンスにアクセスできます。

## フック

特定のライフサイクルイベントでフックを登録できます。

```js
nuxt.hook('ready', async nuxt => {
  // ここにコードを記述してください
})
```

| プラグイン | 引数 | タイミング |
| --- | --- | --- |
| `ready` | (nuxt) | Nuxt（`ModuleContainer` と `Renderer`）の準備が整ったとき |
| `error` | (error) | フックの呼び出し時に未処理のエラーが発生したとき |
| `close` | (nuxt) | Nuxt インスタンスが正しく終了したとき |
| `listen` | (server, {host, port}) | Nuxt **内部**のサーバーがリッスンを始めたとき（`nuxt start` または `nuxt dev` を使用時に発生します） |
