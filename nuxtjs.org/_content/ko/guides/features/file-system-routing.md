---
title: 파일 시스템 라우팅
description: Nuxt.js는 페이지 디렉토리에 있는 Vue 파일의 파일 트리를 기반으로 vue-router 설정을 자동으로 생성합니다. 페이지 디렉토리에 .vue 파일을 만들면 추가 설정 없이 기본 라우팅이 작동합니다.
position: 3
category: features
questions:
  - question: 페이지 사이를 이동하는 데 사용하는 컴포넌트 요소 이름은 무엇입니까?
    answers:
      - '<a>'
      - '<NuxtLink>'
      - '<Nuxt>'
    correctAnswer: '<NuxtLink>'
  - question: 자동 라우터 설정을 생성하려면 어떻게 해야 합니까?
    answers:
      - 페이지 디렉토리에 .vue 파일 추가
      - router.config 파일 생성
      - 페이지에 <NuxtLink> 추가
    correctAnswer: 페이지 디렉토리에 .vue 파일 추가
  - question: 다음 중 동적 라우트 생성하지 않는 것은 무엇입니까?
    answers:
      - dynamic.vue
      - _slug.vue
      - _slug/index.vue
    correctAnswer: dynamic.vue
  - question: nuxt generate 명령에서 동적 라우트를 무시합니까?
    answers:
      - True
      - False
    correctAnswer: False
  - question: users/_id.vue와 같은 동적 페이지에 대한 경로 매개 변수에 어떻게 접근합니까?
    answers:
      - $route.params.id
      - $route.id
      - $route.params.users.id
    correctAnswer: $route.params.id
  - question: 중첩 된 경로의 상위 컴포넌트 요소를 어떻게 정의합니까?
    answers:
      - 하위 뷰를 포함하는 디렉토리 내에 parent라는 Vue 파일을 만듭니다.
      - 하위 뷰를 포함하는 디렉토리와 다른 이름으로 Vue 파일을 만듭니다.
      - 하위 뷰를 포함하는 디렉토리와 동일한 이름으로 Vue 파일을 만듭니다.
    correctAnswer: 하위 뷰를 포함하는 디렉토리와 동일한 이름으로 Vue 파일을 만듭니다.
  - question: URL 구조의 깊이를 모르는 경우 어떤 파일을 사용하여 중첩된 경로를 동적으로 일치시킬 수 있습니까?
    answers:
      - _.vue
      - _index.vue
      - _id.vue
    correctAnswer: _.vue
  - question: 정의된 된 뷰를 렌더링하는 데 사용할 수 있는 컴포넌트 요소는 무엇입니까?
    answers:
      - '<Nuxt> 와 <Child>'
      - '<Nuxt> 와 <NuxtChild>'
      - '<NuxtChild> 와 <NuxtLink>'
    correctAnswer: '<Nuxt> 와 <NuxtChild>'
  - question: Nuxt.js에서 모든 경로에 대해 스크롤 위치를 맨 위로 강제로 만들기 위해 어떤 파일을 만들 수 있습니까?
    answers:
      - app/router.scrollBehavior.js
      - app/scrollBehavior.js
      - app/router.js
    correctAnswer: app/router.scrollBehavior.js
  - question: Nuxt.js에서 모든 라우트에 후행 슬래시를 추가 할 수 있습니까?
    answers:
      - true
      - false
    correctAnswer: true
---

Nuxt.js는 페이지 디렉터리에 있는 Vue 파일의 파일 트리를 기반으로 vue-router 설정을 자동으로 생성합니다. 페이지 디렉토리에 .vue 파일을 만들면 추가 설정 없이 기본 라우팅이 작동합니다.

경우에 따라 동적 라우트 또는 중첩된 라우트를 만들어야 하거나 라우터 속성을 추가로 구성해야 할 수 있습니다. 이 장에서는 라우터를 최대한 활용하기 위해 알아야 할 모든 것을 다룹니다.

<base-alert type="info">

Nuxt.js는 라우트를 위한 자동 코드 분할을 제공하며 설정이 필요하지 않습니다.

</base-alert>

<base-alert type="info">

