---
title: 메타 태그와 SEO
description: Nuxt.js를 사용하면 head 속성을 사용하여 nuxt.config.js 파일 내에서 애플리케이션에 대한 모든 기본 `<meta>` 태그를 정의 할 수 있습니다. 이는 SEO 목적으로 기본 제목 및 설명 태그를 추가하거나 뷰포트를 설정하거나 파비콘을 추가하는 데 매우 유용합니다.
position: 6
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/06_meta_tags_seo?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: 전역적으로 title과 meta description을 어디에 설정해야 하나요?
    answers:
      - 페이지 컴포넌트 내에서
      - nuxt.config.js 내에서
      - package.json 내에서
    correctAnswer: nuxt.config.js 내에서
  - question: title과 meta description을 로컬에서 어디에 설정합니까?
    answers:
      - 페이지 컴포넌트 내에서
      - nuxt.config.js 내에서
      - package.json 내에서
    correctAnswer: 페이지 컴포넌트 내에서
  - question: 페이지 내에서 제목 또는 메타 설명의 데이터에 접근하려면
    answers:
      - meta 함수
      - head 함수
      - seo 함수
    correctAnswer: head 함수
  - question: nuxt.config.js에서만 외부 리소스를 로드할 수 있습니다.
    answers:
      - true
      - false
    correctAnswer: false
  - question: 닫는 body 태그 앞에 스크립트를 포함하려면
    answers:
      - 'body: true'
      - 'body: false'
      - 'scripts: true'
    correctAnswer: 'body: true'
---

Nuxt.js는 애플리케이션에 메타 데이터를 추가하는 3가지 방법을 제공합니다:

1. nuxt.config.js에서 전역적으로 사용
2. 로컬에서 head를 오브젝트로 사용
3. data 및 computed 프로퍼티에 접근할 수 있도록 head 함수를 로컬로 사용

### 전역 설정

Nuxt.js를 사용하면 head 속성을 사용하여 nuxt.config.js 파일 내에서 애플리케이션에 대한 모든 기본 `<meta>` 태그를 정의 할 수 있습니다. 이는 SEO 목적으로 기본 제목 및 설명 태그를 추가하거나 뷰포트를 설정하거나 파비콘을 추가하는 데 매우 유용합니다.

```js{}[nuxt.config.js]
export default {
  head: {
    title: 'my website title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
}
```

<base-alert type="info">

모든 페이지에 동일한 제목과 설명이 표시됩니다.

</base-alert>

### 로컬 설정

또한 모든 페이지의 스크립트 태그 내에서 `head` 메소드를 사용하여 각 페이지의 제목과 메타를 추가할 수 있습니다

```js{}[pages/index.vue]
<script>
export default {
  head: {
    title: 'Home page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ],
  }
}
</script>
```

<base-alert type="info">

'head' 를 오브젝트로 사용하여 홈페이지의 제목과 설명만 설정합니다.

</base-alert>

```html{}[pages/index.vue]
<template>
  <h1>{{ title }}</h1>
</template>
<script>
  export default {
    data() {
      return {
        title: 'Home page'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Home page description'
          }
        ]
      }
    }
  }
</script>
```

<base-alert type="info">

`head` 함수를 사용하여 홈페이지의 제목과 설명만 설정합니다. 함수를 사용하면 data 및 computed 속성에 접근할 수 있습니다.

</base-alert>

Nuxt.js는 [vue-meta](https://vue-meta.nuxtjs.org/) 를 사용하여 애플리케이션의 문서 head 및 meta 속성을 업데이트합니다.

<base-alert>

하위 컴포넌트에서 사용될 때 중복을 방지하려면 `hid` 키가 있는 고유 식별자를 메타 설명에 제공하세요. 이렇게하면 vue-meta는 기본 태그를 덮어 써야한다는 것을 알게됩니다.

</base-alert>

<base-alert type="next">

[vue-meta documentation](https://vue-meta.nuxtjs.org/api/#metainfo-properties)에서 `head` 에 사용할 수 있는 옵션에 대해 자세히 알아보세요.

</base-alert>

## 외부 리소스

스크립트 및 글꼴과 같은 외부 리소스를 `nuxt.config.js`에 전역적으로 추가하거나 로컬에 `head` 오브젝트 또는 함수를 추가하여 포함할 수 있습니다.

<base-alert type="info">

또한 각 리소스에 선택사항인 `body: true` 를 전달하여 닫는 `</body>` 태그 앞에 리소스를 포함할 수 있습니다.

</base-alert>

### 글로벌 설정

```js{}[nuxt.config.js]
export default {
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  }
}
```

### 로컬 설정

```html{}[pages/index.vue]
<template>
  <h1>About page with jQuery and Roboto font</h1>
</template>

<script>
  export default {
    head() {
      return {
        script: [
          {
            src:
              'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
          }
        ],
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-family: Roboto, sans-serif;
  }
</style>
```

## 리소스 힌트

더 빠른 초기 페이지 로드시간을 위해 prefetch 및 preload 링크를 추가합니다.

페이지와 경로가 많은 경우에만 이 옵션을 비활성화 할 수 있습니다.

<base-alert type="next">

[Resource Hints](/docs/2.x/configuration-glossary/configuration-render#resourcehints)

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
