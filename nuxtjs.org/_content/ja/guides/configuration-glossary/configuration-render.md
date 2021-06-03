---
title: 'render プロパティ'
description: 'Nuxt.js はページレンダリング用のランタイムオプションをカスタマイズできます'
menu: render
category: configuration-glossary
position: 22
---

> Nuxt.js はページレンダリング用のランタイムオプションをカスタマイズできます。

## bundleRenderer

- 型: `Object`

> このオプションを使って Vue SSR のバンドルレンダラーをカスタマイズします。`ssr: false` が設定されている場合このオプションはスキップされます。

```js{}[nuxt.config.js]
export default {
  render: {
    bundleRenderer: {
      directives: {
        custom1(el, dir) {
          // 何かの処理 ...
        }
      }
    }
  }
}
```

利用可能なオプションについての詳細は [Vue SSR API リファレンス](https://ssr.vuejs.org/en/api.html#renderer-options) を参照してください。Nuxt.js はすでに最高の SSR のデフォルト設定を提供しており誤った設定は SSR の問題を引き起こすので、このオプションは使用しないことをおすすめします。

## etag

- 型: `Object`
  - デフォルト: `{ weak: true }`

ページの etag を無効にするには `etag: false` を設定してください。

利用可能なオプションは [etag](https://www.npmjs.com/package/etag) のドキュメントを参照してください。

`etag.hash` を指定することで、独自のハッシュ関数を使用することができます:

```js{}[nuxt.config.js]
import { murmurHash128 } from 'murmurhash-native'

export default {
  render: {
    etag: {
      hash: html => murmurHash128(html)
    }
  }
}
```

この場合、大きい HTML の body サイズに対して高速な [murmurhash-native](https://github.com/royaltm/node-murmurhash-native) を使います。独自のハッシュ関数を指定する場合、`weak` オプションは無視されることに注意してください。

## compressor

- 型: `Object`
  - デフォルト: `{ threshold: 0 }`

オブジェクトを提供する場合、[compression](https://www.npmjs.com/package/compression) ミドルウェアがそれぞれのオプションと共に使われます。

独自の圧縮ミドルウェアを使用したい場合は、直接参照することができます（例: `otherComp({ myOptions: 'example' })`）。

圧縮を無効にするには `compressor: false` を設定します。

## fallback

- 型: `Object`
  - デフォルト: `{ dist: {}, static: { skipUnknown: true } }`
  - `dist` キーは [publicPath](/docs/2.x/configuration-glossary/configuration-build#publicpath) に一致するルート用です（例: `/_nuxt/*`）
  - `static` キーは `/*` に一致するルートに一致するルート用です

> `dist` と `static` の値は [serve-placeholder](https://github.com/nuxt/serve-placeholder) ミドルウェアに転送されます。

もしこれらのうち 1 つか両方を無効にする場合は、falsy な値を渡すことができます。

ルーティングに `.js` 拡張子を許可する例（例: `/repos/nuxt.js`）:

```js [nuxt.config.js]
export default {
  render: {
    fallback: {
      static: {
        // これらの拡張子に対し 404 の送信を避けます
        handlers: {
          '.js': false
        }
      }
    }
  }
}
```

## http2

- 型: `Object`
  - デフォルト: `{ push: false, pushAssets: null }`

> HTTP2 プッシュヘッダーを有効にします。

`pushAssets` 関数を使ってプッシュするリンクを制御できます。

例:

```js
pushAssets: (req, res, publicPath, preloadFiles) =>
  preloadFiles
    .filter(f => f.asType === 'script' && f.file === 'runtime.js')
    .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
```

独自のアセットを配列に追加することもできます。`req` と `res` を使ってリクエストヘッダーを元にプッシュするリンクを決めることができます。例えばアプリケーションのバージョンでクッキーを使います。

アセットは `,` で結合され、1 つの `Link` ヘッダーとして渡されます。

## asyncScripts

- 型: `Boolean`
  - デフォルト: `false`

> Nuxt バンドル用に `<script>` タグに `async` 属性を追加し、パースと並行してフェッチできるようにします（`v2.14.8` 以上から利用可能）。[詳細はこちら](https://developer.mozilla.org/ja/docs/Web/HTML/Element/script)を参照してください。

## injectScripts

- 型: `Boolean`
  - デフォルト: `true`

> Nuxt のバンドルに `<script>` を追加します（v2.8.0 以降で利用可能）。JS を除く純粋な HTML を表示する場合は false に設定してください。

## resourceHints

- 型: `Boolean`
  - デフォルト: `true`

> 初期ページの読み込み時間をより早くするために `prefetch` と `preload` リンクを追加します。

ページとルートが多い場合にのみ、このオプションを無効にすることをおすすめします。

## ssr

- 型: `Boolean`
  - デフォルト: `true`
  - クライアントサイドのレンダリングの場合のみ `false`

> SSR レンダリングを有効にします。

このオプションが指定されていない場合、グローバルな `ssr` の値に基づいて自動的に設定されます。これは（例えば Docker で）イメージビルド後にランタイムで SSR を動的に有効/無効にするのに便利です。

## crossorigin

- 型: `String`
- デフォルト: `undefined`

  生成された HTML の `<link rel="stylesheet">` と `<script>` タグに `crossorigin` 属性を設定します。

  詳細: [CORS 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Attributes/crossorigin)

## ssrLog

- 型: `Boolean` または `String`
  - デフォルト: 開発モードでは `true`、本番では `false`

> デバックしやすいように、サーバーサイドのログをブラウザに転送します（開発モードのみ利用可能）。

ログを折りたたむには `'collapsed'` を設定します。

## static

- 型: `Object`
  - デフォルト: `{}`

> `static/` ディレクトリの振る舞いを設定します

利用可能なオプションは [serve-static](https://www.npmjs.com/package/serve-static) のドキュメントを参照してください。

それらに加えて、デフォルト true の `prefix` オプションを導入しました。静的なアセットに router base を追加します。

**例:**

- アセット: `favicon.ico`
- Router base: `/t`
- `prefix: true` の場合（デフォルト）: `/t/favicon.ico`
- `prefix: false` の場合: `/favicon.ico`

**警告:**

一部の URL の書き換えではプレフィックスが守られないかもしれません。

## dist

- 型: `Object`
  - デフォルト: `{ maxAge: '1y', index: false }`

> 配布ファイルのデプロイに使用されるオプションです。本番でのみ適用されます。

利用可能なオプションは [serve-static](https://www.npmjs.com/package/serve-static) のドキュメントを参照してください。

## csp

- 型: `Boolean` または `Object`
  - デフォルト: `false`

> これを使用して、外部リソースを読み込むように Content-Security-Policy を構成します

**前提条件:**

これらの CSP 設定は、Nuxt に `target: 'server'` を設定して SSR アプリケーションを提供する場合にのみ有効です。`csp.policy` で定義されたポリシーはレスポンスの `Content-Security-Policy` HTTP ヘッダーに追加されます。

**設定の更新:**

これらの設定は Nuxt サーバーが `nuxt.config.js` から直接読み込みます。つまり、これらの設定の変更にはサーバー再起動時に有効になります。CSP 設定を更新するためにアプリケーションをリビルドする必要はありません。

**HTML メタタグ:**

[`<meta http-equiv="Content-Security-Policy"/>`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) を `<head>` に追加するには、`csp.addMeta` を `true` に設定する必要があります。この機能は `csp.policies` の設定とは無関係であることに注意してください:

- `script-src` タイプのポリシーを追加するだけで
- `script-src` ポリシーにはインラインの `<script>` タグのハッシュのみが含まれます。

`csp.addMeta` を `true` に設定した場合でも、定義されたポリシーの完全なセットが HTTP レスポンスヘッダーに追加されます。

`script-src` ポリシーに `'unsafe-inline'` が含まれている場合、CSP ハッシュは `<meta>` として追加されないことに注意してください。これはハッシュが存在する場合、ブラウザが `'unsafe-inline'` を無視するためです。CSPv1 との互換性のために `'unsafe-inline'` とハッシュの両方が必要な場合は `unsafeInlineCompatibility` オプションを `true` に設定してください。その場合 `<meta>` タグにはインラインの `<script>` タグのハッシュのみが含まれ、`csp.policies` で定義されたポリシーは `Content-Security-Policy` HTTP レスポンスヘッダーで使用されます。

```js{}[nuxt.config.js]
export default {
  render: {
    csp: true
  }
}

// または

export default {
  render: {
    csp: {
      hashAlgorithm: 'sha256',
      policies: {
        'script-src': [
          'https://www.google-analytics.com',
          'https://name.example.com'
        ],
        'report-uri': ['https://report.example.com/report-csp-violations']
      },
      addMeta: true
    }
  }
}

// または
/*
   次の例では、Google Analytics、LogRocket.io、および Sentry.io で
   ロギング、トラッキングの分析が行えます。

  どのトラッキングリンクを使用すべきか学ぶために
  Sentry.io のブログを確認してください
  https://blog.sentry.io/2018/09/04/how-sentry-captures-csp-violations
*/
const PRIMARY_HOSTS = `loc.example-website.com`
export default {
  render: {
    csp: {
      reportOnly: true,
      hashAlgorithm: 'sha256',
      policies: {
        'default-src': ["'self'"],
        'img-src': ['https:', '*.google-analytics.com'],
        'worker-src': ["'self'", `blob:`, PRIMARY_HOSTS, '*.logrocket.io'],
        'style-src': ["'self'", "'unsafe-inline'", PRIMARY_HOSTS],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          PRIMARY_HOSTS,
          'sentry.io',
          '*.sentry-cdn.com',
          '*.google-analytics.com',
          '*.logrocket.io'
        ],
        'connect-src': [PRIMARY_HOSTS, 'sentry.io', '*.google-analytics.com'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': [PRIMARY_HOSTS],
        'report-uri': [
          `https://sentry.io/api/<project>/security/?sentry_key=<key>`
        ]
      }
    }
  }
}
```
