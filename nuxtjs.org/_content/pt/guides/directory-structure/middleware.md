---
title: middleware
description: O diretório `middleware` contém o middleware da sua aplicação. Middleware permite definir funções personalizadas que podem ser executadas antes de renderizar uma página ou um grupo de páginas (layout).
position: 8
category: directory-structure
csb_link_anonymous: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_anonymous?fontsize=14&hidenavigation=1&theme=dark
csb_link_named: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_named?fontsize=14&hidenavigation=1&theme=dark
csb_link_router: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_router?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Middleware permite definir funções que executam
    answers:
      - antes de renderizar uma página
      - durante a renderização uma página
      - depois de renderizar uma página
    correctAnswer: antes de renderizar uma página
  - question: Em qual diretório você coloca o middleware compartilhado?
    answers:
      - middleware
      - shared-middleware
      - shared
    correctAnswer: middleware
  - question: Qual argumento o middleware recebe como primeiro argumento?
    answers:
      - req
      - res
      - context
    correctAnswer:
  - question: No modo universal, quando o middleware é chamado?
    answers:
      - lado do servidor na primeira requisição e lado do servidor ao navegar
      - lado do cliente na primeira requisição e lado do cliente ao navegar
      - lado do servidor na primeira requisição e lado do cliente ao navegar
    correctAnswer: lado do servidor na primeira requisição e lado do cliente ao navegar
  - question: No modo SPA, quando o middleware é chamado?
    answers:
      - lado do servidor na primeira requisição e lado do servidor ao navegar
      - lado do cliente na primeira requisição e lado do cliente ao navegar
      - lado do servidor na primeira requisição e lado do cliente ao navegar
    correctAnswer: lado do cliente na primeira requisição e lado do cliente ao navegar
  - question: O middleware é executado em que ordem?
    answers:
      - páginas correspondentes ⇒ layouts correspondentes ⇒ nuxt.config.js
      - nuxt.config.js ⇒ layouts correspondentes ⇒ páginas correspondentes
      - layouts correspondentes ⇒ páginas correspondentes ⇒ nuxt.config.js
    correctAnswer: nuxt.config.js ⇒ layouts correspondentes ⇒ páginas correspondentes
  - question: Que propriedade usamos para adicionar seu middleware a cada rota?
    answers:
      - middleware.router
      - router.middleware
      - routes.middleware
    correctAnswer: router.middleware
  - question: Você pode adicionar vários middleware a uma página ou layout específico?
    answers:
      - true
      - false
    correctAnswer: true
  - question: Como você adiciona este middleware nomeado (`middleware/authenticated.js`) à sua página?
    answers:
      - 'middleware: authenticated'
      - 'middleware: true'
      - "middleware: 'authenticated'"
    correctAnswer: "middleware: 'authenticated'"
  - question: Como você usa middleware anônimo, middleware apenas em uma página específica?
    answers:
      - crie um middleware nomeado e salve-o no diretório de middleware
      - crie uma função `middleware` para ele no componente de página
      - adicione um arquivo _.vue ao diretório de middleware
    correctAnswer: crie uma função `middleware` para ele no componente de página
---

O diretório `middleware` contém o middleware da sua aplicação. Middleware permite definir funções personalizadas que podem ser executadas antes de renderizar uma página ou um grupo de páginas (layout).

Um middleware compartilhado deve ser colocado no diretório `middleware/`. O nome do arquivo será o nome do middleware (`middleware/auth.js` será o middleware `auth`). Você também pode definir um middleware específico da página usando diretamente uma função, consulte [middleware anônimo](/docs/2.x/components-glossary/pages-middleware#anonymous-middleware).

Um middleware recebe [o contexto](/docs/2.x/internals-glossary/context) como primeiro argumento.

```js{}[middleware/user-agent.js]
export default function (context) {
  // Adicione a propriedade userAgent ao contexto
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

No modo universal, os middlewares serão chamados uma vez no lado do servidor (na primeira requisição a aplicação Nuxt, por exemplo, ao acessar diretamente a aplicação ou atualizar a página) e no lado do cliente ao navegar para outras rotas. No modo SPA, os middlewares serão chamados no lado do cliente em ambas as situações.

O middleware será executado, em série, nesta ordem:

1. `nuxt.config.js` (na ordem dentro do arquivo)
2. Layouts correspondentes
3. Páginas correspondentes

## Middleware do Router

Um middleware pode ser assíncrono. Para fazer isso, retorne uma `Promise` ou use async/await.

```js{}[middleware/stats.js]
import http from 'http'

export default function ({ route }) {
  return http.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Então, em seu `nuxt.config.js`, use a propriedade `router.middleware`.

```js{}[nuxt.config.js]
export default {
  router: {
    middleware: 'stats'
  }
}
```

Agora o middleware `stats` será chamado para cada alteração de rota.

Você também pode adicionar seu middleware (mesmo vários) a um layout ou página específica.

```js{}[pages/index.vue / layouts/default.vue]
export default {
  middleware: ['auth', 'stats']
}
```

<app-modal>
  <code-sandbox  :src="csb_link_router"></code-sandbox>
</app-modal>

## Middleware nomeado

Você pode criar um middleware nomeado criando um arquivo dentro do diretório `middleware/`, o nome do arquivo será o nome do middleware.

```js{}[middleware/authenticated.js]
export default function ({ store, redirect }) {
  // Se o usuário não estiver autenticado
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>Página Secreta</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

<app-modal>
  <code-sandbox  :src="csb_link_named"></code-sandbox>
</app-modal>

## Middleware anônimo

Se você precisar usar um middleware em uma página específica, poderá passar diretamente uma função para ele (ou um array de funções):

```html{}[pages/secret.vue]
<template>
  <h1>Página Secreta</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // Se o usuário não estiver autenticado
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```

<app-modal>
  <code-sandbox  :src="csb_link_anonymous"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
