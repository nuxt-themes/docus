---
title: Roteamento
description: A maioria dos sites possui mais do que apenas uma página. Por exemplo, uma página inicial, uma página sobre mim, página de contato, etc. Para mostrar essas páginas, precisamos de um roteador.
position: 2
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/02_routing?fontsize=14&hidenavigation=1&theme=dark
---

## Rotas Automáticas

A maioria dos sites possui mais de uma página (ou seja, uma página inicial, uma página sobre mim, página de contato, etc.). Para mostrar essas páginas, precisamos de um roteador. É aí que entra o `vue-router`. Ao trabalhar com aplicações Vue, você deve definir um arquivo de configuração (`router.js`) e adicionar todas as suas rotas, manualmente, a ele. O Nuxt.js gera automaticamente as configurações do `vue-router` para você, com base nos arquivos Vue fornecidos dentro do diretório `pages`. Isso significa que você nunca mais precisará escrever uma configuração do roteador! O Nuxt.js também oferece code splitting automático para todas as suas rotas.

Em outras palavras, tudo que você precisa fazer para ter o roteamento em sua aplicação é criar arquivos `.vue` na pasta `pages`.

<base-alert type="next">

Saiba mais sobre [Roteamento](/docs/2.x/features/file-system-routing)

</base-alert>

## Navegação

Para navegar entre as páginas da sua aplicação, você deve utilizar o componente [NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component). Este componente está incluído com o Nuxt.js e, portanto, você não precisará importá-lo como faz com outros componentes. É semelhante à tag HTML `<a>`, exceto que em vez de usar um `href="/about"`, usamos `to="/about"`. Se você já usou o `vue-router` antes, pode pensar no `<NuxtLink>` como um substituto para o `<RouterLink>`.

Um link simples para a página `index.vue` em sua pasta `pages`:

```html{}[pages/index.vue]
<template>
  <NuxtLink to="/">Início</NuxtLink>
</template>
```

Para todos os links para páginas do seu site, use `<NuxtLink>`. Se você tiver links para outros sites, deve usar a tag `<a>`. Veja abaixo um exemplo:

```html{}[pages/index.vue]
<template>
  <main>
    <h1>Página inicial</h1>
    <NuxtLink to="/about">
      Sobre mim (link interno que pertence a aplicação Nuxt)
    </NuxtLink>
    <a href="https://nuxtjs.org">Link externo para outra página</a>
  </main>
</template>
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<base-alert type="next">

Saiba mais sobre o [componente NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

</base-alert>
