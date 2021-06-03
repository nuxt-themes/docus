---
title: content
description: Empodere sua aplicacão Nuxt.js com o módulo `@nuxt/content`, no qual você pode escrever em um diretório `content/` e requisitar seus arquivos Markdown, JSON, YAML e CSV através de um API no semelhante ao MongoDB, agindo como um **CMS Headless baseado em Git**.
position: 4
category: directory-structure
img: /docs/2.x/nuxt-content.svg
imgAlt: nuxt content module
questions:
  - question: Qual é o nome do diretório padrão onde você adiciona seus arquivos markdown?
    answers:
      - markdown
      - content
      - pages
    correctAnswer: content
  - question: Qual componente você usa em seu modelo para exibir o corpo de sua página do seu markdown?
    answers:
      - <markdown>
      - <nuxt>
      - <nuxt-content>
    correctAnswer: <nuxt-content>
  - question: Qual classe é adicionada automaticamente para que você possa estilizar seu markdown?
    answers:
      - .content
      - .nuxt-content
      - .markdown
    correctAnswer: .nuxt-content
  - question: O módulo content pode lidar com arquivos markdown, csv, yaml e json
    answers:
      - true
      - false
    correctAnswer: true
  - question: Você pode adicionar componentes vue aos seus arquivos markdown
    answers:
      - true
      - false
    correctAnswer: true
  - question: O que você usa para listar, filtrar e pesquisar seu conteúdo?
    answers:
      - $nuxt-content()
      - $content()
      - $nuxt()
    correctAnswer: $content()
  - question: O que você usa para obter os artigos anteriores e seguintes?
    answers:
      - .surround(slug)
      - .prev-next(slug)
      - .slug()
    correctAnswer: .surround(slug)
  - question: As classes do PrismJS são aplicadas a blocos de código por padrão?
    answers:
      - true
      - false
    correctAnswer: true
  - question: Qual é o URL padrão que você usa para acessar a API para ver seu JSON?
    answers:
      - http://localhost:3000/content
      - http://localhost:3000/_content
      - http://localhost:3000/api
    correctAnswer: http://localhost:3000/_content
  - question: Quais tags de título são usadas para criar o Índice
    answers:
      - h1 and h2
      - h2 and h3
      - h1 and h2 and h3
    correctAnswer: h2 and h3
  - question: Você pode usar o módulo de conteúdo com geração de sites estáticos
    answers:
      - true
      - false
    correctAnswer: true
---

Empodere sua aplicacão Nuxt.js com o módulo `@nuxt/content`, no qual você pode escrever em um diretório `content/` e requisitar seus arquivos Markdown, JSON, YAML e CSV através de uma API no semelhante ao MongoDB, agindo como um **CMS Headless baseado em Git**.

<app-modal :src="img" :alt="imgAlt"></app-modal>

### Hot reload no desenvolvimento

O módulo content é extremamente rápido quando se trata de hot reloading no desenvolvimento, devido a não ter que passar pelo webpack ao fazer alterações em seus arquivos markdown. Você também pode ouvir o evento `content:update` e criar um plugin para que toda vez que você atualizar um arquivo em seu diretório content ele despache um método fetchCategories, por exemplo.

<base-alert type="next">

