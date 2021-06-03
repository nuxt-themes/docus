---
title: pages
description: O diretório `pages` contém suas visualizações e rotas da aplicação. O Nuxt.js lê todos os arquivos `.vue` dentro deste diretório e cria automaticamente a configuração do roteador para você.
position: 10
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/11_pages?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Em qual diretório você coloca os componentes de páginas?
    answers:
      - views
      - pages
      - vues
    correctAnswer: pages
  - question: Para criar rotas, você precisa configurar manualmente um arquivo router.js
    answers:
      - true
      - false
    correctAnswer: false
  - question: Você pode criar rotas com arquivos .js e .ts
    answers:
      - true
      - false
    correctAnswer: true
  - question: Quando asyncData é chamado?
    answers:
      - antes de carregar o componente
      - durante o carregamento do componente
      - depois de carregar o componente
    correctAnswer: antes de carregar o componente
  - question: Em que propriedade você adiciona suas metatags?
    answers:
      - head
      - meta
      - metaTags
    correctAnswer: head
  - question: Qual propriedade você usa para adicionar um layout diferente à sua página?
    answers:
      - layouts
      - page
      - layout
    correctAnswer: layout
  - question: Como definir a propriedade scrollToTop se quiser dizer ao Nuxt.js para rolar para o topo ao renderizar sua rota secundária?
    answers:
      - "scrollToTop: 'scroll'"
      - 'scrollToTop: true'
      - "scroll: 'top'"
    correctAnswer: 'scrollToTop: true'
  - question: Como você adiciona o middleware/auth.js à sua página?
    answers:
      - 'middleware: true'
      - "middleware: 'auth'"
      - "import auth from 'middleware/auth.js'"
    correctAnswer: "middleware: 'auth'"
  - question: Para configurar um observador para strings de consulta, qual propriedade você usa?
    answers:
      - watcher
      - queryWatcher
      - watchQuery
    correctAnswer: watchQuery
  - question: O observador está desabilitado por padrão.
    answers:
      - true
      - false
    correctAnswer: true
---

O diretório `pages` contém suas views e rotas da aplicação. O Nuxt.js lê todos os arquivos `.vue` dentro deste diretório e cria automaticamente a configuração do roteador para você.

<base-alert type="info">

Você também pode criar rotas com arquivos .js e .ts

</base-alert>

Cada componente de página é um componente Vue, mas Nuxt.js adiciona atributos e funções especiais para tornar o desenvolvimento da sua aplicação universal o mais fácil possível.

```html{}[pages
<template>
  <h1 class="red">Olá, {{ name }}!</h1>
</template>

<script>
  export default {
    // propriedades da página vão aqui
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## Páginas Dinâmicas

As páginas dinâmicas podem ser criadas quando você não sabe o nome da página devido a ele vir de uma API ou não deseja ter que criar a mesma página repetidamente. Para criar uma página dinâmica, você precisa adicionar um sublinhado antes do nome do arquivo .vue ou antes do nome do diretório, se quiser que o diretório seja dinâmico. Você pode nomear o arquivo ou diretório como quiser, mas deve prefixá-lo com um sublinhado.

Se você definiu um arquivo chamado `_slug.vue` na pasta pages, você pode acessar o valor usando o contexto com params.slug

```html{}[pages/_slug.vue]
<template>
  <h1>{{ this.slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const slug = params.slug // Ao chamar /abc, o slug será "abc"
      return { slug }
    }
  }
</script>
```

Se você definiu um arquivo chamado \_slug.vue dentro de uma pasta chamada \_book, você pode acessar o valor usando o contexto com params.slug e params.book.

```html{}[pages/_book/_slug.vue]
<template>
  <h1>{{ this.book }} / {{ this.slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const book = params.book
      const slug = params.slug
      return { book, slug }
    }
  }
</script>
```

## Propriedades

### asyncData

AsyncData é sempre chamado antes de carregar o componente. Ele pode ser assíncrono e recebe o contexto como argumento. O objeto retornado será mesclado com seu objeto data.

```js{}[pages/index.vue]
export default {
  asyncData (context) {
    return { name: 'World' }
  }
```

<base-alert type="next">

Veja mais sobre como asyncData funciona em nosso capítulo [Requisição de dados](/docs/2.x/features/data-fetching#async-data)

</base-alert>

### fetch

Sempre que você precisar obter dados assíncronos, poderá usar fetch. Fetch é chamado no lado do servidor ao renderizar a rota e no lado do cliente ao navegar.

```html
<script>
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
    }
  }
