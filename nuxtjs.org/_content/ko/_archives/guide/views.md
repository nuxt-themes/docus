---
title: Views
description: Views 섹션에서는 Nuxt.js 어플리케이션의 특정 라우트를 위해 데이터와 뷰를 설정하는 모든 것을 설명합니다. (도큐먼트, 레이아웃, 페이지 와 HTML Head)
category: getting-started
position: 105
---

> Views 섹션에서는 Nuxt.js 어플리케이션의 특정 라우트를 위해 데이터와 뷰를 설정하는 모든 것을 설명합니다. (Document, Layouts, Pages 와 HTML Head)

![nuxt-views-schema](/nuxt-views-schema.svg)

## 앱 탬플릿

> Nuxt.js에서 사용하는 HTML 앱 템플릿을 스크립트나 조건적인 CSS 클래스를 포함하도록 사용자 정의할 수 있습니다.

템플릿을 변경하려면 프로젝트의 src 폴더에 `app.html`파일을 생성하세요(기본적으로프로젝트의 루트 디렉토리입니다).

Nuxt.js에서 사용하는 기본 템플릿입니다:

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

한 예로, IE 지원을 위한 CSS 클래스를 아래와 같이 추가할 수 있습니다:

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## 레이아웃

사이드바를 포함할지 또는 모바일 및 데스크톱을 위한 개별 레이아웃을 포함할지 여부와 같은 Nuxt.js 앱의 모양과 느낌을 바꾸고 싶을 때 레이아웃은 큰 도움이 됩니다.

### 기본 레이아웃

메인 레이아웃을 확장하려면 `layouts/default.vue` 파일을 추가합니다. 이 파일은 지정된 레이아웃이 없는 모든 페이지에 사용됩니다.

<div class="Alert Alert--nuxt-green">

<b>Info:</b> 레이아웃을 생성할 때 페이지 컴포넌트를 실제로 포함하도록 `<nuxt/>` 컴포넌트를 추가하세요.

</div>

기본 레이아웃은 세 줄에 불과하며 간단히 페이지 컴포넌트를 렌더링할 수 있습니다:

```html
<template>
  <nuxt />
</template>
```

### 커스텀 레이아웃

`layouts` 폴더에 있는 모든 파일(_최상위 레벨_)은 각 페이지 컴포넌트에 `layout` 속성으로 접근할 수 있는 사용자 정의 레이아웃을 생성합니다.

예를 들어 우리가 블로그 레이아웃을 만들 것이고, `layouts/blog.vue`에 이를 저장한다고 해 봅시다:

```html
<template>
  <div>
    <div>My blog navigation bar here</div>
    <nuxt />
  </div>
</template>
```

그러면 우리는 페이지(예를 들어, `pages/posts.vue`)에 우리의 커스텀 레이아웃에 대해 알려줍니다:

```html
<template>
  <!-- Your template -->
</template>
<script>
  export default {
    layout: 'blog'
    // page component definitions
  }
</script>
```

`layout` 프로퍼티에 대한 더 많은 정보: [API Pages `layout`](/api/pages-layout)

