---
title: 'API: Renderer クラス'
description: Nuxt Renderer クラス
menu: Renderer
category: internals
position: 303
---

- ソース: **[vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)**

このクラスは、すべての SSR とアセットのリクエストを処理して提供する connect ミドルウェアをエクスポートしています。

## フック

特定のライフサイクルイベントでのフックを登録できます。

| フック                   | 引数                         | タイミング                                                                                                                                                                                                                                                    |
| ------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `render:before`          | (renderer, options)          | Renderer クラスのミドルウェアとリソースを設定する前、メソッドやオプションのオーバーロードに役立ちます。                                                                                                                                                       |
| `render:setupMiddleware` | (app) _connect インスタンス_ | Nuxt が追加する前のミドルウェアスタックです。カスタムしたサーバーサイドミドルウェアを登録するために使用できます。                                                                                                                                             |
| `render:errorMiddleware` | (app) _connect インスタンス_ | Nuxt のエラーミドルウェアを追加する前、Nuxt のミドルウェアを使用する前に独自のミドルウェアを追加することに役立ちます。詳細については、[Sentry モジュール](https://github.com/nuxt-community/sentry-module/blob/v4.0.3/lib/module.js#L151)を参照してください。 |
| `render:resourcesLoaded` | (resources)                  | レンダラーのリソースがロードされた後に呼び出されます（クライアントマニフェスト、サーバーバンドルなど）。                                                                                                                                                      |
| `render:done`            | (renderer)                   | SSR ミドルウェアとすべてのリソースの準備がおわったとき（Renderer 準備完了）                                                                                                                                                                                   |
| `render:routeContext`    | (context.nuxt)               | _`render：route` フックの前に route がサーバーレンダリングされるたび。_ Nuxt コンテキストを `window.__ NUXT__` にシリアライズする前に呼び出され、クライアントサイドでフェッチできるデータを追加することに役立ちます。                                         |
| `render:route`           | (url, result, context)       | _route がサーバーレンダリングされるたび。_ リクエストをブラウザに送り返す前に呼び出されます。                                                                                                                                                                 |
| `render:routeDone`       | (url, result, context)       | _route がサーバーレンダリングされるたび。_ レスポンスがブラウザに送られた後に呼び出されます。                                                                                                                                                                 |