페이지간 이동하기 위해서 [NuxtLink component](/docs/2.x/features/nuxt-components#the-nuxtlink-component)를 사용하세요

</base-alert>

```html
<template>
  <nuxt-link to="/">Home page</nuxt-link>
</template>
```

## 기본 라우트

이 파일 트리는:

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

자동으로 생성될 것 입니다:

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

때로는 사용자 목록이나 블로그 게시물을 가져오기 위해 API를 호출할 때와 같이 라우트 경로를 알지 못할 수 있습니다. 이를 동적 라우트라고합니다. 동적 라우트를 생성하려면 .vue 파일의 이름 앞이나 디렉토리 이름 앞에 밑줄을 추가해야 합니다. 파일이나 디렉토리명은 원하는 대로 지정할 수 있지만, 밑줄 접두사를 붙여야 합니다.

이 파일 트리는:

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

자동으로 생성될 것 입니다:

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

<base-alert type="info">

보시다시피 `users-id` 라는 경로에 `:id` 가 있습니까? 선택 사항이므로 만약 필수로 설정하려면 `users/_id` 디렉토리에 `index.vue` 파일을 만드세요.

</base-alert>

<base-alert type="info">

Nuxt >= v2.13 부터는 링크 태그를 크롤링하고 해당 링크를 기반으로 라우트 경로를 생성하는 크롤러가 설치되어 있습니다. 그러나 비밀 페이지와 같이 연결되지 않은 페이지가 있는 경우, 동적 라우트를 수동으로 생성해야 합니다.

</base-alert>

<base-alert type="next">

정적 사이트를 위해서는 [정적 사이트 생성](/docs/2.x/concepts/static-site-generation) 을 확인하세요

</base-alert>

### 로컬에서 라우트 매개 변수에 접근

로컬 페이지 또는 컴포넌트 내에서 `this.$route.params.{parameterName}` 을 조회하여 현재 라우트 매개 변수에 접근할 수 있습니다. 예를 들어 동적 사용자 페이지 (`users/_id.vue`)가 있고 `id` 매개 변수에 접근하여 사용자 또는 프로세스 정보를 로드하려는 경우 다음과 같이 변수에 접근할 수 있습니다: `this.$route.params.id`

## 중첩 라우트

Nuxt.js를 사용하면 vue-router의 하위 라우트를 사용하여 중첩된 라우트를 만들 수 있습니다. 중첩된 라우트의 상위 컴포넌트를 정의하려면 하위 view가 포함된 디렉토리와 같은 이름으로 Vue 파일을 만들어야 합니다.

<base-alert>

상위 컴포넌트 (`.vue` file) 내에 [NuxtChild component](/docs/2.x/features/nuxt-components#the-nuxtchild-component) 포함하는 것을 잊지마세요.

</base-alert>

이 파일 트리는:

```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

자동으로 생성 될 것 입니다:

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

이 시나리오는 자주 발생해선 안 되지만, Nuxt.js를 사용하면 동적 부모 내부에 동적 자식이 있을 수 있습니다.

이 파일 트리는:

```
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

자동으로 생성 될 것입니다:

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

## 알 수 없는 동적 중첩 라우트

URL 구조의 깊이를 모르는 경우 `_.vue` 를 사용하여 중첩 된 경로를 동적으로 일치시킬 수 있습니다. `더 구체적인` 요청과 일치하지 않는 요청을 처리합니다.

이 파일 트리는:

```
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

이와 같은 요청을 처리할 것 입니다:

```
/ -> index.vue
/people -> people/index.vue
/people/123 -> people/_id.vue
/about -> _.vue
/about/careers -> _.vue
/about/careers/chicago -> _.vue
```

<base-alert type="info">

이제 404 페이지를 처리하는 것은 `_.vue` 페이지의 로직에 달려 있습니다.

</base-alert>

## 라우터 확장

Nuxt로 라우팅을 확장하는 방법에는 여러 가지가 있습니다:

- 페이지에서 라우트 매개 변수를 맞춤 설정하기 위한 [router-extras-module](https://github.com/nuxt-community/router-extras-module)
- [@nuxtjs/router](https://github.com/nuxt-community/router-module) 를 사용하여 Nuxt 라우터를 덮어 쓰고 자신의 router.js 파일을 작성합니다.
- `nuxt.config.js` 에서 [router.extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes) 프로퍼티를 사용합니다.

## router 프로퍼티

router 프로퍼티를 사용하면 Nuxt.js 라우터 (vue-router)를 커스텀 할 수 있습니다.

```js{}[nuxt.config.js]
export default {
  router: {
    // customize the Nuxt.js router
  }
}
```

### Base

앱의 기본 URL입니다. 예를 들어 SPA 전체에서 `/app/` 부터 제공해야 하는 경우 base는 `/app/` 값을 사용해야 합니다.

<base-alert type="next">

[Router Base Property에 대해 더 알아보기](/docs/2.x/configuration-glossary/configuration-router#base)

</base-alert>

### extendRoutes

Nuxt.js에서 만든 경로를 확장 할 수 있습니다. `extendRoutes` 옵션을 통해 가능합니다.

커스텀 라우트 추가 예시:

```js{}[nuxt.config.js]
export default {
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

라우트를 정렬하기 위해서는 `@nuxt/utils` 에서 `sortRoutes(routes)` 함수를 사용할 수 있습니다.

```js{}[nuxt.config.js]
import { sortRoutes } from '@nuxt/utils'
export default {
  router: {
    extendRoutes(routes, resolve) {
      // Add some routes here ...

      // and then sort them
      sortRoutes(routes)
    }
  }
}
```

<base-alert>

라우트 스키마는 [vue-router](https://router.vuejs.org/en/) 스키마를 준수해야 합니다.

</base-alert>

<base-alert>

[Named Views](/docs/2.x/features/file-system-routing#named-views) 를 사용하는 라우트를 추가 할 때, 지정 된 `components` 에 `chunkNames`를 추가하는 것을 잊지마세요.

</base-alert>

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/users/:id',
        components: {
          default: resolve(__dirname, 'pages/users'), // or routes[index].component
          modal: resolve(__dirname, 'components/modal.vue')
        },
        chunkNames: {
          modal: 'components/modal'
        }
      })
    }
  }
}
```

<base-alert type="next">

[extendRoutes Property에 대해 더 알아보기](/docs/2.x/configuration-glossary/configuration-router#extendroutes)

</base-alert>

### fallback

브라우저가 history.pushState를 지원하지 않았을 때 mode가 history로 설정된 경우 라우터가 해시 모드로 fallback 해야 하는지 여부를 제어합니다.

<base-alert type="next">

[fallback Property에 대해 더 알아보기](/docs/2.x/configuration-glossary/configuration-router#fallback)

</base-alert>

### mode

라우터 모드를 설정합니다. 서버 사이드 렌더링으로 인해 변경하지 않는 것이 좋습니다.

<base-alert type="next">

[mode Property에 대해 더 알아보기](/docs/2.x/configuration-glossary/configuration-router#mode)

</base-alert>

### parseQuery / stringifyQuery

커스텀 parseQuery / stringifyQuery 기능을 제공합니다.

<base-alert type="next">

[parseQuery / stringifyQuery Property에 대해 더 알아보기](/docs/2.x/configuration-glossary/configuration-router#parsequery--stringifyquery)

</base-alert>

### routeNameSplitter

Nuxt.js가 사용하는 루트명의 구분자를 변경할 수 있습니다. 설정 파일에서 `routeNameSplitter` 옵션을 사용하여 수행할 수 있습니다. 페이지 파일에 `pages/posts/_id.vue` 가 있다고 가정합시다. Nuxt.js는 이 경우 루트명을 프로그래밍 방식으로 `posts-id` 를 생성합니다. 따라서 `routeNameSplitter` 설정을 `/` 로 변경하면 이름은 `posts/id` 로 변경됩니다.

```js{}[nuxt.config.js]
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

