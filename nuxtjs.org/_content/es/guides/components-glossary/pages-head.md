---
title: 'El método head'
description: Nuxt.js utiliza vue-meta para actualizar los encabezados y atributos HTML de vuestra aplicación.
menu: Método Head
category: components-glossary
position: 0
---

> Nuxt.js utiliza [vue-meta] (https://github.com/nuxt/vue-meta) para actualizar los `headers` (encabezados) y los `atributos html` de vuestra aplicación.

- **Type:** `Object` o `Function`

Utilice el método `head` para configurar las etiquetas de cabecera HTML que se usaran para la página actual.

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hola Mundo!'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          // hid se utiliza como identificador único. No use `vmid` porque no funcionará
          {
            hid: 'description',
            name: 'description',
            content: 'Mi asombrosa descripción'
          }
        ]
      }
    }
  }
</script>
```
