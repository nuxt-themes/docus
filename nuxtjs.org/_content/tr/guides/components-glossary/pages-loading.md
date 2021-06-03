---
title: 'Loading Özelliği'
description: loading özelliği, size belirli bir sayfadaki yüklenme çubuğunu devre dışı bırakma seçeneği sunar.
menu: Loading Özelliği
category: components-glossary
position: 0
---

> Loading özelliği, size belirli bir sayfadaki yüklenme çubuğunu devre dışı bırakma seçeneği sunar.

- **Type:** `Boolean` (varsayılan: `true`)

Varsayılan olarak, Nuxt.js rotalar arasında bir ilerleme çubuğu göstermek için kendi bileşenini kullanır.

Bu özelliği [Yapılandırmanın loading seçeneği](/docs/2.x/configuration-glossary/configuration-loading) ile devre dışı bırakabilir veya özelleştirebilirsiniz, ayrıca belirli sayfalar için `loading` özelliğini `false` olarak ayarlayarak devre dışı bırakabilirsiniz:

```html
<template>
  <h1>Sayfam</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```
