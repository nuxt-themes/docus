---
title: 'API: buildDir 属性'
description: 为Nuxt.js应用程序定义 dist 目录
menu: buildDir
category: configuration
position: 102
---

# buildDir 属性

- 类型: `String`
- 默认: `.nuxt`

> 为 Nuxt.js 应用程序定义.nuxt(默认)目录

例如 (`nuxt.config.js`):

```js
export default {
  buildDir: 'nuxt-dist'
}
```

默认情况下，默认`.nuxt`是一个隐藏目录，因为它的名字以`.`开头。您可以使用此选项来防止这种情况。
