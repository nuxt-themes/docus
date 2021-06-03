---
title: '$nuxt: O helper Nuxt.js'
description: $nuxt é um helper projetado para melhorar a experiência do usuário.
category: internals-glossary
position: 2
---

`$nuxt` é um helper projetado para melhorar a experiência do usuário.
Para obter mais informações sobre o helper Nuxt.js, verifique o [capítulo Contexto e Helpers, no livro Conceitos](/docs/2.x/concepts/context-helpers#nuxt-the-nuxtjs-helper).

## Verificador de conexão

- `isOffline`
  - Tipo: `Boolean`
  - Descrição: `true` quando o usuário fica offline
- `isOnline`
  - Tipo: `Boolean`
  - Descrição: Oposto do `isOffline`

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">Você está offline</div>
    <nuxt />
  </div>
</template>
```

## Recarregando os dados da página

- `refresh()`
  - Quando você deseja atualizar apenas os dados fornecidos por asyncData ou fetch

```html{}[example.vue]
<template>
  <div>
    <div>{{ conteudo }}</div>
    <button @click="recarregar">Recarregar</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { conteudo: 'Criado em: ' + new Date() }
    },
    methods: {
      recarregar() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

## Controlando a barra de carregamento

- `$loading`
  - Quando você deseja controlar a barra de carregamento do Nuxt programaticamente

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