커스텀 레이아웃이 실제로 동작하는 것을 확인하시려면 [데모 비디오](https://www.youtube.com/watch?v=YOKnSTp7d38)를 확인해 주세요.

### 에러 페이지

에러 페이지는 오류가 발생할 때(서버측 렌더링 중에 발생하지 않음) 항상 노출되는 *페이지 컴포넌트*입니다.

<div class="Alert Alert--orange">

<b>Warning:</b> <code>layouts</code> 폴더에 이 파일이 위치하더라도, <b>page</b>처럼 다뤄져야 합니다.

</div>

위에서 언급한 바와 같이, 이 레이아웃은 특수합니다. 템플릿 안에 `<nuxt/>`를 포함하면 **안됩니다**. 이 레이아웃은 오류가 발생할 때 표시되는 컴포넌트로 여겨져야합니다(`404`, `500` 등). 다른 페이지 컴포넌트와 마찬가지로 오류 페이지에 대한 사용자 정의 레이아웃도 일반적인 방법으로 설정할 수 있습니다.

기본 에러 페이지 소스 코드는 [깃허브](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue)에서 확인할 수 있습니다.

`layouts/error.vue`을 추가하는 것으로 사용자 정의 에러 페이지를 만드실 수 있습니다:

```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blog' // you can set a custom layout for the error page
  }
</script>
```

## 페이지

모든 Page 컴포넌트는 Vue 컴포넌트입니다. 하지만 Nuxt.js는 범용 어플리케이션을 쉽게 개발할 수 있도록 특별한 애트리뷰트와 함수를 제공합니다.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/nuxtjs-page-components?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
       Vue School에서 <strong>Nuxt.js Page Components</strong>에 대한 무료 강의를 시청하세요.
    </p>
  </a>
</div>

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
  export default {
    asyncData (context) {
      // called every time before loading the component
      // as the name said, it can be async
      // Also, the returned object will be merged with your data object
      return { name: 'World' }
    },
    fetch () {
      // The `fetch` method is used to fill the store before rendering the page
    },
    head () {
      // Set Meta Tags for this Page
    },
    // and more functionality to discover
    ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

| 속성          | 설명                                                                                                                                                                                                                                                                                                                                               | 문서                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `asyncData`   | 가장 중요한 키이고 비동기적이며, 컨텍스트를 인자로 전달 받을 수 있습니다.                                                                                                                                                                                                                                                                          | [가이드: Async data](/guide/async-data)                   |
| `fetch`       | 페이지가 렌더링되기 전에 스토어를 채우기 위해 사용되며, 컴포넌트 데이터를 설정하지 않는다는 점을 제외하면 `asyncData`와 같습니다.                                                                                                                                                                                                                  | [API Pages `fetch`](/api/pages-fetch)                     |
| `head`        | 현재 페이지에 대한 특정 `<meta>` 태그를 설정합니다.                                                                                                                                                                                                                                                                                                | [API Pages `head`](/api/pages-head)                       |
| `layout`      | `layouts` 폴더에 정의된 레이아웃을 지정할 수 있습니다.                                                                                                                                                                                                                                                                                             | [API Pages `layout`](/api/pages-layout)                   |
| `loading`     | `false`로 세팅하면 자동적으로 페이지에 들어가면 `this.$nuxt.$loading.finish()`를 호출하고, 페이지에서 나오면 `this.$nuxt.$loading.start()`를 페이지가 호출하는 것을 막을 수 있습니다. 이는 [예시](/examples/custom-page-loading)에서처럼 **수동으로** 로딩 액션을 컨트롤 하게 해줍니다. `loading`이 `nuxt.config.js`에 설정된 경우에만 적용됩니다. | [API Configuration `loading`](/api/configuration-loading) |
| `transition`  | 페이지에 대한 특정 트랜지션을 설정합니다.                                                                                                                                                                                                                                                                                                          | [API Pages `transition`](/api/pages-transition)           |
| `scrollToTop` | 기본값은 `false` 입니다. 페이지를 렌더링하기 전에 페이지를 맨 위로 스크롤할 것인지를 나타내며, 중첩 라우트를 위해 사용됩니다.                                                                                                                                                                                                                      | [API Pages `scrollToTop`](/guide/routing#nested-routes)   |
| `validate`    | 동적 라우트에 대한 유효성을 검사합니다.                                                                                                                                                                                                                                                                                                            | [API Pages `validate`](/guide/routing#dynamic-routes)     |
| `middleware`  | 페이지에 대한 미들웨어를 설정하면, 미들웨어는 페이지를 렌더링하기 전에 호출됩니다.                                                                                                                                                                                                                                                                 | [Guide: middleware](/guide/routing#middleware)            |

페이지 속성의 사용법에 대한 더 많은 정보: [API](/api)

## HTML Head

Nuxt.js는 `document head`와 `meta attributes` 를 갱신하기 위해서 [vue-meta](https://github.com/nuxt/vue-meta)를 사용합니다.

Nuxt.js가 `vue-meta`를 사용한 소스 코드는 [깃허브](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/index.js#L42-L48)에서 확인 가능합니다.

<div class="Alert Alert--teal">

<b>Info:</b> Nuxt.js는 메타 요소를 식별하기 위해서 <code>hid</code>를 디폴트인 <code>vmid</code> 대신 사용합니다.

</div>

### 기본 메타 태그

Nuxt.js를 사용하면 `nuxt.config.js` 내에서 애플리케이션의 모든 기본 `<meta>` 태그를 정의할 수 있습니다. 동일한 `head` 속성을 사용하여 정의합니다:

사용자 정의 구글 폰트로 사용자 정의 뷰포트를 설정하는 예시입니다:

```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

`head`에 전달 가능한 옵션 목록을 알기 위해서는 [vue-meta 문서](https://vue-meta.nuxtjs.org/api/#metainfo-properties)를 확인합니다.

head 메소드에 대한 더 많은 정보: [API Configuration `head`](/api/configuration-head)

### 한 페이지를 위한 사용자 정의 메타 태그

head 메소드에 대한 더 많은 정보: [API Pages `head`](/api/pages-head)
