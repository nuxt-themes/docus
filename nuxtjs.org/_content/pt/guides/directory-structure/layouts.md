---
title: layouts
description: Os layouts são uma grande ajuda quando você deseja alterar a aparência de sua aplicação Nuxt.js. Se você deseja incluir uma barra lateral ou ter layouts distintos para celular e desktop.
position: 7
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/07_layouts?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Você pode facilmente renomear o diretório de layouts sem qualquer configuração
    answers:
      - true
      - false
    correctAnswer: false
  - question: Como é chamada a página de layout padrão?
    answers:
      - layout.vue
      - default.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: Qual componente você deve incluir em seus layouts?
    answers:
      - <Nuxt />
      - <NuxtLink />
      - <RouterView />
    correctAnswer: <Nuxt />
  - question: Você pode adicionar qualquer outro componente ao seu layout
    answers:
      - true
      - false
    correctAnswer: true
  - question: Para adicionar um layout personalizado, você cria um arquivo `.vue` e o adiciona a qual pasta?
    answers:
      - layout
      - layouts
      - page
    correctAnswer: layouts
  - question: Como você diz à página usar o layout do blog?
    answers:
      - "layout: 'blog'"
      - "name: 'blog'"
      - 'blog: true'
    correctAnswer: "layout: 'blog'"
  - question: Em qual diretório você adiciona uma página de erro?
    answers:
      - pages
      - layouts
      - errors
    correctAnswer: layouts
  - question: Você deve adicionar o componente `<Nuxt>` à página de erro?
    answers:
      - true
      - false
    correctAnswer: false
  - question: Você pode definir um layout personalizado para sua página de erro
    answers:
      - true
      - false
    correctAnswer: true
  - question: A página de erro é exibida quando ocorre um erro durante a renderização do lado do servidor
    answers:
      - true
      - false
    correctAnswer: false
---

Os layouts são uma grande ajuda quando você deseja alterar a aparência de sua aplicação Nuxt.js. Se você deseja incluir uma barra lateral ou ter layouts distintos para celular e desktop.

<base-alert>

_Este diretório não pode ser renomeado sem configuração extra._

</base-alert>

## Layout Padrão

Você pode estender o layout principal adicionando um arquivo `layouts/default.vue`. Ele será usado para todas as páginas que não possuem um layout especificado. Certifique-se de adicionar o componente `<Nuxt>` ao criar um layout para incluir, de fato, o componente de página.

Tudo que você precisa em seu layout são três linhas de código que irão renderizar o componente de página.

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

Você pode adicionar mais componentes aqui, como navegação, cabeçalho, rodapé, etc.

```html{}[layouts/default.vue]
<template>
  <TheHeader />
  <Nuxt />
  <TheFooter />
</template>
```

<base-alert type="info">
  
Se você [definiu components como verdadeiro](/docs/2.x/directory-structure/components), então não é necessário importar manualmente os seus componentes.

</base-alert>

## Layout Personalizado

Cada arquivo (_alto-nivel_) no diretório `layouts` criará um layout personalizado acessível com a propriedade `layout` nos componentes de página.

Digamos que queremos criar um layout de blog e salvá-lo em `layouts/blog.vue`:

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>Minha barra de navegação do blog aqui</div>
    <Nuxt />
  </div>
</template>
```

Então você tem que dizer às páginas para usarem seu layout personalizado

```js{}[pages/posts.vue]
<script>
export default {
  layout: 'blog',
  // OR
  layout (context) {
    return 'blog'
  }
}
</script>
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## Página de Erro

A página de erro é um _componente de página_ que sempre será exibido quando ocorre um erro (que não é lançado no lado do servidor).

<base-alert>

Embora este arquivo seja colocado na pasta `layouts`, ele deve ser tratado como uma página.

</base-alert>

Como mencionado acima, este layout é especial e você não deve incluir `<Nuxt>` dentro de seu template. Você deve ver este layout como um componente exibido quando ocorre um erro (`404`, `500`, etc.). Semelhante a outros componentes de página, você também pode definir um layout personalizado para a página de erro.

Você pode personalizar a página de erro adicionando o arquivo `layouts/error.vue`:

```js{}[layouts/error.vue]
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Página não encontrada</h1>
    <h1 v-else>Ocorreu um erro</h1>
    <NuxtLink to="/">Página Inicial</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // você pode definir um layout personalizado para a página de erro
}
</script>
```

<base-alert type="info">

O código-fonte da página de erro padrão está [disponível no GitHub](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue).

</base-alert>

<quiz :questions="questions"></quiz>
