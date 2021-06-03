---
title: Views
description: A seção Views descreve tudo que você precisa saber para configurar os dados e as views para uma rota específica na sua aplicação Nuxt.js. As views consistem em um app template, um layout e a página.
position: 1
category: concepts
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/01_views?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Qual é a ordem de composição de uma view no Nuxt (de cima para baixo)?
    answers:
      - Layout → Page → Documento
      - Page → Layout → Documento
      - Documento → Layout → Page
    correctAnswer: Documento → Layout → Page
  - question: Qual é o nome do layout padrão?
    answers:
      - default.vue
      - layout.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: Como você cria um layout personalizado?
    answers:
      - adicionando um arquivo .vue no diretório pages
      - adicionando um arquivo .vue no diretório layouts
      - adicionando um arquivo .vue no diretório components
    correctAnswer: adicionando um arquivo .vue no diretório layouts
  - question: Como você ativa seu layout personalizado chamado 'blog' na sua página?
    answers:
      - "layout: 'blog'"
      - "layout: 'default'"
      - "blog: 'blog'"
    correctAnswer: "layout: 'blog'"
  - question: Onde você coloca o arquivo error.vue parar criar uma página de erro personalizada?
    answers:
      - no diretório pages
      - no diretório errors
      - no diretório layouts
    correctAnswer: no diretório layouts
---

A seção Views descreve tudo que você precisa saber para configurar os dados e as views para uma rota específica na sua aplicação Nuxt.js. As views consistem de um app template, um layout e a página. Além disso, você pode definir meta tags personalizadas para a seção head de cada página, que são importantes para SEO (Search Engine Optimization).

![Composição de uma View no Nuxt.js](/docs/2.x/views.png)

Composição de uma View no Nuxt.js

## Pages (páginas)

Cada componente de página é um componente Vue, mas o Nuxt.js adiciona atributos e funções especiais para tornar o desenvolvimento da sua aplicação ainda mais fácil.

```html{}[pages/index.vue]
<template>
  <h1 class="red">Olá mundo</h1>
</template>

<script>
  export default {
    head() {
      // Defina as Meta Tags para essa página
    }
    // ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## Propriedades de um componente de Página

Existem muitas propriedades do componente de página, como a propriedade head no exemplo acima.

<base-alert type="next">

Veja o [livro de Estrutura de Diretórios](/docs/2.x/directory-structure/nuxt) para saber mais sobre todas as propriedades que você pode usar em sua página

</base-alert>

## Layouts

Os layouts são uma grande ajuda quando você deseja alterar a aparência do seu aplicativo Nuxt.js. Por exemplo, você deseja incluir uma barra lateral ou ter layouts distintos para celular e desktop.

### Layout Padrão

Você pode definir um layout padrão adicionando um arquivo `default.vue` dentro do diretório de layouts. Isso será utilizado em todas as páginas que não possuem um layout especificado. O único código obrigatório que você precisa incluir no layout é o componente `<Nuxt />` que renderiza o componente da página.

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

<base-alert type="next">

Saiba mais sobre o [componente Nuxt](/docs/2.x/features/nuxt-components) on capítulo de componentes

</base-alert>

### Layout Personalizado

Você pode criar layouts personalizados adicionando um arquivo `.vue` ao diretório de layouts. Para usar o layout personalizado, você precisa definir a propriedade `layout` no componente da página onde deseja usar esse layout. O valor será o nome do layout personalizado que você criou.

Para criar um layout de blog, adicione um arquivo `blog.vue` ao diretório de layouts `layouts/blog.vue`:

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>Minha barra de navegação vai aqui</div>
    <Nuxt />
  </div>
</template>
```

<base-alert>

Certifique-se de adicionar o componente `<Nuxt />` ao criar um layout para de fato incluir o componente da página.

</base-alert>

Em seguida, usamos a propriedade layout com o valor de 'blog' na página onde queremos que o layout seja utilizado.

```html{}[pages/posts.vue]
<template>
  <!-- Seu template -->
</template>
<script>
  export default {
    layout: 'blog'
    // definições do componente de páginas
  }
</script>
```

<base-alert type="info">

Se você não adicionar uma propriedade de layout à sua página, por exemplo, `layout: 'blog'` então o layout `default.vue` será utilizado.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

### Página de Erro

A página de erro é um _componente de página_ que será sempre exibido quando ocorre um erro (isso não acontece durante a renderização no servidor).

<base-alert>

Embora este arquivo seja colocado na pasta `layouts`, ele deve ser tratado como uma página.

</base-alert>

Como mencionado acima, este layout é especial, já que você não deve incluir o componente `<Nuxt />` dentro de seu template. Você deve enxergar este layout como um componente exibido quando ocorre um erro (`404`,`500`, etc.). Semelhante a outros componentes de página, você também pode definir um layout personalizado para a página de erro da mesma maneira.

Você pode personalizar a página de erro adicionando um arquivo `layouts/error.vue`:

```html{}[layouts/error.vue]
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Página não encontrada</h1>
    <h1 v-else>Ocorreu um erro</h1>
    <NuxtLink to="/">Página Inicial</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // você pode definir um layout personalizado para a página de erro
  }
</script>
```

## Documento: App.html

O app template é usado para criar o frame HTML atual do seu documento para aplicações Nuxt.js, que injeta o conteúdo, bem como as variáveis da head e do body. Este arquivo é criado automaticamente para você e, em geral, raramente precisa ser modificado. Você pode personalizar o app template do seu HTML, utilizado pelo Nuxt.js, para incluir scripts ou classes CSS condicionalmente criando um arquivo `app.html` no diretório de origem do seu projeto que, por padrão, é o diretório raiz.

O modelo padrão usado pelo Nuxt.js é:

```html{}[app.html]
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

Um caso de uso de um app template personalizado é para adicionar classes CSS para o IE, condicionalmente:

```html{}[app.html]
<!DOCTYPE html>
<!--[if IE 9]><html class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

<base-alert type="info">

Embora você possa adicionar arquivos JavaScript e CSS no `app.html`, recomenda-se usar o `nuxt.config.js` para essas tarefas!

</base-alert>

<quiz :questions="questions"></quiz>
