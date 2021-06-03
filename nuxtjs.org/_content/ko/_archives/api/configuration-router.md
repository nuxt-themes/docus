---
title: 'API: router 프로퍼티'
description: router 프로퍼티를 이용하여 nuxt.js 라우터를 사용자 정의할 수 있습니다.
menu: router
category: configuration
position: 124
---

# router 프로퍼티

> router 프로퍼티를 이용하여 nuxt.js 라우터를 사용자 정의할 수 있습니다. ([vue-router](https://router.vuejs.org/kr/)).

## base

- 타입: `String`
- 기본값: `'/'`

어플리케이션의 기본 URL입니다. 예를 들어, SPA가 `/app/` 아래에서 돌아가고 있다고한다면, 기본값은 `/app/`이 되어야 합니다.

예제 (`nuxt.config.js`):

```js
module.exports = {
  router: {
    base: '/app/'
  }
}
```

<div class="Alert Alert-blue">

`base`가 설정되면, nuxt.js는 문서의 헤더를 추가합니다 `<base href="{{ router.base }}"/>`.

</div>

> 이 옵션은 vue-router에 다이렉트로 제공됩니다. [Router 생성자](https://router.vuejs.org/kr/api/options.html).

## mode

- 타입: `String`
- 기본값: `'history'`

router 모드를 설정하면, server-side rendering으로 이 값을 바꾸지 않는 것을 추천합니다.

예제 (`nuxt.config.js`):

```js
module.exports = {
  router: {
    mode: 'hash'
  }
}
```

> 이 옵션은 vue-router에 다이렉트로 제공됩니다. [Router 생성자](https://router.vuejs.org/kr/api/options.html).

## linkActiveClass

- 타입: `String`
- 기본값: `'nuxt-link-active'`

[`<nuxt-link>`](/api/components-nuxt-link)는 기본 active 클래스의 전역 설정 입니다.

예제 (`nuxt.config.js`):

```js
module.exports = {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> 이 옵션은 vue-router에 다이렉트로 제공됩니다. [Router 생성자](https://router.vuejs.org/kr/api/options.html).

## scrollBehavior

- 타입: `Function`

`scrollBehavior` 옵션으로 경로 사이의, 스크롤 위치에 대한 사용자 지정 동작을 정의 할 수 있습니다. 이 메서드는 페이지가 렌더링 될 때마다 호출됩니다.

기본적으로, scrollBehavior은 아래와 같이 설정됩니다:

```js
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (
          typeof window.CSS !== 'undefined' &&
          typeof window.CSS.escape !== 'undefined'
        ) {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn(
            'Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).'
          )
        }
      }
      resolve(position)
    })
  })
}
```

모든 경로가 스크롤 위치를 최상단으로 가지는 예제입니다:

`nuxt.config.js`

```js
module.exports = {
  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  }
}
```

> 이 옵션은 vue-router에 다이렉트로 제공됩니다. [Router 생성자](https://router.vuejs.org/kr/api/options.html).

## middleware

- 타입: `String` or `Array`
  - Items: `String`

어플리케이션의 모든 페이지에 대한 기본 미들웨어를 설정합니다.

예제:

`nuxt.config.js`

```js
module.exports = {
  router: {
    // 모든 페이지에서 middleware/user-agent.js를 실행하세요
    middleware: 'user-agent'
  }
}
```

`middleware/user-agent.js`

```js
export default function (context) {
  // 컨텍스트에 userAgent 프로퍼티를 추가합니다. (`data`와 `fetch`에서 사용 가능)
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

미들웨어 대해 더 알고싶으시다면 [미들웨어 가이드](/guide/routing#middleware) 문서를 확인해주세요.

## extendRoutes

- 타입: `Function`

nuxt.js가 만든 경로를 `extendRoutes` 옵션을 통해 확장할 수 있습니다.

사용자 정의 경로를 추가하는 예제입니다:

`nuxt.config.js`

```js
module.exports = {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

nuxt.js 경로 스키마는 [vue-router](https://router.vuejs.org/kr/)를 고려해야 합니다.
