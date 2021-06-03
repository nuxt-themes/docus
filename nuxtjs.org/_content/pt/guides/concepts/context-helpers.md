---
title: Contexto e Helpers
description: O contexto fornece informações *adicionais* e geralmente opcionais sobre a solicitação atual para o aplicativo.
position: 2
category: concepts
csb_link_context: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-context?fontsize=14&hidenavigation=1&theme=dark
csb_link_helpers: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-helpers?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/context.svg
imgAlt: nuxt-js-context-keys
questions:
  - question: Qual é a razão pela qual o contexto existe?
    answers:
      - Renderização no servidor
      - Para ter um estado global
      - Preguiça
    correctAnswer: Renderização no servidor
  - question: Qual chave não está no contexto?
    answers:
      - env
      - isDev
      - $store
    correctAnswer: $store
  - question: Qual propriedade do contexto está disponível apenas no lado do *servidor*?
    answers:
      - from
      - app
      - req
    correctAnswer: req
  - question: Qual chave de contexto está disponível apenas no lado do *cliente*?
    answers:
      - from
      - res
      - app
    correctAnswer: from
  - question: O que o helper `$nuxt` *não* pode fazer?
    answers:
      - Exibir a versão do Nuxt
      - Fornecer informações sobre o status de conexão de Internet do usuário
      - Acessando funções do módulos expostos
    correctAnswer: Exibir a versão do Nuxt
  - question: Quais são os nomes dos helpers de processo?
    answers:
      - global, client e server
      - server, client e static
      - ssr, spa e static
    correctAnswer: server, client e static
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

O objeto `context` está disponível em funções específicas do Nuxt, como [asyncData](/docs/2.x/features/data-fetching#async-data), [plugins](/docs/2.x/directory-structure/plugins), [middleware](/docs/2.x/directory-structure/middleware) e [nuxtServerInit](/docs/2.x/directory-structure/store#the-nuxtserverinit-action). Ele fornece informações _adicionais_ e frequentemente opcionais sobre a request atual à aplicação.

Em primeiro lugar, o contexto é usado para fornecer acesso a outras partes da aplicação Nuxt.js, por exemplo, a store do Vuex ou a instância `connect` subjacente. Assim, temos os objetos `req` e `res` no contexto disponíveis no lado do servidor e a `store` sempre disponível. Mas com o tempo, o contexto foi estendido com muitas outras variáveis ​​e atalhos úteis. Agora temos acesso às funcionalidades do HMR em modo `development`, a `route` atual, os `params` e `query` da página, bem como a opção de acessar variáveis ​​de ambiente através do contexto. Além disso, funções de módulo e helpers podem ser expostos por meio do contexto para estarem disponíveis em ambos - lado do cliente e do servidor.

**Todas as propriedades de contexto que estão presentes por padrão**

```js
function (context) { // Poderia ser asyncData, nuxtServerInit, ...
  // Sempre disponíveis
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
    $config
  } = context

  // Disponíveis apenas no lado do servidor (Server-side)
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }

  // Disponíveis apenas no lado do cliente (Client-side)
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

<base-alert>

O _context_ ao qual nos referimos aqui não deve ser confundido com o objeto `context` disponível nas [Actions do Vuex](https://vuex.vuejs.org/guide/actions.html) ou aquele disponível na função `build.extend` no seu arquivo `nuxt.config.js`. Nem todos são relacionados uns com os outros!

</base-alert>

Saiba mais sobre as diferentes propriedades de contexto em nosso [Glossário de Internals](/docs/2.x/internals-glossary/context)

## Exemplos

### Usando parâmetros de página para sua consulta de API

O contexto expõe possíveis parâmetros dinâmicos da rota via `context.params`. No exemplo a seguir, chamamos uma API por meio do módulo `nuxt/http` usando um parâmetro de página dinâmica como parte da URL. Módulos, como o [nuxt/http](https://http.nuxtjs.org/), podem expor funções próprias que são então disponíveis através do objeto [context.app](http://context.app).

Além disso, envolvemos a chamada da API em uma instrução `try/catch` para lidar com prováveis erros. Com a função `context.error`, podemos mostrar diretamente a página de erro do Nuxt e passar o erro ocorrido.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData(context) {
    const id = context.params.id
    try {
      // Utilizando o módulo nuxtjs/http que foi exposto via context.app
      const post = await context.app.$http.$get(
        `https://api.nuxtjs.dev/posts/${id}`
      )
      return { post }
    } catch (e) {
      context.error(e) // Mostra a página de erro do nuxt com o erro lançado
    }
  }
}
```

Com [ES6](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/), você pode usar a sintaxe para destruturar o objeto de contexto. Você pode passar os objetos aos quais deseja ter acesso e, em seguida, utilizá-los no código sem usar a palavra context.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id

    try {
      // Utilizando o módulo nuxtjs/http que foi exposto via context.app
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (e) {
      error(e) // Mostra a página de erro do nuxt com o erro lançado
    }
  }
}
```

