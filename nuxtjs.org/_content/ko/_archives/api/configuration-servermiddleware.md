---
title: 'API: serverMiddleware 프로퍼티'
description: 서버 사이드 미들웨어를 정의합니다.
menu: serverMiddleware
category: configuration
position: 127
---

- 타입: `Array`
  - 항목: `String`, `Object` 또는 `Function`

Nuxt는 커스텀 미들웨어를 추가할 수 있는 [connect](https://github.com/senchalabs/connect) 인스턴스를 내부적으로 생성합니다. 이는 개발자들에게 **외부 서버 없이도** 추가적인 라우트를 (일반적으로 `/api`와 같은 라우트들) 등록할 수 있게 해줍니다.

connect 자체는 미들웨어이므로 등록된 미들웨어는 `nuxt start`로도 동작하고, [express-template](https://github.com/nuxt-community/express-template)처럼 프로그래밍적인 방식의 미들웨어로도 동작합니다. Nuxt [Modules](/guide/modules) 역시 [this.addServerMiddleware()](/api/internals-module-container#addservermiddleware-middleware-)를사용해서 `serverMiddleware`를 제공할 수 있습니다.

여기에 더하여 기본값이 `true`인 `prefix` 옵션을 소개하겠습니다. 이 옵션은 서버미들웨어에 라우터 베이스를 추가합니다.

**예시:**

- 서버 미들웨어 경로: `/api`
- 라우터 베이스: `/admin`
- `prefix: true`일때 (기본값): `/admin/api`
- `prefix: false`일때: `/api`

## serverMiddleware vs middleware!

클라이언트 측 또는 SSR의 Vue가 각 라우트 전에 호출하는 [routes middleware](/guide/routing#middleware)와 혼동하지 마세요. `serverMiddleware` 프로퍼티에 명시된 미들웨어는 `vue-server-renderer` **이전에** 서버 사이드를 실행하여 API 요청을 다루거나 에셋을 서비스하는 등의 서버 작업을 수행하는데 사용될 수 있습니다.

## 사용방법

값이 문자열이면 Nuxt.js는 자동으로 미들웨어를 찾아서 불러오는 시도를 합니다.

예제 (`nuxt.config.js`):

```js
import serveStatic from 'serve-static'

export default {
  serverMiddleware: [
    // redirect-ssl npm 패키지를 등록합니다
    'redirect-ssl',

    // /api/* 처리를 위해 프로젝트 api 디렉토리의 파일을 등록합니다
    { path: '/api', handler: '~/api/index.js' },

    // 커스텀 인스턴스를 생성할 수도 있습니다
    { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ]
}
```

<p class="Alert Alert--danger">
    <b>주의! </b>
    미들웨어를 모든 라우트에 등록하고자 하는 것이 아니라면 반드시 경로가 지정된 객체 형식을 사용하세요. 그렇지 않으면 nuxt 기본 핸들러가 동작하지 않습니다!
</p>

## 커스텀 서버 미들웨어

커스텀 미들웨어를 작성할 수 있습니다. 더 자세한 내용은 [Connect Docs](https://github.com/senchalabs/connect#appusefn)를 참조하세요.

Middleware (`server-middleware/logger.js`):

```js
export default function (req, res, next) {
  // req는 Node.js http request 객체입니다
  console.log(req.url)

  // res는 Node.js http response 객체입니다

  // next는 다음 미들웨어를 실행하는 함수입니다
  // 여러분의 미들웨어가 엔드포인트가 아니라면 마지막에 next를 호출하는 것을 잊지 마세요!
  next()
}
```

Nuxt Config (`nuxt.config.js`):

```js
serverMiddleware: ['~/api/logger']
```

## 객체 구문

서버 미들웨어가 경로에 매핑된 함수들의 리스트로 구성되어 있다면:

```js
export default {
  serverMiddleware: [
    { path: '/a', handler: '~/api/a.js' },
    { path: '/b', handler: '~/api/b.js' },
    { path: '/c', handler: '~/api/c.js' }
  ]
}
```

대신해서 다음과 같이 정의하는 객체를 전달할 수 있습니다:

```js
export default {
  serverMiddleware: {
    '/a': '~/api/a.js',
    '/b': '~/api/b.js',
    '/c': '~/api/c.js'
  }
}
```
