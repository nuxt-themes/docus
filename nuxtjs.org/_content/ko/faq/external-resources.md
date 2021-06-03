---
title: 외부 리소스
description: Nuxt.js 에서 외부 리소스를 사용하려면?
category: configuration
position: 1
---

# 외부 리소스를 사용하려면?

## 글로벌 설정

<!-- Include your resources in the `nuxt.config.js` file: -->

`nuxt.config.js` 파일 안에 리소스를 include합니다:

```js
module.exports = {
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto'
      }
    ]
  }
}
```

## 로컬 설정

<!-- Include your resources in your .vue file inside the pages directory: -->

pages 디렉토리의 .vue 파일 안에서 리소스를 include합니다:

```html
<template>
  <h1>About page with jQuery and Roboto font</h1>
</template>

<script>
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
          href: 'https://fonts.googleapis.com/css?family=Roboto'
        }
      ]
    }
  }
</script>
```
