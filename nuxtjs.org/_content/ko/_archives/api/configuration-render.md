---
title: 'API: render 프로퍼티'
description: 페이지 렌더링을 위한 런타임 옵션을 사용자 설정 할수 있습니다
menu: render
category: configuration
position: 122
---

> 페이지 렌더링을 위한 런타임 옵션을 사용자 설정 할수 있습니다

## bundleRenderer

- 타입: `Object`

> 이 설정은 vue SSR 번들 렌더러를 커스텀할 수 있습니다. 이 설정은 spa 모드에서는무시됩니다.

```js
export default {
  render: {
    bundleRenderer: {
      directives: {
        custom1(el, dir) {
          // something ...
        }
      }
    }
  }
}
```

[Vue SSR API Reference](https://ssr.vuejs.org/en/api.html#renderer-options)에서사용가능한 옵션에 대해 더 알아보세요. Nuxt.js는 이미 최적의 SSR 기본 옵션을 제공하고 있기 때문에 이 옵션은 사용하지 않는 것을 권장합니다. 잘못된 설정은 SSR에 문제를 일으킬 수 있습니다.

## etag

- 타입: `Object`
  - 기본값: `{ weak: true }`

페이지의 etag를 비활성화 하려면 `etag: false`로 설정하세요

사용가능한 옵션에 대해서는 [etag](https://www.npmjs.com/package/etag) 문서를 참고하세요.

`etag.hash`를 통해서 여러분 고유의 해시 함수를 사용할 수 있습니다:

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

이 예제에서는 큰 크기의 html을 더 빠르게 처리하는 [murmurhash-native](https://github.com/royaltm/node-murmurhash-native)가 사용되었습니다. 여러분이 직접 해시 함수를 명시하면 `weak` 옵션은 무시된다는 것을 기억하세요.

## compressor

- 타입 `Object`
  - 기본값: `{ threshold: 0 }`

객체를 제공하면 (각각의 옵션과 함께) [compression](https://www.npmjs.com/package/compression) 미들웨어가 사용될 것입니다.

자신의 compression 미들웨어를 사용하고자 한다면 직접 참조할 수 있습니다. (f.ex. `otherComp({ myOptions: 'example' })`)

compression을 끄려면 `compressor: false`를 사용하세요.

## fallback

- 타입 `Object`
  - 기본값: `{ dist: {}, static: { skipUnknown: true } }`

> [serve-placeholder](https://github.com/nuxt/serve-placeholder) 미들웨어에 적용될 옵션입니다.

둘 중 하나 또는 둘 다를 비활성화하려면 falsy값을 전달하면 됩니다.

## http2

- 타입 `Object`
  - 기본값: `{ push: false, pushAssets: null }`

> HTTP2 푸시 헤더를 활성화합니다.

`pushAssets` 함수로 푸시할 링크를 제어할 수 있습니다.

예제:

```js
pushAssets: (req, res, publicPath, preloadFiles) =>
  preloadFiles
    .filter(f => f.asType === 'script' && f.file === 'runtime.js')
    .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
```

자신의 에셋을 배열에 추가할 수도 있습니다. `req`와 `res`을 사용하여 요청 헤더에따라 어떤 링크를 푸시할 것인지 결정할 수 있습니다. (예: 쿠키의 애플리케이션 버전 )

에셋은 `,`로 결합되어 단일 `Link` 헤더로 전달됩니다.

## injectScripts

- 타입: `Boolean`
  - 기본값: `true`

> Nust 번들에 `<script>`를 추가합니다. `false`로 설정하면 JS 없이 순수한 HTML을렌더링합니다 (`2.8.0` 이상 버전에서 사용가능)

## resourceHints

- 타입: `Boolean`
  - 기본값: `true`

> 최초 페이지 로드 시간을 단축시키기 위해서 `prefetch`와 `preload` 링크를 추가합니다.

You may want to only disable this option if you have many pages and routes.

## ssr

- 타입: `Boolean`
  - 기본값: universal 모드에서는 `true`, spa 모드에서는 `false`

> SSR 렌더링을 활성화합니다.

이 옵션은 따로 설정하지 않으면 `mode` 값에 따라 자동으로 설정됩니다. (docker 같은) 이미지 빌드 후에 동적으로 SSR을 활성화/비활성화 할때 유용합니다.

## ssrLog

- 타입: `Boolean` | `String`
  - 기본값: dev 모드에서는 `true`, production 모드에서는 `false`

> 더 나은 디버깅을 위해 서버 사이드의 로그를 브라우저로 전송합니다 (development 환경에서만 사용가능)

로그를 접어서 보려면 '`collapsed`' 값을 사용하세요.

## static

- 타입: `Object`
  - 기본값: `{}`

> `static/` 디렉토리의 동작을 설정합니다

[serve-static](https://www.npmjs.com/package/serve-static) 문서에서 사용가능한옵션을 살펴보세요.

그 외에, 우리는 기본값이 `true`인 `prefix` 옵션을 추가했습니다. 이 옵션은 여러분의 정적 에셋에 라우터 베이스를 추가합니다.

**예시:**

- 에셋: `favicon.ico`
- 라우터 베이스: `/t`
- `prefix: true`로 설정 시 (기본값): `/t/favicon.ico`
- With `prefix: false`로 설정 시: `/favicon.ico`

**경고:**

일부 URL 재작성은 prefix를 따르지 않을 수 있습니다.

## dist

- 타입: `Object`
  - 기본값: `{ maxAge: '1y', index: false }`

> 배포 파일을 서비스할 때 사용되는 옵션. production에만 적용됩니다.

[serve-static](https://www.npmjs.com/package/serve-static) 문서에서 사용가능한옵션을 살펴보세요.

## csp

- 타입: `Boolean` 또는 `Object`
  - 기본값: `false`

> 설정을 통해 Content-Security-Policy의 외부 자원을 로드하세요

`script-src` 정책이 `'unsafe-inline'`을 포함하면 CSP 해시가 추가되지 않는다는 것을 기억하세요. 이것은 해시가 있으면 브라우저가 `'unsafe-inline'`을 무시하기 때문입니다. CSPv1 호환성을 위해 해시와 `'unsafe-inline'`을 모두 원한다면`unsafeInlineCompatibility` 옵션을 'true'로 설정하세요.

모든 CSP 정책과 함께 [`<meta http-equiv="Content-Security-Policy"/>`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)를추가하려면 `csp.addMeta`를 `true`로 설정해야 합니다.

예제 (`nuxt.config.js`)

```js
export default {
  render: {
    csp: true
  }
}

// 또는

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

// 또는
/*
  다음 예시는 로그와 분석 트래킹을 위해서 Google Analytics, LogRocket.io와 Sentry.io를 허용합니다.

  어떤 트래킹 링크를 사용해야 할지 Sentry.io의 다음 블로그에서 확인해보세요.
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
