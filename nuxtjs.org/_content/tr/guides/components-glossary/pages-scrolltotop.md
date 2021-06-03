---
title: 'ScrollToTop Özelliği'
description: scrollToTop özelliği, Nuxt.js'e sayfayı oluşturmadan önce en üste kaydırmasını söyleyebilmenizi sağlar.
menu: scrollToTop Özelliği
category: components-glossary
position: 0
---

> scrollToTop özelliği, Nuxt.js'e sayfayı oluşturmadan önce en üste kaydırmasını söyleyebilmenizi sağlar.

- **Type:** `Boolean` (varsayılan: `false`)

Varsayılan olarak, Nuxt.js başka bir sayfaya gittiğinizde en üste kayar, ancak alt rotalarda kaydırma konumunu korur. Nuxt.js'e alt rotanızı oluştururken en üste kaydırmasını söylemek istiyorsanız, `scrollToTop`'ı `true` olarak ayarlayın.

```html
<template>
  <h1>Alt bileşenim</h1>
</template>

<script>
  export default {
    scrollToTop: true
  }
</script>
```

Tam aksine ise, üst rotalarda da `scrollToTop`'ı manuel bir şekilde `false` olarak ayarlayabilirsiniz.

Eğer Nuxt.js'in varsayılan kaydırma yeteneğini üzerine yazıp değiştirmek istiyorsanız, [scrollBehavior seçeneği](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior) 'ne bir göz atın.
