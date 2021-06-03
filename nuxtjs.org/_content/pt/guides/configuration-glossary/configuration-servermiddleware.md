---
title: 'A propriedade serverMiddleware'
description: Define o middleware do lado do servidor.
menu: serverMiddleware
category: configuration-glossary
position: 27
---

- Tipo: `Array`
  - Itens: `String` ou `Object` ou `Function`

O Nuxt cria internamente uma instância do [connect](https://github.com/senchalabs/connect) à qual você pode adicionar seu próprio middleware personalizado. Isso nos permite registrar rotas adicionais (normalmente rotas `/api`) **sem a necessidade de um servidor externo**.

Como o próprio connect é um middleware, o middleware registrado funcionará com `nuxt start` e também quando usado como um middleware com usos programáticos como [express-template](https://github.com/nuxt-community/express-template). Os [Módulos](/docs/2.x/directory-structure/modules) Nuxt também pode fornecer `serverMiddleware` usando [this.addServerMiddleware()](/docs/2.x/internals-glossary/internals-module-container#addservermiddleware-middleware).

Além deles, introduzimos uma opção `prefix` cujo padrão é `true`. Ele adicionará a base do roteador aos middlewares do seu servidor.

**Exemplo:**

- Caminho do server middleware: `/server-middleware`
- Base do Router: `/admin`
- Com `prefix: true` (padrão): `/admin/server-middleware`
- Com `prefix: false`: `/server-middleware`

## serverMiddleware vs middleware!

Não confunda com [rotas de middleware](/docs/2.x/features/file-system-routing#middleware) que são chamados pelo Vue antes de cada rota no lado do cliente ou SSR. O middleware listado na propriedade `serverMiddleware` roda no lado do servidor **antes do** `vue-server-renderer` e pode ser usado para tarefas específicas do servidor, como lidar com requisições de API ou servir assets.

## Uso

Se o middleware for String, o Nuxt.js tentará resolvê-lo automaticamente e solicitá-lo.

```js{}[nuxt.config.js]
import serveStatic from 'serve-static'

export default {
  serverMiddleware: [
    // Registrará o pacote npm redirect-ssl
    'redirect-ssl',

    // Registrará o arquivo do diretório da API do projeto para manipular as solicitações /api/*
    { path: '/server-middleware', handler: '~/server-middleware/index.js' },

    // Também podemos criar instâncias personalizadas
    { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ]
}
```

<base-alert type="warn">

Se você não quiser que o middleware se registre para todas as rotas, você deve usar o formulário de objeto com caminho específico, caso contrário, o handler padrão do nuxt não funcionará!

</base-alert>

## Middleware de servidor personalizado

Também é possível criar um middleware customizado. Para obter mais informações, consulte a [documentação do Connect](https://github.com/senchalabs/connect#appusefn).

Middleware (`server-middleware/logger.js`):

```js{}[server-middleware/logger.js]
export default function (req, res, next) {
  // req é o objeto de requisiçao http Node.js
  console.log(req.url)

  // res é o objeto de resposta http do Node.js

  // next é uma função a ser chamada para invocar o próximo middleware
  // Não se esqueça de chamar next no final se seu middleware não for um endpoint!
  next()
}
```

```js{}[nuxt.config.js]
serverMiddleware: ['~/server-middleware/logger']
```

## Sintaxe de Objeto

Se o middleware de seu servidor consiste em uma lista de funções mapeadas para caminhos:

```js
export default {
  serverMiddleware: [
    { path: '/a', handler: '~/server-middleware/a.js' },
    { path: '/b', handler: '~/server-middleware/b.js' },
    { path: '/c', handler: '~/server-middleware/c.js' }
  ]
}
```

Você pode alternativamente passar um objeto para defini-los, da seguinte maneira:

```js
export default {
  serverMiddleware: {
    '/a': '~/server-middleware/a.js',
    '/b': '~/server-middleware/b.js',
    '/c': '~/server-middleware/c.js'
  }
}
```
