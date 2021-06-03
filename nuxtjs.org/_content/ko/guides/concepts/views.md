---
title: 뷰
description: 뷰 섹션은 Nuxt.js 애플리케이션에 있는 특정한 라우트에 대한 데이터와 뷰를 구성하기 위해 알아야 하는 모든 것을 설명합니다. 뷰는 앱 텝플릿, 레이아웃, 실제 페이지로 구성됩니다.
position: 1
category: concepts
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/01_views?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Nuxt 뷰의 구성 순서가 무엇인가요? (top-down)
    answers:
      - Layout → Page → Document
      - Page → Layout → Document
      - Document → Layout → Page
    correctAnswer: Document → Layout → Page
  - question: 기본 레이아웃의 이름이 무엇인가요?
    answers:
      - default.vue
      - layout.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: 커스텀 레이아웃을 생성하는 방법은 무엇인가요?
    answers:
      - pages 폴더에 .vue 파일을 추가한다
      - layouts 폴더에 .vue 파일을 추가한다
      - components 폴더에 .vue 파일을 추가한다
    correctAnswer: layouts 폴더에 .vue 파일을 추가한다
  - question: 페이지에 'blog' 이름의 커스텀 레이아웃을 어떻게 활성화하나요?
    answers:
      - "layout: 'blog'"
      - "layout: 'default'"
      - "blog: 'blog'"
    correctAnswer: "layout: 'blog'"
  - question: 커스텀한 에러 페이지를 생성하는 error.vue 파일을 추가하는 곳은 어디인가요?
    answers:
      - pages 폴더 안
      - errors 폴더 안
      - layouts 폴더 안
    correctAnswer: layouts 폴더 안
---

뷰 섹션은 Nuxt.js 애플리케이션에 있는 특정한 라우트에 대한 데이터와 뷰를 구성하기 위해 알아야 하는 모든 것을 설명합니다. 뷰는 앱 텝플릿, 레이아웃, 실제 페이지로 구성됩니다. 또한 SEO (Search Engine Optimization)에 중요한 각 페이지의 해드 섹션에 커스텀 메타 태그를 정의할 수 있습니다.

![Nuxt.js에서의 뷰 구성](/docs/2.x/views.png)

Nuxt.js에서의 뷰 구성

## 페이지

모든 페이지 컴포넌트는 Vue 컴포넌트이지만 Nuxt.js는 가능한 쉽게 애플리케이션 개발할 수 있도록 특별한 속성과 함수를 추가합니다.

```html{}[pages/index.vue]
<template>
  <h1 class="red">Hello World</h1>
</template>

<script>
  export default {
    head() {
      // 페이지의 메타 태그를 설정하세요
    }
    // ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## 페이지 컴포넌트 속성

위 예시에 있는 head 속성과 같이 페이지 컴포넌트에는 많은 속성이 있습니다.

<base-alert type="next">

페이지에서 사용할 수 있는 모든 속성에 대해 더 알아보고 싶다면 [Directory Structure book](/docs/2.x/directory-structure/nuxt)을 살펴보세요

</base-alert>

## 레이아웃

Nuxt.js 앱이 어떻게 보이는지 변경하고 싶을 때 유용합니다. 예를 들어 사이드바를 포함하고 싶거나 모바일과 데스크탑의 레이아웃을 구분하고 싶을 때와 같은 경우가 있습니다.

### 기본 레이아웃

레이아웃 디렉터리 안에 `default.vue` 파일을 추가하여 기본 레이아웃을 정의할 수 있습니다. 레이아웃이 지정되지 않은 모든 페이지에 적용됩니다. 레이아웃에 포함되어야 하는 것은 페이지 컴포넌트를 렌더링하는 `<Nuxt />` 컴포넌트입니다.

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

<base-alert type="next">

컴포넌트 챕터에 있는 [Nuxt component](/docs/2.x/features/nuxt-components) 에 대해 더 알아보기

</base-alert>

### 커스텀 레이아웃

레이아웃 디렉터리에 `.vue` 파일을 추가하여 커스텀 레이아웃을 생성할 수 있습니다. 커스텀 레이아웃을 사용하기 위해서는 커스텀 레이아웃을 사용하고 싶은 페이지 컴포넌트의 `layout` 속성을 설정해야 합니다. 생성한 커스텀 레이아웃의 이름을 `layout` 속성 값으로 지정해야 합니다.

블로그 레이아웃을 생성하기 위해 `blog.vue` 파일을 레이아웃 디렉터리 `layouts/blog.vue`에 추가하세요:

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>My blog navigation bar here</div>
    <Nuxt />
  </div>
</template>
```

<base-alert>

실제 페이지 컴포넌트를 포함하기 위해 레이아웃을 만들 때 `<Nuxt />` 컴포넌트를 추가해야 합니다.

</base-alert>

그런 다음 해당 레이아웃을 사용할 페이지의 layout 속성에 'blog' 값을 넣어줍니다.

```html{}[pages/posts.vue]
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

<base-alert type="info">

페이지에 레이아웃 속성을 넣지 않으면(eg `layout: 'blog'`) `default.vue` 레이아웃이 사용됩니다.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

### 에러 페이지

에러 페이지는 에러가 발생할 때 항상 노출되는 *페이지 컴포넌트*입니다 (서버 사이드 렌더링 중에는 발생하지 않습니다).

<base-alert>

에러 페이지는 `layouts` 폴더에 있지만 페이지로 취급해야 합니다.

</base-alert>

위에서 언급한 것처럼 이 레이아웃은 특별합니다. 템플릿 안에 `<Nuxt/>` 컴포넌트를 포함하지 않아야하기 때문입니다. 이 레이아웃은 에러가 발생할 때 (`404`, `500` 등) 보여지는 컴포넌트로 노출되어야 합니다. 다른 페이지 컴포넌트와 마찬가지로 일반적인 방법으로 에러 페이지에 대한 커스텀 레이아웃을 설정할 수 있습니다.

`layouts/error.vue` 파일을 추가하여 에러 페이지를 커스터마이즈할 수 있습니다:

```html{}[layouts/error.vue]
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // 에러 페이지에 대한 커스텀 레이아웃을 설정할 수 있다
  }
</script>
```

## 도큐먼트: App.html

앱 템플릿은 Nuxt.js 애플리케이션에 대한 도큐먼트의 실제 HTML 프레임을 구현하기 위해 사용됩니다. 이 프레임은 head와 body에 대한 변수를 삽입합니다. 이 파일은 자동으로 생성되며 일반적으로 수정할 일이 거의 없습니다. 기본적으로 루트 디렉터리인 프로젝트 소스 디렉토리 안에 `app.html`를 생성하여 스크립트나 조건부 CSS 클래스를 포함하도록 Nuxt.js에서 사용하는 HTML 앱 템플릿을 커스터마이즈할 수 있습니다.

Nuxt.js에서 사용되는 기본 템플릿:

```html{}[app.html]
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

커스텀 앱 템플릿을 사용하는 한 가지 사계는 IE를 위해 조건부 CSS 클래스를 추가하는 것입니다:

```html{}[app.html]
<!DOCTYPE html>
<!--[if IE 9]><html class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

<base-alert type="info">

`app.html`에 자바스크립트나 CSS 파일을 추가하는 대신 `nuxt.config.js`를 사용하는 것을 추천합니다!

</base-alert>

<quiz :questions="questions"></quiz>
