---
title: Внешние ресурсы
description: Как использовать внешние ресурсы с Nuxt.js?
category: configuration
position: 1
---

# Как использовать внешние ресурсы?

## Глобальные настройки

Включите ваши ресурсы в файле nuxt.config.js:

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

## Локальные настройки

Включите ваши ресурсы в файле .vue в каталоге pages:

```html
<template>
  <h1>Страница About, использующая jQuery и шрифт Roboto</h1>
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
