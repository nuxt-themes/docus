---
title: Renderizaçao no servidor
description: Renderizaçao no servidor (SSR), é a capacidade de uma aplicação contribuir exibindo a página da web no servidor em vez de renderizá-la no navegador.
position: 3
category: concepts
questions:
  - question: Qual tipo de servidor você precisa para Renderizaçao no servidor?
    answers:
      - Servidor PHP
      - Servidor JavaScript
      - Servidor Node.js
    correctAnswer: Servidor Node.js
  - question: O que você usa para estender e controlar o servidor?
    answers:
      - Middleware
      - ServerMiddleware
      - Não é possível controlar o servidor
    correctAnswer: ServerMiddleware
  - question: Você pode hospedar uma aplicação renderizada no servidor em um provedor de hospedagem serveless?
    answers:
      - true
      - false
    correctAnswer: false
  - question: Temos acesso ao documento no lado do servidor?
    answers:
      - Sim. Está sempre disponível
      - Não, o objeto pertence ao navegador e não está disponível no servidor
    correctAnswer: Não, o objeto pertence ao navegador e não está disponível no servidor
  - question: Quando sua página se torna interativa?
    answers:
      - Quando o navegador recebe o HTML renderizado do servidor
      - Quando a hidratação do Vue.js entra em ação
      - Quando o navegador envia a solicitação inicial
    correctAnswer: Quando a hidratação do Vue.js entra em ação
  - question: A navegação entre as páginas usando <NuxtLink> é feita no
    answers:
      - Lado do Cliente
      - Lado do Servidor
    correctAnswer: Lado do Cliente
  - question: Quais são as etapas corretas?
    answers:
      - navegador → servidor, servidor → navegador, navegador → navegador
      - servidor → navegador, navegador → servidor, servidor → servidor
      - navegador → servidor, servidor → navegador, navegador → servidor
    correctAnswer: navegador → servidor, servidor → navegador, navegador → navegador
---

Renderizaçao no servidor (SSR), é a capacidade de uma aplicação contribuir exibindo a página da web no servidor em vez de renderizá-la no navegador. O servidor envia uma página totalmente renderizada ao cliente; o pacote JavaScript do cliente assume o controle, permitindo que a aplicação Vue.js [seja hidratada](https://ssr.vuejs.org/guide/hydration.html).

## Servidor Node.js necessário

É necessário um ambiente JavaScript para renderizar sua página web.

Um servidor Node.js precisa ser configurado para executar seu aplicativo Vue.js.

## Estenda e controle o servidor

Você pode estender o servidor com serverMiddleware e controlar rotas com middleware.

```js{}[server-middleware/logger.js]
export default function (req, res, next) {
  console.log(req.url)
  next()
}
```

```js{}[nuxt.config.js]
export default: {
  serverMiddleware: ['~/server-middleware/logger']
}
```

Se o seu serverMiddleware consistir em uma lista de funções mapeadas para paths:

## Ambientes de Servidor vs Navegador

Por estar em um ambiente Node.js, você tem acesso a objetos Node.js, como `req` e `res`. Você não tem acesso aos objetos `window` ou `document`, pois eles pertencem ao ambiente do navegador. No entanto, você pode usar `window` ou `document` nos hooks `beforeMount` ou `mounted`.

```js
beforeMount{
  window.alert('olá');
}
mounted{
  window.alert('olá');
}
```

## Etapas de renderização no servidor com Nuxt.js

### Etapa 1: Navegador para Servidor

Quando um navegador envia a solicitação inicial, ele atinge o servidor interno do Node.js. O Nuxt.js irá gerar o HTML e enviá-lo de volta ao navegador com os resultados das funções executadas, por exemplo, `asyncData`,`nuxtServerInit` ou `fetch`. As funções de hook também serão executadas.

### Etapa 2: Servidor para Navegador

O navegador recebe a página renderizada do servidor com o HTML gerado. O conteúdo é exibido e a hidratação do Vue.js entra em ação, tornando-o reativo. Após este processo, a página é interativa.

### Etapa 3: Navegador para Navegador

A navegação entre as páginas com [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) é feita no lado do cliente para que você não acesse o servidor novamente, a menos que você atualize o navegador.

<quiz :questions="questions"></quiz>
