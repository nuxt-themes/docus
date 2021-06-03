---
title: Requisição de Dados
description: No Nuxt.js, temos 2 maneiras de obter dados de uma API. Podemos usar o método fetch ou o método asyncData.
position: 4
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/04_data_fetching?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Onde você pode usar o método fetch do Nuxt.js?
    answers:
      - pages e components
      - apenas em pages
      - apenas em components
    correctAnswer: pages e components
  - question: Você tem acesso ao this quando usa o método fetch do Nuxt.js?
    answers:
      - true
      - false
    correctAnswer: true
  - question: Quando o método fetch do Nuxt.js é chamado?
    answers:
      - depois da instância do componente
      - antes da instância do componente
      - durante a instância do componente
    correctAnswer: depois da instância do componente
  - question: O que permite a você exibir um placeholder quando `fetch` está sendo chamado *no lado do cliente?*
    answers:
      - $fetchState.timestamp
      - $fetchState.error
      - $fetchState.pending
    correctAnswer: $fetchState.pending
  - question: Como você salva chamadas de fetch em páginas que já visitou?
    answers:
      - keep-alive
      - save-fetch
      - cache-fetch
    correctAnswer: keep-alive
  - question: No método activated, qual propriedade você usa para adicionar um cache de 30 segundos ao fetch?
    answers:
      - $fetchState.pending
      - $fetchState.timestamp
      - $fetchState.cache
    correctAnswer: $fetchState.timestamp
  - question: Quando `asyncData` é chamado?
    answers:
      - depois da instância do componente
      - durante a instância do componente
      - antes da instância do componente
    correctAnswer: antes da instância do componente
  - question: Você tem acesso a `this` dentro de asyncData?
    answers:
      - true
      - false
    correctAnswer: false
  - question: Com asyncData você pode usar o parâmetro `context` para acessar os dados de rotas dinâmicas?
    answers:
      - true
      - false
    correctAnswer: true
  - question: Você tem acesso ao código de status do erro no asyncData?
    answers:
      - true
      - false
    correctAnswer: true
---

No Nuxt.js, temos 2 maneiras de obter dados de uma API. Podemos usar o método fetch ou o método asyncData.

## O método fetch

<base-alert type="info">

Este método está disponível apenas para Nuxt `2.12+`.

</base-alert>

O método `fetch` do Nuxt.js é chamado após a instância do componente for criada no lado do servidor: `this` está disponível dentro dele.

```js
export default {
  async fetch() {
    console.log(this)
  }
}
```

<base-alert>

`fetch(context)` tornou-se obsoleto, em vez disso você pode usar um [middleware anônimo](/docs/2.x/directory-structure/middleware#anonymous-middleware) em sua página: `middleware(context)`

</base-alert>

### Quando usar o fetch?

Sempre que você precisa obter dados assíncronos. `fetch` é chamado no lado do servidor ao renderizar a rota e no lado do cliente ao navegar.

Ele expõe `$fetchState` a nível de componente com as seguintes propriedades:

- `pending` é um `Boolean`, permite a você mostrar um placeholder quando o `fetch` é chamado _no lado do cliente_.
- `error` pode ser `null` ou `Error` e permite a você mostrar uma mensagem de erro
- `timestamp` é um carimbo de data/hora do último fetch, útil para [fazer cache com o `keep-alive`](#caching)

Você também tem acesso a `this.$fetch()`, útil se você deseja chamar o método `fetch` em seu componente.

```html{}[components/NuxtMountains.vue]
<template>
  <p v-if="$fetchState.pending">Buscando montanhas...</p>
  <p v-else-if="$fetchState.error">Ocorreu um erro:(</p>
  <div v-else>
    <h1>Montanhas Nuxt</h1>
    <ul v-for="mountain of mountains">
      <li>{{ mountain.title }}</li>
    </ul>
    <button @click="$fetch">Recarregar</button>
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

<base-alert type="info">

Você pode acessar o [contexto](/docs/2.x/concepts/context-helpers) do Nuxt dentro do método fetch utilizando o `this.$nuxt.context`.

</base-alert>

### Opções

`fetchOnServer`: `Boolean` ou `Function` (padrão: `true`), chama o `fetch()` quando o servidor renderizar está página

`fetchDelay`: `Integer` (padrão: `200`), define o tempo mínimo de execução em milissegundos (para evitar flashes rápidos)

Quando `fetchOnServer` é falso (`false` ou retorna `false`), `fetch` será chamado apenas no lado do cliente e `$fetchState.pending` retornará `true` quando o servidor renderizar o componente.

```js
export default {
  data() {
    return {
      posts: []
    }
  },
  async fetch() {
    this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
      res.json()
    )
  },
  // chama o fetch apenas no lado do cliente
  fetchOnServer: false
}
```

### Ouvindo as alterações da string de consulta (query string)

Por padrão, o método `fetch` não é chamado nas alterações da string de consulta. Para observar as mudanças na consulta, você pode adicionar um watch em `$route.query` e chamar `$fetch`:

```js
export default {
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    // Chamado também nas alterações da string de consulta
  }
}
```

### Cache

Você pode usar a diretiva `keep-alive` no componente `<nuxt />` e `<nuxt-child />` para salvar as chamadas `fetch` em páginas que você já visitou:

```html{}[layouts/default.vue]
<template>
  <nuxt keep-alive />
