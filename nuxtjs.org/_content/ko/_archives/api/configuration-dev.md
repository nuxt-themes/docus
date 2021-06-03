---
title: 'API: dev 프로퍼티'
description: 개발 모드, 프로덕션 모드 정의하기.
menu: dev
category: configuration
position: 106
---

# dev 프로퍼티

- 타입: `Boolean`
- 기본값: `true`

> nuxt.js에서 개발 모드, 프로덕션 모드 정의하기.

[nuxt commands](/guide/commands)에 의해 프로퍼티가 덮어씌워집니다:

- `dev`는 `nuxt`에 의해 `true`값이 강제로 적용됩니다.
- `dev`는 `nuxt build`, `nuxt start`, `nuxt generate` 명령어로 강제로 `false`가됩니다.

이 프로퍼티는 [nuxt.js programmatically](/api/nuxt)를 사용할 때 사용됩니다:

예제:

`nuxt.config.js`

```js
module.exports = {
  dev: process.env.NODE_ENV !== 'production'
}
```

`server.js`

```js
const Nuxt = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// Nuxt.js를 옵션으로 인스턴스화 합니다.
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// 개발 모드에서만 사용되는 빌드입니다.
if (config.dev) {
  nuxt.build()
}

// Listen the server
app.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port)
```

`package.json` 파일입니다:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "cross-env NODE_ENV=production node server.js"
  }
}
```

주의: 예제를 사용하기 위해 `npm install --save-dev cross-env` 명령어가 필요할 것입니다. 만약 당신이 윈도우에서 개발하지 _않는다면_ cross-env를 `start` 스크립트에서 제외하고 `NODE_ENV`에 설정할 수 있습니다.