### scrollBehavior

`scrollBehavior` 옵션을 사용하면 라우트 간의 스크롤 위치에 대한 동작을 정의 할 수 있습니다. 이 메서드는 페이지가 렌더링 될 때마다 호출됩니다.

<base-alert type="next">

자세히 알고싶으면 [vue-router scrollBehavior documentation](https://router.vuejs.org/guide/advanced/scroll-behavior.html) 을 확인하세요.

</base-alert>

v2.9.0 이후 사용 가능:

Nuxt.js에서는 파일을 사용하여 라우터 scrollBehavior를 덮어쓸 수 있습니다. 이 파일은 app이라는 폴더에 있어야 합니다.

`~/app/router.scrollBehavior.js`.

모든 경로에 대해 스크롤 위치를 맨 위로 강제하는 예시:

```js{}[app/router.scrollBehavior.js]
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

<base-alert type="next">

[Nuxt.js 기본`router.scrollBehavior.js` 파일.](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js)

</base-alert>

<base-alert type="next">

[scrollBehavior Property에 대해 더 알아보기](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior)

</base-alert>

### trailingSlash

v2.10 이후 사용 가능:

이 옵션을 true로 설정하면 모든 경로에 후행 슬래시가 추가됩니다. false로 설정하면 제거됩니다.

```js{}[nuxt.config.js]
export default {
  router: {
    trailingSlash: true
  }
}
```

<base-alert>

이 옵션은 사전 준비 없이 설정해서는 안 되며 철저히 테스트해야 합니다. `router.trailingSlash`를 `undefined` (기본값) 이외의 다른 것으로 설정하면 마주하는 라우트가 작동하지 않을 것입니다. 따라서 301 리다이렉션이 있어야 하며 내부 연결이 올바르게 조정되어야 합니다. `trailingSlash` 를 `true` 로 설정하면 `example.com/abc/` 만 작동할 것이며 `example.com/abc` 는 작동하지 않습니다. 거짓이면 그 반대입니다.

</base-alert>

<base-alert type="next">

[trailingSlash Property에 대해 더 알아보기](/docs/2.x/configuration-glossary/configuration-router#trailingslash)

</base-alert>

<quiz :questions="questions"></quiz>