</template>
```

Você também pode especificar as [props](https://vuejs.org/v2/api/#keep-alive) passados ao `<keep-alive>` passando a prop `keep-alive-props` para o componente `<nuxt>`.

```html{}[layouts/default.vue]
<nuxt keep-alive :keep-alive-props="{ max: 10 }" />
```

Mantém apenas 10 componentes de página na memória.

### Utilizando o método `activated`

O Nuxt preencherá o `this.$fetchState.timestamp` (timestamp) da última chamada `fetch` (ssr também). Você pode usar esta propriedade combinada com o método `activated` para adicionar um cache de 30 segundos ao `fetch`:

```html{}[pages/posts/_id.vue]
<template> ... </template>

<script>
  export default {
    data() {
      return {
        post: {}
      }
    },
    activated() {
      // Executa o fetch de novo se última chamada
      // ocorreu a mais de 30 segundos atrás
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
      }
    },
    async fetch() {
      this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
        res.json()
      )
    }
  }
</script>
```

A navegação para a mesma página não executará o `fetch` se a última chamada `fetch` ocorreu dentro de 30 segundos.

## AsyncData

<base-alert>

`asyncData` está disponível apenas em [pages](/docs/2.x/directory-structure/pages) e você não tem acesso ao `this` dentro deste método.

</base-alert>

A principal diferença com o `fetch` é que você não precisa lidar com nenhum estado pendente ou erro. O Nuxt aguardará a conclusão do método `asyncData` antes de navegar para a próxima página ou exibir a [página de erro](/docs/2.x/directory-structure/layouts#error-page).

Este método recebe [o contexto](/docs/2.x/concepts/context-helpers) como primeiro argumento. Você pode usá-lo para buscar alguns dados e o Nuxt.js mesclará automaticamente o objeto retornado com o data do componente.

```html{}[pages/index.vue]
<template>
  <h1>{{ project }}</h1>
</template>

<script>
  export default {
    async asyncData(context) {
      return {
        project: 'nuxt'
      }
    }
  }
</script>
```

Nos próximos exemplos, usaremos o [@nuxt/http](https://http.nuxtjs.org/) que recomendamos para buscar dados de uma API.

Primeiro, precisamos instalá-lo:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxt/http
```

  </code-block>
  <code-block label="npm">

```bash
npm install @nuxt/http
```

  </code-block>
</code-group>

Então, adicionamos à seção `modules` do `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxt/http']
}
```

```html{}[pages/posts/_id.vue]
<template>
  <div>
    <h1>{{ post.title }</h1>
    <p>{{ post.description }}</p>
  </div>
</template>

<script>
  export default {
    async asyncData({ params, $http }) {
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
      return { post }
    }
  }
</script>
```

### Ouvindo as alterações da consulta

Por padrão, o método `asyncData` não é chamado nas alterações da string de consulta. Se você quiser mudar este comportamento, por exemplo, ao construir um componente de paginação, você pode definir parâmetros que devem ser ouvidos com a propriedade `watchQuery` do seu componente de página.

<base-alert type="next">

Saiba mais sobre a [propriedade watchQuery](/docs/2.x/components-glossary/pages-watchquery) e veja a list das [propriedades disponíveis no contexto](/docs/2.x/concepts/context-helpers).

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
