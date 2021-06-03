---
title: '$nuxt: El ayudante de Nuxt.js'
description: $nuxt es un ayudante diseñado para mejorar la experiencia del usuario.
category: internals-glossary
position: 2
---

`$nuxt` es un ayudante diseñado para mejorar la experiencia del usuario.
Para más información sobre el ayudante de Nuxt.js mira el [capítulo de contexto y ayudantes en el libro conceptos](/docs/2.x/concepts/context-helpers#nuxt-the-nuxtjs-helper)

## Comprobador de conexión

- `isOffline`
  - Tipo: `Boolean`
  - Descripción: `true` cuando la conexión a internet del usuario se desconecta.
- `isOnline`
  - Tipo: `Boolean`
  - Descripción: El opuesto de `isOffline`

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">Estás desconectado</div>
    <nuxt />
  </div>
</template>
```

## Refrescando la información de la página

- `refresh()`
  - Cuando solo desea actualizar los datos proporcionados por asyncData o fetch

```html{}[example.vue]
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refrescar</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Creado en: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

## Controlando la barra de carga

- `$loading`
  - Cuando desee controlar la barra de carga de Nuxt mediante programación

```js{}[]
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```