Quer usar parâmetros de consulta em vez disso? Você pode utilizar o [context.query.id](/docs/2.x/internals-glossary/context#query).

### Redirecionando usuários e acessando a store

Acessar a store do Vuex (quando configurada através do diretório `store`) também é possível através do contexto. Ele fornece um objeto `store` que pode ser tratado como `this.$store` nos componentes Vue. Além disso, usamos o método `redirect`, um helper exposto através do contexto, para redirecionar o usuário caso o state `authenticated` seja falso (falsy).

```js
export default {
  middleware({ store, redirect }) {
    // acessando as propriedades por meio da destruturação de objetos
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
```

<app-modal>
  <code-sandbox  :src="csb_link_context"></code-sandbox>
</app-modal>

## Helpers

Além dos atalhos no contexto, também existem outros pequenos helpers presentes em sua aplicação Nuxt.js.

## `$nuxt`: O helper do Nuxt.js

`$nuxt` é um helper projetado para melhorar a experiência do usuário e ser uma mão na roda em algumas situações. É acessível através do `this.$nuxt` nos componentes Vue e, caso contrário, através do `window.$nuxt` no lado do cliente.

### Verificador de conexão

O helper `$nuxt` fornece uma maneira rápida de descobrir se o usuário possui conexão com a Internet ou não: Ele expõe os valores booleanos `isOffline` e `isOnline`. Podemos usá-los para mostrar uma mensagem assim que o usuário estiver offline (por exemplo).

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">Você está offline</div>
    <Nuxt />
  </div>
</template>
```

### Acessando a instância raiz

Além de fornecer recursos DX/UX, o helper `$nuxt` também fornece um atalho para a instância raiz de todos os outros componentes da sua aplicação. Mas isso não é tudo - você também pode acessar o helper `$nuxt` através de `window.$nuxt`, que é uma forma de obter acesso a métodos de módulos, como o `$axios`, de fora de seus componentes Vue. Isso deve ser usado com cuidado e **apenas como último recurso**.

### Atualizando os dados da página

Quando você deseja atualizar a página atual para o usuário, você não quer recarregar totalmente a página porque pode acessar o servidor novamente e, no mínimo, reinicializar toda a aplicação Nuxt.js. Em vez disso, você geralmente deseja apenas atualizar os dados fornecidos por meio do `asyncData` ou `fetch`.

Você pode fazer isso utilizando o `this.$nuxt.refresh()`!

```html
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Recarregar</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Criado em: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

### Controlando a barra de loading

Com `$nuxt`, você também pode controlar a barra de carregamento do Nuxt programaticamente através do `this.$nuxt.$loading`.

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

Saiba mais no [capítulo da funcionalidade de loading](../features/loading)

## Helper onNuxtReady

Se você deseja executar alguns scripts _após_ seu aplicativo Nuxt.js ter sido carregado e estiver pronto, você pode usar a função `window.onNuxtReady`. Isso pode ser útil quando você deseja executar uma função no lado do cliente sem aumentar o tempo de interação do seu site.

```js
window.onNuxtReady(() => {
  console.log('O Nuxt.js está pronto e carregado')
})
```

## Helpers de processo

O Nuxt.js injeta três valores booleanos no objeto global `process` que o ajudará a indentificar se sua aplicação foi renderizada no servidor ou totalmente no cliente, além de verificar a geração estática do site. Esses helpers estão disponíveis na sua aplicação e são comumente utilizados ​​no `asyncData`.

```html{}[pages/about.vue]
<template>
  <h1>Eu sou renderizado no lado do {{ renderedOn }}</h1>
</template>

<script>
  export default {
    asyncData() {
      return { renderedOn: process.client ? 'cliente' : 'servidor' }
    }
  }
</script>
```

No exemplo, `renderedOn` será avaliado como `'servidor'` quando a renderização for no servidor ou quando um usuário acessar a página diretamente. Quando o usuário navegar para a página de outra parte da aplicação, por exemplo, clicando em um `<NuxtLink>`, ele resultará para cliente.

<app-modal>
  <code-sandbox  :src="csb_link_helpers"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
