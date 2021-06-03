---
title: 'Head Yöntemi'
description: Nuxt.js, uygulamanızın başlıklarını ve HTML özniteliklerini güncellemek için vue-meta kullanır.
menu: Head Yöntemi
category: components-glossary
position: 0
---

> Nuxt.js, uygulamanızın `html attributes` ve `headers` (başlıklarını) bilgilerini güncellemek için [vue-meta](https://github.com/nuxt/vue-meta) kullanır.

- **Type:** `Object` veya `Function`

Şu anki sayfanın HTML başlık etiketlerini ayarlamak için `head` kullanın.

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Merhaba Dünya!'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          // hid benzersiz tanımlayıcı olarak kullanılır. `vmid` kullanmayın çünkü işe yaramayacaktır.
          {
            hid: 'description',
            name: 'description',
            content: 'Özel açıklamam'
          }
        ]
      }
    }
  }
</script>
```
