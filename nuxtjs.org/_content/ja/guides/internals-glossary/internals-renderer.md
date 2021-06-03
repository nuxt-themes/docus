---
title: 'Renderer クラス'
description: Nuxt の Renderer クラス
menu: Renderer
category: internals-glossary
position: 5
---

- ソース: **[vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)**

このクラスは、すべての SSR とアセットのリクエストを処理して提供する connect ミドルウェアをエクスポートしています。

## フック

特定のライフサイクルイベントでフックを登録できます。

| フック | 引数 | タイミング |
| --- | --- | --- |
| `render:before` | (renderer, options) | Renderer クラスのミドルウェアとリソースを設定する前、メソッドやオプションのオーバーロードに役立ちます。 |
| `render:setupMiddleware` | (app) _connect instance_ | Nuxt が追加する前のミドルウェアスタックです。カスタムしたサーバーサイドミドルウェアを登録するために使用できます。 |
| `render:errorMiddleware` | (app) _connect instance_ | Nuxt のエラーミドルウェアを追加する前、Nuxt のミドルウェアを使用する前に独自のミドルウェアを追加することに役立ちます。詳細については [Sentry モジュール](https://github.com/nuxt-community/sentry-module/blob/v4.0.3/lib/module.js#L151)を参照してください。 |
| `render:resourcesLoaded` | (resources) | レンダラーのリソースがロードされた後に呼び出されます（クライアントマニフェスト、サーバーバンドルなど）。 |
| `render:done` | (renderer) | SSR ミドルウェアとすべてのリソースの準備がおわったとき（Renderer の準備完了） |
| `render:routeContext` | (context.nuxt) | _`render:route` フックの前に route がサーバーレンダリングされるたび_。 Nuxt コンテキストを `window.__NUXT__` にシリアライズする前に呼び出され、クライアントサイドでフェッチできるデータを追加することに役立ちます。 |
| `render:route` | (url, result, context) | _route がサーバーレンダリングされるたび_。リクエストをブラウザに送り返す前に呼び出されます。 |
| `render:routeDone` | (url, result, context) | _route がサーバーレンダリングされるたび_。レスポンスがブラウザに送られた後に呼び出されます。 |
