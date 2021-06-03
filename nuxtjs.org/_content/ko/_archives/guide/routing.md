---
title: 라우팅
description: Nuxt.js는 애플리케이션의 라우트를 만들기 위해 파일 시스템을 사용합니다.
category: getting-started
position: 104
---

> Nuxt.js는 `pages` 디렉토리 내의 Vue 파일 구조를 기반으로 [vue-router](https://github.com/vuejs/vue-router) 설정을 자동으로 생성합니다.

<div class="Alert Alert--grey">

페이지 사이에서 이동하려면, [`<nuxt-link>`](/api/components-nuxt-link) 컴포넌트를 사용하시는 것을 권장합니다.

</div>

예를 들어,

```html
<template>
  <nuxt-link to="/">Home page</nuxt-link>
</template>
```

## 기본 라우트

아래의 파일트리는:

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

아래와 같이 자동으로 생성됩니다:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## 동적 라우트

파라미터가 있는 동적 라우트를 정의하기 위해서는 **앞에 밑줄이 붙은** .vue 파일이나 폴더를 정의해야합니다.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/nuxtjs-dynamic-routes?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      <strong>동적 라우트</strong>에 대한 무료 강의를 Vue School에서 보세요.
    </p>
  </a>
</div>

아래의 폴더 구조는:

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

아래와 같이 자동으로 생성됩니다:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

위에서 볼 수 있듯이, `users-id` 라우트는 `:id?`라는 선택적 경로를 가집니다. 만약이를 필수 경로로 만드려면 `users/_id` 폴더 안에 `index.vue` 파일을 만듭니다.

<div class="Alert Alert--orange">

**Warning:** `generate` 커맨드에 의해 동적 라우트는 무시됩니다: [API Configuration generate](/api/configuration-generate#routes)

</div>

### 라우트 파라미터의 유효성 체크하기

Nuxt.js를 사용하면 동적 라우트 컴포넌트 내에 유효성을 검증하는 메소드를 정의할수있습니다.

예시: `pages/users/_id.vue`

```js
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

만약 validate 메소드가 `true` 혹은 `true`로 resolve될 `Promise`를 반환하지 않는다면, Nuxt.js는 자동으로 404나 500 error 페이지를 로딩할 것입니다.

메소드에 대한 더 많은 정보: [API Pages 유효성 체크](/api/pages-validate)

## 중첩 라우트

Nuxt.js를 사용하면 vue-router의 자식 라우트를 사용함으로써 중첩 라우트를 만들 수있습니다.

중첩 라우트의 부모 컴포넌트를 정의하기 위해서는 자식 뷰를 포함하고 있는 **폴더와같은 이름** 으로 Vue 파일을 생성해야 합니다.

<div class="Alert Alert--orange">

<b>Warning:</b> 부모 컴포넌트(<code>.vue</code> file)에 `<nuxt-child/>` 태그를사용해야 함을 잊지마세요!

</div>

아래의 폴더 구조는:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

아래와 같이 자동으로 생성됩니다:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## 동적 중첩 라우트

Nuxt.js에서 동적 중첩 라우트는 자주 사용되지는 않지만, 동적 라우트 하위에 동적라우트가 있는 경우에도 가능하기는 합니다.

아래의 폴더 구조는

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

아래와 같이 자동으로 생성됩니다:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

### 언노운(Unknown) 동적 중첩 라우트

만약 URL 구조에 대해서 아직은 알 수 없다면, 중첩 경로에 매치될 `_.vue` 파일을 사용할 수 있습니다. 이 파일은 *구체적인 요청*과 매치되지 않는 요청에 대해 응답할것입니다.

아래의 폴더 구조는

```bash
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

아래와 같은 요청을 다룰 것입니다:

| Path                     | File               |
| ------------------------ | ------------------ |
| `/`                      | `index.vue`        |
| `/people`                | `people/index.vue` |
| `/people/123`            | `people/_id.vue`   |
| `/about`                 | `_.vue`            |
| `/about/careers`         | `_.vue`            |
| `/about/careers/chicago` | `_.vue`            |

**Note:** 404 페이지는 이제 `_.vue` 페이지의 로직에 달렸습니다[404 리디렉션에 대한 정보를 여기서 찾아주세요](/guide/async-data#handling-errors).

## Named Views

Named view들을 렌더링하기 위해서 `<nuxt name="top"/>`나 `<nuxt-child name="top"/>` 컴포넌트를 layout/page에서 사용할 수 있습니다. 페이지의 named view를 구체적으로 표시하기 위해서는 `nuxt.config.js` 파일의 라우터 설정을 확장해야합니다:

```js
export default {
  router: {
    extendRoutes(routes, resolve) {
      const index = routes.findIndex(route => route.name === 'main')
      routes[index] = {
        ...routes[index],
        components: {
          default: routes[index].component,
          top: resolve(__dirname, 'components/mainTop.vue')
        },
        chunkNames: {
          top: 'components/mainTop'
        }
      }
    }
  }
}
```

이 코드는 `components`와 `chunkNames` 두 프로퍼티로 해당 경로를 확장하기를 요청하고 있습니다. 이 설정에서 named view는 `top`이라는 이름을 가지고 있습니다.

예시에 대한 더 많은 정보: [named-views 예시](/examples/named-views)

### SPA fallback

동적 경로에 대해서도 SPA 폴백을 활성화할 수 있습니다. Nuxt.js는 `mode: 'spa`'에서 사용될 `index.html`과 같은 파일을 추가로 내보낼 수 있습니다. 대부분의 정적 호스팅 서비스는 일치하는 파일이 없을 경우 SPA 템플릿을 사용하도록 구성할 수 있습니다. 그것은 `head` 정보나 HTML은 포함하지 않겠지만, API에서 데이터를 resolve하고로드할 것입니다.

`nuxt.config.js` 파일에서 이를 설정할 수 있습니다:

```js
export default {
  generate: {
    fallback: true, // '200.html' 대신에 '404.html'를 사용하고 싶다면
    fallback: 'my-fallback/file.html' // 호스팅 서비스가 커스텀 경로 필요로 한다면
  }
}
```

### 로컬 접근 라우트 파라미터

`this.$route.params.{parameterName}`를 로컬 페이지나 컴포넌트에서 참조하는 것으로, 현재 라우트에 접근 가능합니다. 예를 들어, 동적 사용자 페이지 (`users\_id.vue`)가 있고 사용자나 프로세스 정보를 로드하기 위해서 `id` 파라미터에 접근하고 싶다면 `this.$route.params.id`와 같은 변수로 접근 가능합니다.

#### Surge의 경우

Surge는 `200.html`와 `404.html` 모두 [처리 가능합니다](https://surge.sh/help/adding-a-custom-404-not-found-page). `generate.fallback`은 기본적으로 `200.html`로 세팅되어 있으므로, 변경할 필요가없습니다.

#### GitHub Pages나 Netlify 호스팅의 경우

GitHub Pages나 Netlify는 `404.html`를 자동으로 인식합니다. 그래서 `generate.fallback`에 `true`를 설정하는 것이 우리가 할 일의 전부입니다!

#### Firebase 호스팅의 경우

Firebase 호스팅은 자동적으로 `404.html`파일 [처리가 가능합니다](https://firebase.google.com/docs/hosting/full-config#404). 그래서 `generate.fallback`을 `true`로 설정하면 이 설정이 404 기본 응답 코드와 함께 에러 페이지를 렌더링할 것입니다.

## 트랜지션

Nuxt.js는 경로 전환 과정에서 [`<transition>`](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) 컴포넌트를 사용해 놀라운 트랜지션/애니메이션을 만들어냅니다.

### 전역 설정

<div class="Alert Alert--orange">

<b>Info:</b> Nuxt.js의 기본 트랜지션 이름은 `"page"` 입니다.

</div>

모든 페이지에 페이드 애니메이션을 추가하기 위해서는 모든 라우트에 사용될 CSS 파일을 작성해야 합니다. 따라서 `assets` 폴더에 CSS 파일을 만드는 것부터 시작하겠습니다.

전역 css 파일인 `assets/main.css` 입니다:

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
```

이를 `nuxt.config.js` 파일에 추가합니다:

```js
module.exports = {
  css: ['assets/main.css']
}
```

transition 키에 대한 더 많은 정보: [API transition 구성](/api/pages-transition)

### 페이지 설정

`transition` 속성으로 한 페이지에만 사용자 정의 트랜지션을 적용할 수도 있습니다.

전역 css 파일인 `assets/main.css`에 새로운 클래스를 추가합니다:

```css
.test-enter-active,
.test-leave-active {
  transition: opacity 0.5s;
}
.test-enter,
.test-leave-active {
  opacity: 0;
}
```

이제 우리는 이 페이지에서 test라는 이름의 트랜지션 속성을 사용할 수 있습니다:

```js
export default {
  transition: 'test'
}
```

transition 속성에 대한 더 많은 정보: [API Pages 트랜지션](/api/pages-transition)

## 미들웨어

> 미들웨어를 사용하면 페이지나 페이지 그룹을 렌더링하기 전에 실행할 사용자 지정함수를 정의할 수 있습니다.

**모든 미들웨어는 `middleware/` 디렉토리에 있어야합니다.** 파일 이름은 곧 미들웨어의 이름이 됩니다. (예를 들어 `middleware/auth.js`는 `auth` 미들웨어가 됩니다.) 직접적으로 함수를 사용하는 것으로 페이지에 특화된 미들웨어를 여러분은 정의할 수있습니다. [익명 미들웨어](/api/pages-middleware#anonymous-middleware)를 참조해주세요.

미들웨어는 [context](/api#context)를 첫 인자로 전달받습니다:

```js
export default function (context) {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

유니버셜 모드에서는, 미들웨어는 서버 측에서 한 번 호출됩니다(Nuxt 앱의 첫 리퀘스트 혹은 새로 고침 시) 그리고 클라이언트 측에서 이후의 라우팅을 담당합니다. SPA 모드에서는, 미들웨어는 처음 리퀘스트 시 클라이언트 측에서 호출되고 이후의 라우팅시에 호출됩니다.

미들웨어는 아래의 세 가지에서 순차적으로 실행됩니다:

1. `nuxt.config.js`
2. 매칭된 레이아웃
3. 매칭된 페이지

미들웨어는 비동기가 될 수 있고 간단하게 `Promise`를 반환하거나 두 번째 인자인 `callback`을 사용할 수 있습니다.

`middleware/stats.js`

```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

이제 `nuxt.config.js`나 레이아웃, 페이지에서 `middleware` 키를 사용할 수 있습니다:

`nuxt.config.js`

```js
module.exports = {
  router: {
    middleware: 'stats'
  }
}
```

`stats` 미들웨어는 경로가 변경될 때마다 실행될 것입니다.

미들웨어(여러 개도 가능)를 특정 레이아웃이나 페이지에 추가할 수도 있습니다:

`pages/index.vue`나 `layouts/default.vue`

```js
export default {
  middleware: ['auth', 'stats']
}
```

middleware를 활용한 실 사례가 궁금하다면 깃허브에서 [example-auth0](https://github.com/nuxt/example-auth0)를 확인하세요.
