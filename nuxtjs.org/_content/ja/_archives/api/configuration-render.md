---
title: 'API: render プロパティ'
description: Nuxt.js はページレンダリングの実行時オプションをカスタマイズできます。
menu: render
category: configuration
position: 122
---

> Nuxt.js はページレンダリングの実行時オプションをカスタマイズできます。

## bundleRenderer

- 型: `Object`

> このオプションを使用して Vue SSR のバンドルレンダラのカスタマイズします。このオプションは SPA モードではスキップされます。

```js
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

利用可能なオプションは [Vue SSR API リファレンス](https://ssr.vuejs.org/ja/api/#レンダラオプション) でより詳しく学べます。 Nuxt.js は既に最高の SSR のデフォルト設定を提供していて、誤った設定が SSR の問題を引き起こす可能性があるため、このオプションを使用しないことをお勧めします。

## etag

- 型: `Object`
  - デフォルト: `{ weak: true }`

ページの etag を無効にするためには `etag: false` をセットしてください。

利用可能なオプションは [etag](https://www.npmjs.com/package/etag) を参照してください。

`etag.hash` を指定することで、独自のハッシュ関数を使用することができます。

`nuxt.config.js`

```js
import { murmurHash128 } from 'murmurhash-native'

export default {
  render: {
    etag: {
      hash: html => murmurHash128(html)
    }
  }
}
```

この場合、html の body サイズが大きいほどより高速な [murmurhash-native](https://github.com/royaltm/node-murmurhash-native) を使用します。独自のハッシュ関数を指定した場合、`weak` オプションは無視されることに注意してください。

## compressor

- 型 `Object`
  - デフォルト: `{ threshold: 0 }`

Object を設定する場合、[compression](https://www.npmjs.com/package/compression) がミドルウェアとして利用され、そのオプションとして参照されます。

独自の圧縮ミドルウェアを使用したい場合は、直接参照することができます。(f.ex. `otherComp({ myOptions: 'example' })`)

圧縮を無効にするには、`compressor: false` を使います。

## fallback

- 型 `Object`
  - デフォルト: `{ dist: {}, static: { skipUnknown: true } }`

> [serve-placeholder](https://github.com/nuxt/serve-placeholder) ミドルウェアのオプションです。

もしこれらのうち 1 つか両方を無効にする場合は、偽となる値を渡すことができます。

## http2

- 型 `Object`
  - デフォルト: `{ push: false, pushAssets: null }`

> HTTP2 プッシュヘッダーを有効にします。

`pushAssets` 関数でプッシュされるリンクをコントロールすることができます。

**例:**

```js
pushAssets: (req, res, publicPath, preloadFiles) =>
  preloadFiles
    .filter(f => f.asType === 'script' && f.file === 'runtime.js')
    .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
```

配列と同様に自分のアセットを追加することができます。 `req` と `res` を使うことで、例えばアプリケーションバージョンを持ったクッキーを使うといったように、リクエストヘッダを元にどのリンクをプッシュするか決めることができます。

それらのアセットは `,` を区切り文字として合成され、1 つの `Link` ヘッダに渡されます。

## injectScripts

- 型: `Boolean`
- デフォルト: `true`

> Nuxt のバンドルに `<script>` を追加します。JS を除く純粋な HTML を表示する場合は `false` に設定してください。(`v2.8.0+` から利用可能)

## resourceHints

- 型: `Boolean`
  - デフォルト: `true`

> 初期ページの読み込み時間をより早くするために、 `prefetch` と `preload` のリンクを追加しました。

多くのページとルートがある場合に、このオプションのみを無効にすることができます。

## ssr

- 型: `Boolean`
  - デフォルト: ユニバーサルモードでは `true` SPA モードでは `false`

> SSR レンダリングを有効にする

このオプションは、提供されていなければ `mode` に基づいて自動的に設定されます。これは（例えば Docker で）イメージビルド後にランタイムで SSR を動的に有効/無効にするのに便利です。

## ssrLog

- 型: `Boolean` | `String`
- デフォルト: `true` in dev mode and `false` in production

> デバックしやすいように、サーバーサイドのログをブラウザに転送します（開発モードのみ利用可能）

ログを折り畳むには、`'collapsed'` を設定します。

## static

- 型: `Object`
  - デフォルト: `{}`

> `static/` ディレクトリの振る舞いを設定します

利用可能なオプションは [serve-static](https://www.npmjs.com/package/serve-static) を参照してください。

それらに加えて、デフォルトで `true` になる `prefix` オプションを導入しました。静的なアセットに router base を追加します。

**例:**

- アセット: `favicon.ico`
- Router base: `/t`
- `prefix: true`（デフォルト）: `/t/favicon.ico`
- `prefix: false`: `/favicon.ico`

**Caveats:**

一部 URL の書き換えでは、プレフィックスが守られないかもしれません。

## dist

- 型: `Object`
  - デフォルト: `{ maxAge: '1y', index: false }`

> 配布ファイルの配信に使用されるオプションです。本番でのみ適用されます。

利用可能なオプションは [serve-static](https://www.npmjs.com/package/serve-static) を参照してください。

## csp

- 型: `Boolean` または `Object`
  - デフォルト: `false`

> これは Content-Security-Policy で適用された外部リソースを読み込む設定をするために使用します。

`script-src` ポリシーに `'unsafe-inline'` が含まれている場合、CSP のハッシュは追加されないことに注意してください。これは、ハッシュが存在する場合、ブラウザが `'unsafe-inline'` を無視するためです。CSPv1 の後方互換性のために `'unsafe-inline'` とハッシュの両方の定義が必要な場合は、オプションの `unsafeInlineCompatibility` を `true` に設定します。

すべての CSP ポリシーで [`<meta http-equiv="Content-Security-Policy"/>`](https://developer.mozilla.org/ja/docs/Web/HTTP/CSP) を追加するには、 `csp.addMeta` を `true` に設定する必要があります。

例 (`nuxt.config.js`)

```js
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
  ロギング、トラッキングの分析を行えます。

  Sentry.io のブログで確認する
  https://blog.sentry.io/2018/09/04/how-sentry-captures-csp-violations

  どのトラッキングリンクを使うべきかを学ぶこと。
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
