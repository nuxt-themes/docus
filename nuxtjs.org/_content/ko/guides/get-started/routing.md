---
title: 라우팅
description: 대부분 웹사이트들은 하나 이상의 페이지를 가집니다. (예. 홈페이지, 정보 페이지, 연락처 페이지 등). 이 페이지들을 보여주기 위해서는 라우터가 필요합니다.
position: 2
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/02_routing?fontsize=14&hidenavigation=1&theme=dark
---

## 자동 라우트

대부분 웹사이트들은 하나 이상의 페이지를 가집니다. (예: 홈페이지, 정보 페이지, 연락처 페이지 등). 이 페이지들을 보여주기 위해서는 라우터가 필요합니다. 이때 `vue-router`가 필요합니다. Vue 애플리케이션을 작업할 때 구성 파일을 설정하고(i.e. `router.js`), 모든 라우트를 수동으로 설정 파일에 추가해야 합니다. Nuxt.js는 `pages` 디렉터리 안에 제공된 Vue 파일을 기반으로 자동으로 `vue-router` 구성을 생성합니다. 즉, 라우터 구성 파일을 다시 작성할 필요가 없어집니다! Nuxt.js는 모든 라우트에 대해 자동 코드 스플리팅도 제공합니다.

즉, 애플리케이션에 라우팅을 가지기 위해 해야할 일이 `pages` 폴더에 `.vue` 파일을 생성하는 것으로 끝입니다.

<base-alert type="next">

[Routing](/docs/2.x/features/file-system-routing)에 대해 더 알아보기

</base-alert>

## 이동

앱 페이지 사이를 이동하려면 [NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component) 컴포넌트를 사용해야 합니다. 이 컴포넌트는 Nuxt.js에 포함되어 있으므로 다른 컴포넌트처럼 임포트할 필요가 없습니다. HTML `<a>` 태그와 비슷하지만 `href="/about"`을 대신 `to="/about"`을 사용합니다. 이전에 `vue-router`를 사용해 본 적이 있다면 `<NuxtLink>`를 `<RouterLink>`를 대신한다고 생각할 수 있습니다.

`pages` 폴더의 `index.vue` 페이지로 가는 간단한 링크:

```html{}[pages/index.vue]
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```

사이트에 있는 페이지로 가는 모든 링크에 대해 `<NuxtLint>`를 사용하세요. 만일 다른 웹사이트로 이동하는 링크가 필요하다면 `<a>` 태그를 사용해야 합니다. 아래의 예제를 살펴보세요:

```html{}[pages/index.vue]
<template>
  <main>
    <h1>Home page</h1>
    <NuxtLink to="/about"> About (Nuxt 앱에 속하는 내부 링크) </NuxtLink>
    <a href="https://nuxtjs.org">다른 페이지로 이동하는 외부 링크</a>
  </main>
</template>
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<base-alert type="next">

[NuxtLink component](/docs/2.x/features/nuxt-components#the-nuxtlink-component)에 대해 더 알아보기

</base-alert>
