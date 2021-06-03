---
title: 'API: hooks 프로퍼티'
description: Hooks는 Nuxt event를 감지하는 리스너로써 일반적으로 Nuxt 모듈에서 사용되지만 `nuxt.config.js`에서도 사용할 수 있습니다.
menu: hooks
category: configuration
position: 113
---

- 타입: `Object`

> Hooks는 Nuxt event를 감지하는 리스너로써 일반적으로 Nuxt 모듈에서 사용되지만 `nuxt.config.js`에서도 사용할 수 있습니다. [Learn More](/api/internals)

예제 (`nuxt.config.js`):

```js
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(
          builder.nuxt.options.buildDir,
          'extra-file'
        )
        fs.writeFileSync(extraFilePath, 'Something extra')
      }
    }
  }
}
```

내부적으로 hook은 콜론을 사용한 명명 패턴을 따릅니다. (e.g., `build:done`) 개발자가 `nuxt.config.js`를 사용하여 직접 hook을 설정할 경우 (상기 예시와 같이) 설정상의 편의를 위해 계층적인 객체로 구조화할 수 있습니다. [Nuxt Internals](/api/internals)에서 동작 방법에 대한 더 자세한 내용을 확인해보세요.

## Hooks 리스트

- [Nuxt hooks](https://nuxtjs.org/api/internals-nuxt#hooks)
- [Renderer hooks](https://nuxtjs.org/api/internals-renderer#hooks)
- [ModulesContainer hooks](https://nuxtjs.org/api/internals-module-container#hooks)
- [Builder hooks](https://nuxtjs.org/api/internals-builder#hooks)
- [Generator hooks](https://nuxtjs.org/api/internals-generator#hooks)

## 예제

### root가 아닌 경우에 router.base로 리다이렉트

여러분이 `/` 대신에 `/portal`에서 페이지를 제공하길 원한다고 가정해봅시다.

이것은 거의 경계조건에 가까울테지만, *nuxt.config.js*의 `router.base`는 웹서버가 Nuxt를 도메인 루트가 아닌 곳에서 제공할 때 사용하도록 만들어졌습니다.

하지만 router.base가 /가 아닌데 로컬 개발환경에서 주소창에 *localhost*를 입력한다면 404 응답을 받게 됩니다. 이런 문제를 방지하기 위해서 여러분들은 Hook을 설정할 수 있습니다.

리다이렉트가 production 웹사이트에 가장 적합한 활용사례는 아니겠지만 hook을 활용하는데는 도움이 됩니다.

[`router.base`](/api/configuration-router#base)를 변경하는 것으로 시작합시다; `nuxt.config.js`를 수정하세요:

```js
// nuxt.config.js
import hooks from './hooks'
export default {
  router: {
    base: '/portal'
  }
  hooks: hooks(this)
}
```

그리고 파일을 몇개 생성합니다;

1. Hooks 모듈 `hooks/index.js`

   ```js
   // file: hooks/index.js
   import render from './render'

   export default nuxtConfig => ({
     render: render(nuxtConfig)
   })
   ```

1. Render hook, `hooks/render.js`

   ```js
   // file: hooks/render.js
   import redirectRootToPortal from './route-redirect-portal'

   export default nuxtConfig => {
     const router = Reflect.has(nuxtConfig, 'router') ? nuxtConfig.router : {}
     const base = Reflect.has(router, 'base') ? router.base : '/portal'

     return {
       /**
        * 'render:setupMiddleware'
        * {@link node_modules/nuxt/lib/core/renderer.js}
        */
       setupMiddleware(app) {
         app.use('/', redirectRootToPortal(base))
       }
     }
   }
   ```

1. 미들웨어 `hooks/route-redirect-portal.js`

   ```js
   // file: hooks/route-redirect-portal.js

   /**
    * Nuxt middleware hook to redirect from / to /portal (or whatever we set in nuxt.config.js router.base)
    *
    * Should be the same version as connect
    * {@link node_modules/connect/package.json}
    */
   import parseurl from 'parseurl'

   /**
    * Connect middleware to handle redirecting to desired Web Applicatin Context Root.
    *
    * Notice that Nuxt docs lacks explaning how to use hooks.
    * This is a sample router to help explain.
    *
    * See nice implementation for inspiration:
    * - https://github.com/nuxt/nuxt.js/blob/dev/examples/with-cookies/plugins/cookies.js
    * - https://github.com/yyx990803/launch-editor/blob/master/packages/launch-editor-middleware/index.js
    *
    * [http_class_http_clientrequest]: https://nodejs.org/api/http.html#http_class_http_clientrequest
    * [http_class_http_serverresponse]: https://nodejs.org/api/http.html#http_class_http_serverresponse
    *
    * @param {http.ClientRequest} req Node.js internal client request object [http_class_http_clientrequest]
    * @param {http.ServerResponse} res Node.js internal response [http_class_http_serverresponse]
    * @param {Function} next middleware callback
    */
   export default desiredContextRoot =>
     function projectHooksRouteRedirectPortal(req, res, next) {
       const desiredContextRootRegExp = new RegExp(`^${desiredContextRoot}`)
       const _parsedUrl = Reflect.has(req, '_parsedUrl') ? req._parsedUrl : null
       const url = _parsedUrl !== null ? _parsedUrl : parseurl(req)
       const startsWithDesired = desiredContextRootRegExp.test(url.pathname)
       const isNotProperContextRoot = desiredContextRoot !== url.pathname
       if (isNotProperContextRoot && startsWithDesired === false) {
         const pathname = url.pathname === null ? '' : url.pathname
         const search = url.search === null ? '' : url.search
         const Location = desiredContextRoot + pathname + search
         res.writeHead(302, {
           Location
         })
         res.end()
       }
       next()
     }
   ```

이후, 동료가 실수로 개발 환경에서 `/`를 입력한다면 Nuxt는 자동으로 `/portal`로리다이렉트 시켜줄 것입니다.