</script>
```

<base-alert type="next">

Veja mais sobre como fetch funciona em nosso capítulo [Requisição de dados](/docs/2.x/features/data-fetching)

</base-alert>

### head

Defina tags `<meta>` específicas para a página atual. Nuxt.js usa `vue-meta` para atualizar a head do documento e os atributos meta da sua aplicação.

```js{}[pages/index.vue]
export default {
  head() {
    // Definir metatags para esta página
  }
}
```

<base-alert type="next">

Veja mais em nosso capítulo [Meta Tags e SEO](/docs/2.x/features/meta-tags-seo)

</base-alert>

### layout

Especifique um layout definido no diretório layouts.

```js{}[pages/index.vue]
export default {
  layout: 'blog'
}
```

<base-alert type="next">

Veja mais sobre layouts em nosso capítulo [Views](/docs/2.x/concepts/views#layouts)

</base-alert>

### loading

Se definido como falso, evita que uma página chame, automaticamente, `this.$nuxt.$loading.finish()`, quando você entra nela, e `this.$nuxt.$loading.start()`, quando você a deixa, permitindo que você controle manualmente o comportamento, como mostra [este exemplo](/examples/custom-loading-component).

```js{}[pages/index.vue]
export default {
  loading: false
}
```

<base-alert type="info">

Aplica-se apenas se o loading também estiver definido em nuxt.config.js.

</base-alert>

<base-alert type="next">

Veja mais em nosso capítulo [Loading](/docs/2.x/features/loading).

</base-alert>

### transition

Define uma transição específica para a página.

```js{}[pages/index.vue]
export default {
  transition: 'fade'
}
```

<base-alert type="next">

Veja mais em nosso capítulo [Transitions](/docs/2.x/features/transitions).

</base-alert>

### scrollToTop

A propriedade `scrollToTop` permite que você diga ao Nuxt.js para rolar para o topo antes de renderizar a página. Por padrão, o Nuxt.js rola para o topo quando você vai para outra página, mas com as rotas secundárias, o Nuxt.js mantém a posição de rolagem. Se você quiser dizer ao Nuxt.js para rolar para o topo ao renderizar sua rota secundária, defina `scrollToTop` como `true`.

```js{}[pages/index.vue]
export default {
  scrollToTop: true
}
```

Por outro lado, você pode definir manualmente `scrollToTop` como `false` nas rotas principais também.

Se você deseja sobrescrever o comportamento de rolagem padrão do Nuxt.js, dê uma olhada na [opção scrollBehavior](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior).

### middleware

Define o middleware para esta página. O middleware será chamado antes de renderizar a página.

```js{}[pages/index.vue]
export default {
  middleware: 'auth'
}
```

<base-alert type="next">

Veja mais sobre middleware em nosso capítulo [Middleware](/docs/2.x/directory-structure/middleware).

</base-alert>

### A propriedade watchQuery

Use a propriedade `watchQuery` para configurar um observador para strings de consulta. Se as strings definidas mudarem, todos os métodos do componente (asyncData, fetch, validate, layout, ...) serão chamados. Essa propriedade é desabilitada por padrão para melhorar o desempenho.

```js{}[pages/index.vue]
export default {
  watchQuery: ['page']
}
```

<base-alert type="info">

Se você quiser configurar um observador para todas as strings de consulta, defina `watchQuery` como `true`.

</base-alert>

```js{}[pages/index.vue]
export default {
  watchQuery: true
}
```

Você também pode usar a função `watchQuery(newQuery, oldQuery)` para ter observadores mais refinados.

```js{}[pages/index.vue]
export default {
  watchQuery(newQuery, oldQuery) {
    // Só executa métodos de componente se a string de consulta antiga continha `bar`
    // e a nova string de consulta contém `foo`
    return newQuery.foo && oldQuery.bar
  }
}
```

<base-alert type="next">

Veja mais sobre a propriedade watchQuery em nosso capítulo [Requisiçao de dados](/docs/2.x/features/data-fetching)

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

## Ignorando páginas

Se você deseja ignorar páginas para que não sejam incluídas no arquivo `router.js` gerado, você pode ignorá-las prefixando-as com um `-`.

Por exemplo, `pages/-about.vue` será ignorado.

<base-alert type="next">

Confira a [opção ignore](/docs/2.x/configuration-glossary/configuration-ignore) para aprender mais sobre isso.

</base-alert>

## Configuração

Você pode renomear o diretório `pages/` para algo diferente configurando a opção `dir.pages`:

```js{}[nuxt.config.js]
export default {
  dir: {
    // Renomear o diretório `pages` para` routes`
    pages: 'routes'
  }
}
```

<base-alert type="next">

Confira a [opção dir](/docs/2.x/configuration-glossary/configuration-dir) para aprender mais sobre isso.

</base-alert>

<quiz :questions="questions"></quiz>
