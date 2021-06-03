---
title: 'API: 모던 프로퍼티'
description: 모던 번들을 빌드하고 서비스하세요
menu: modern
category: configuration
position: 118
---

> 이 기능은 [vue-cli의 modern mode](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode)에서 영감을 받았습니다.

- 타입: `String` 또는 `Boolean`
  - 기본값: false
  - 사용 가능한 값:
    - `'client'`: 모던 번들 `<script type="module">`과 레거시 번들 `<script nomodule>` 스크립트를 둘다 제공하며 모던 번들을 위한 `<link rel="modulepreload">`도 주어집니다. `module` 타입을 이해하는 브라우저는 모던 번들을 로드하고 그보다 오래된 브라우저는 (트랜스파일 된) 레거시번들을 로드합니다.
    - `'server'` 또는 `true`: Node.js 서버가 유저 에이전트로 브라우저를 확인하고그에 맞게 모던 번들 또는 레거시 번들을 제공합니다.
    - `false`: 모던 번들을 비활성화 합니다.

번들에는 두가지 버전이 있습니다:

1. 모던 번들: ES 모듈을 지원하는 모던 브라우저를 대상으로 합니다.
1. 레거시 번들: 바벨 설정 기준보다 더 낮은 브라우저를 대상으로 합니다. (기본값은 IE 9과 호환됩니다.)

**Info:**

- 명령어 옵션 `[--modern | -m]=[mode]`을 사용하여 모던 번들을 빌드/시작 할 수 있습니다. 예를 들어 `package.json`에서는 다음과 같이 사용됩니다:

```json
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```

** *nuxt generate*에 대해:** `mordern` 프로퍼티는 `nuxt generate` 명령어의 동작에도 영향을 줍니다. 하지만 이 경우 `client` 옵션만 사용되며, 다른 값이 주어지지않은 채 `nuxt generate --modern` 명령어를 실행하면 자동으로 `client` 옵션이 선택됩니다.

- `nuxt start` 명령어 실행 시 `modern`이 명시되지 않으면 Nuxt는 자동으로 모드에따라 `modern` 빌드를 감지해 냅니다. 자동 감지되는 모드는 다음과 같습니다:

| 모드      | 모던 모드 |
| --------- | :-------: |
| universal |  server   |
| spa       |  client   |

- `nuxt generate`의 모던 모드는 `client`만 가능합니다
- [`render.crossorigin`](/api/configuration-render#crossorigin)으로 `<link>`와 `<script>`의 `crossorigin` 속성을 설정할 수 있습니다

> 모던 빌드에 대한 더 자세한 내용은 [Phillip Walton의 멋진 포스트](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)를참조하세요
