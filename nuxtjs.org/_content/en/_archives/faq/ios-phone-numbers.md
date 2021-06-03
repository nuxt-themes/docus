---
title: iOS and phone numbers
description: Safari on iOS changes phone numbers to links which can cause a render mismatch
category: development
position: 105
---

Some mobile Safari versions will automatically transform phone numbers into links. This will trigger a `NodeMismatch` warning as the SSR content doesn't match the website content anymore. This can make your app unusable on these Safari versions.

If you include telephone numbers in your Nuxt page, you have two options.

## Use a meta tag to stop the transformation

```html
<meta name="format-detection" content="telephone=no" />
```

## Wrap your phone numbers in links

```html
<!-- Example phone number: +7 (982) 536-50-77 -->

<template>
  <a href="tel: +7 (982) 536-50-77">+7 (982) 536-50-77</a>
</template>
```
