---
title: components
description: O diretório components contém seus componentes Vue.js. Os componentes são o que compõe as diferentes partes da sua página e podem ser reutilizados e importados para as suas páginas, layouts e até mesmo outros componentes.
position: 3
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/03_components?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/components.png
imgAlt: nuxt components module
questions:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
---

O diretório components contém seus componentes Vue.js. Os componentes são o que compõe as diferentes partes da sua página e podem ser reutilizados e importados para as suas páginas, layouts e até mesmo outros componentes.

### Requisitando Dados

Para acessar dados assíncronos de uma API em seus componentes, você pode usar o [ método `fetch()`](/docs/2.x/features/data-fetching#the-fetch-method) do Nuxt.

Usando `$fetchState.pending` podemos mostrar uma mensagem quando os dados estão esperando para serem carregados e usando`$fetchState.error` podemos mostrar uma mensagem de erro se houver um erro ao buscar os dados. Ao usar fetch, devemos declarar os dados na propriedade data. Em seguida, ele é preenchido com os dados que vêm da busca.

```html{}[components/MountainsList.vue]
<template>
  <div>
    <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Erro ao buscar montanhas.</p>
    <ul v-else>
      <li v-for="(mountain, index) in mountains" :key="index">
        {{ mountain.title }}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>
```

<base-alert type="next">

Veja o capítulo sobre [fetch()](/docs/2.x/features/data-fetching#the-fetch-method) para mais detalhes sobre como esse método funciona

</base-alert>

## Descoberta de componentes

<app-modal :src="img" :alt="imgAlt"></app-modal>

A partir de `v2.13`, Nuxt pode importar automaticamente seus componentes quando usados ​​em seus templates, para ativar este recurso, defina`components: true` em sua configuração:

```js{}[nuxt.config.js]
export default {
  components: true
}
```

Depois de criar seus componentes no diretório de components, eles estarão disponíveis para serem importados automaticamente.

```bash
components/
  TheHeader.vue
  TheFooter.vue
```

```html{}[layouts/default.vue]
<template>
  <TheHeader />
  <Nuxt />
  <TheFooter />
</template>
```

### Importações Dinâmicas

Para importar dinamicamente um componente, também conhecido como lazy loading de um componente, tudo que você precisa fazer é adicionar o prefixo `Lazy` em seu template.

```html{}[layouts.default.vue]
<template>
  <TheHeader />
  <Nuxt />
  <LazyTheFooter />
</template>
```

Usando o prefixo lazy, você também pode importar dinamicamente um componente quando um evento é disparado.

```html{}[pages/index.vue]
<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="showList">Show List</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    methods: {
      showList() {
        this.show = true
      }
    }
  }
</script>
```

### Diretórios Aninhados

Se você tiver componentes em diretórios aninhados, como:

```bash
components/
  base/
    Button.vue
```

O nome do componente será baseado em seu próprio nome de arquivo. Portanto, o componente será:

```html
<button />
```

Recomendamos que você use o nome do diretório no nome do arquivo para maior clareza:

```bash
components/
  base/
    BaseButton.vue
```

No entanto, se você deseja manter o nome do arquivo como Button.vue, você pode usar a opção prefix na configuração nuxt para adicionar um prefixo a todos os componentes em uma pasta específica.

```bash
components/
  base/
   Button.vue
```

```bash{}[nuxt.config.js]
components: {
  dirs: [
    '~/components',
      {
        path: '~/components/base/',
        prefix: 'Base'
      }
  ]
}
```

E agora, no seu template, você pode usar o BaseButton em vez de Button sem ter que fazer alterações no nome do seu arquivo `Button.vue`.

```html{}[pages/index.vue]
<BaseButton />
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<base-alert type="next">

Para saber mais sobre o [módulo de componentes](/blog/improve-your-developer-experience-with-nuxt-components)

</base-alert>
