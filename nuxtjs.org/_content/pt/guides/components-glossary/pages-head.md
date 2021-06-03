---
title: 'O método head'
description: Nuxt.js usa vue-meta para atualizar as headers e atributos HTML da sua aplicação.
menu: Head Method
category: components-glossary
position: 0
---

> Nuxt.js usa [vue-meta](https://github.com/nuxt/vue-meta) para atualizar as `headers` e `atributos html` da sua aplicação.

- **Tipo:** `Object` ou `Function`

Use o método `head` para definir as tags HTML Head para a página atual.

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello World!'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          // hid é usado como identificador único. Não use `vmid` para isso, pois não funcionará
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }
  }
</script>
```