[Veja a documentação do módulo content para mais detalhes](https://content.nuxtjs.org/advanced#handling-hot-reload)

</base-alert>

### Exibindo conteúdo

Você pode usar o componente `<nuxt-content>` diretamente em seu template para exibir o corpo da página.

```html{}[pages/blog/_slug.vue]
<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>
```

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/displaying#component) para mais detalhes

</base-alert>

### Estilo do seu conteúdo

Dependendo do que você está usando fazer o design da sua aplicação, pode ser necessário escrever algum estilo para exibir adequadamente o markdown.

O componente `<nuxt-content>` adicionará automaticamente a classe `.nuxt-content`, você pode usá-lo para personalizar seus estilos.

```html
<style>
  .nuxt-content h2 {
    font-weight: bold;
    font-size: 28px;
  }
  .nuxt-content p {
    margin-bottom: 20px;
  }
</style>
```

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/displaying#style) para mais detalhes

</base-alert>

### Lidar com Markdown, CSV, YAML, JSON(5)

Este módulo converte seus arquivos .md em uma estrutura de árvore JSON AST, armazenada na variável body. Você também pode adicionar um bloco de front matter YAML aos seus arquivos de markdown ou um arquivo .yaml que será injetado no documento. Você também pode adicionar um arquivo json/json5 que também pode ser injetado no documento. E você pode usar um arquivo .csv onde as linhas serão atribuídas à variável body.

```md
---
title: Meu primeiro post
description: Aprendendo como utilizar o @nuxt/content para criar um blog
---
```

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/writing#markdown) para mais detalhes

</base-alert>

### Componente Vue em Markdown

Você pode usar os componentes do Vue diretamente em seus arquivos de markdown. No entanto, você precisará usar seus componentes no formato kebab case e não pode usar tags de auto fechamento.

```html{}[components/global/InfoBox.vue]
<template>
  <div class="bg-blue-500 text-white p-4 mb-4">
    <p><slot name="info-box">default</slot></p>
  </div>
</template>
```

```html{}[content/articles/meu-primeiro-post.md]
<info-box>
  <template #info-box>
    Este é um componente vue dentro do markdown usando slots
  </template>
</info-box>
```

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/writing#vue-components) para mais detalhes

</base-alert>

### API totalmente pesquisável

Você pode usar `$content()` para listar, filtrar e pesquisar seu conteúdo facilmente.

```html{}[pages/blog/index.vue]
<script>
  export default {
    async asyncData({ $content, params }) {
      const articles = await $content('articles', params.slug)
        .only(['title', 'description', 'img', 'slug', 'author'])
        .sortBy('createdAt', 'asc')
        .fetch()

      return {
        articles
      }
    }
  }
</script>
```

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/fetching#methods) para mais detalhes

</base-alert>

### Artigos anteriores e próximos

O módulo content inclui o método `.surround(slug)` para que você obtenha os artigos anteriores e seguintes facilmente.

```js
async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next
    }
  },
```

```html
<prev-next :prev="prev" :next="next" />
```

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/fetching#surroundslug-options) para mais detalhes

</base-alert>

### Pesquisa de texto completo

O módulo content vem com uma pesquisa de texto completo para que você possa pesquisar facilmente seus arquivos markdown sem precisar instalar nada.

```html{}[components/AppSearchInput.vue]
<script>
  export default {
    data() {
      return {
        searchQuery: '',
        articles: []
      }
    },
    watch: {
      async searchQuery(searchQuery) {
        if (!searchQuery) {
          this.articles = []
          return
        }
        this.articles = await this.$content('articles')
          .limit(6)
          .search(searchQuery)
          .fetch()
      }
    }
  }
</script>
```

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/fetching#searchfield-value) para mais detalhes

</base-alert>

### Highlighting de sintaxe

Este módulo engloba os código de blocos do [PrismJS](https://prismjs.com/) e aplica suas classes. Você também pode adicionar um tema prismJS diferente ou desativá-lo completamente.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add prism-themes
```

  </code-block>
  <code-block label="npm">

```bash
npm install prism-themes
```

  </code-block>
</code-group>

```js{}[nuxt.config.js]
content: {
  markdown: {
    prism: {
      theme: 'prism-themes/themes/prism-material-oceanic.css'
    }
  }
}
```

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/writing#syntax-highlighting) para mais detalhes

</base-alert>

### Estenda o parse do Markdown

Originalmente, o markdown não é compatível com o highlighting de linhas dentro do bloco de códigos nem dos nomes de arquivos. O módulo content permite isso com sua própria sintaxe personalizada. Números de linha são adicionados à tag pre em atributos data-line e o nome do arquivo será convertido em um span com uma classe de nome de arquivo, para que você possa estilizá-lo.

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/writing#codeblocks) para mais detalhes

</base-alert>

### Geração de índice

Uma propriedade array chamada toc (Table of Contents, ou Índice) será injetada em seu documento, listando todos os cabeçalhos com seus títulos e ids, para que você possa criar um link para eles.

```html{}[pages/blog/_slug.vue]
<nav>
  <ul>
    <li v-for="link of article.toc" :key="link.id">
      <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</nav>
```

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/writing#table-of-contents) para mais detalhes

</base-alert>

### API QueryBuilder Poderosa (semelhante ao MongoDB)

O módulo content vem com uma API QueryBuilder poderosa semelhante ao MongoDB que permite que você veja facilmente o JSON de cada diretório em `http://localhost:3000/_content/`. O endpoint pode ser acessado por requisições GET e POST, portanto, você pode usar parâmetros de consulta.

`http://localhost:3000/_content/articles?only=title&only=description&limit=10`

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/advanced/#api-endpoint) para mais detalhes

</base-alert>

### Estenda com hooks

Você pode usar hooks para estender o módulo para que possa adicionar dados a um documento antes que ele seja armazenado.

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/advanced#hooks) para mais detalhes

</base-alert>

### Integração com @nuxtjs/feed

No caso de artigos, o content pode ser usado para gerar feeds de notícias usando o módulo [@nuxtjs/feed](https://www.npmjs.com/package/@nuxtjs/feed).

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/integrations/#nuxtjsfeed) para mais detalhes

</base-alert>

### Suporte à geração de sites estáticos

O módulo content trabalha com geração de sites estáticos usando o `nuxt generate`. Todas as rotas serão geradas automaticamente graças a funcionalidade do crawler do nuxt.

<base-alert>

Se estiver usando Nuxt < 2.13 e precisar especificar as rotas dinâmicas, você pode fazer isso usando a propriedade generate e usando @nuxt/content programaticamente.

</base-alert>

<base-alert type="next">

Veja a [documentação do módulo content](https://content.nuxtjs.org/advanced#programmatic-usage) para mais detalhes

</base-alert>

<base-alert type="next">

Para ver a [documentação completa do módulo content](https://content.nuxtjs.org/)

</base-alert>

<quiz :questions="questions"></quiz>
