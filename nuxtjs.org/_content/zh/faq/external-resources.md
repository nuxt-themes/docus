---
title: 外部资源
description: 如何在 Nuxt.js 应用中使用外部资源？
category: configuration
position: 1
---

# 如何在 Nuxt.js 应用中使用外部资源？

## 全局配置

在 nuxt.config.js 中配置你想引用的资源文件：

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

## 局部配置

可在 `pages` 目录内的 `.vue` 文件中引用外部资源，如下所示：

```html
<template>
  <h1>使用 jQuery 和 Roboto 字体的关于页</h1>
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
