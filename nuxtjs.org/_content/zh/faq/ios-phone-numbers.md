---
title: iOS 和 电话号码
description: iOS上的Safari将电话号码更改为可能导致渲染不匹配的链接
category: development
position: 105
---

# iOS 和 电话号码

如果您在 Nuxt 页面中包含电话号码，请确保将它们直接包装到链接中：

```html
<!-- Example phone number: +7 (982) 536-50-77 -->

<template>
  <a href="tel: +7 (982) 536-50-77">+7 (982) 536-50-77</a>
</template>
```

否则，某些移动 Safari 版本会自动将这些数字转换为链接。 听起来不错乍一看很有帮助，但这会触发`NodeMismatch`警告，因为 SSR 内容与网站不匹配内容了。 这可能会使您的应用在这些 Safari 版本上无法使用。
