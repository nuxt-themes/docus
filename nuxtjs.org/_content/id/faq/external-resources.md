---
title: Sumber daya eksternal
description: Bagaimana cara menggunakan sumber daya eksternal dengan Nuxt.js?
category: configuration
position: 1
---

# Bagaimana cara menggunakan sumber daya eksternal?

## Pengaturan Global

Masukan tautan sumber daya Anda didalam file `nuxt.config.js`:

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

## Pengaturan Lokal

Masukan tautan sumber daya Anda didalam file `.vue` yang berada didalam direktori `pages/`:

```html
<template>
  <h1>Halaman tentang dengan jQuery dan font Roboto</h1>
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

<style scoped>
  h1 {
    font-family: Roboto, sans-serif;
  }
</style>
```
