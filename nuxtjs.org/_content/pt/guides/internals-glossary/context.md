---
title: 'O Contexto'
description: O `contexto` fornece objetos/parâmetros adicionais do Nuxt que não estão, tradicionalmente, disponíveis para os componentes Vue. O `contexto` está disponível em áreas especiais do ciclo de vida do nuxt como `asyncData`, `plugins`, `middlewares`, `módulos` e `store/nuxtServerInit`.
menu: The Context
category: internals-glossary
position: 1
---

O `contexto` fornece objetos/parâmetros adicionais do Nuxt que não estão, tradicionalmente, disponíveis para os componentes Vue. O `contexto` está disponível em áreas especiais do ciclo de vida do nuxt como [`asyncData`](/docs/2.x/features/data-fetching#async-data), [`fetch`](/docs/2.x/features/data-fetching), [`plugins`](/docs/2.x/directory-structure/plugins), [`middleware`](/docs/2.x/directory-structure/middleware#router-middleware) e [`nuxtServerInit`](/docs/2.x/directory-structure/store#the-nuxtserverinit-action)

> _Nota: "O Contexto" ao qual nos referimos aqui não deve ser confundido com o objeto de `contexto` disponível nas [`Actions do Vuex`](https://vuex.vuejs.org/guide/actions.html). Os dois não estão relacionados._

```js
function (contexto) {
  // Propriedades Universais
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
  // No lado do servidor
  if (process.server) {
    const { req, res, beforeNuxtRender } = contexto
  }
  // No lado do cliente
  if (process.client) {
    const { from, nuxtState } = contexto
  }
}
```

## Propriedades Universais

Essas propriedades estão disponíveis no lado do cliente e no lado do servidor.

### app

`app` (_Opções do Nuxt App_)

As opções da instância raiz do Vue que incluem todos os seus plugins. Por exemplo, ao usar `i18n`, você pode obter acesso o `$i18n` através de `context.app.i18n`.

### store

`store` ([_Store do Vuex_](https://vuex.vuejs.org/api/#vuex-store-instance-properties))

Instância da Store do Vuex. **Disponível apenas se a [store do vuex](/docs/2.x/directory-structure/store) estiver definido**.

### route

`route` ([_Rota do Vue Router_](https://router.vuejs.org/api/#the-route-object))

Instância de rota do Vue Router.

### params

`params` (_Objeto_)

Alias do `route.params`.

### query

`query` (_Object_)

Alias do `route.query`.

### env

`env` (_Object_)

Variáveis ​​de ambiente definidas em `nuxt.config.js`, consulte a [api env](/docs/2.x/configuration-glossary/configuration-env).

### IsDev

`isDev` (_Boolean_)

Booleano para que você saiba se está no modo dev, pode ser útil para armazenar alguns dados em produção.

### isHMR

`isHMR` (_Boolean_)

Booleano para que você saiba se o método/middleware é chamado a partir da substituição do módulo ativo -- hot module replacement -- do webpack (_verdadeiro apenas no lado do cliente, no modo dev_).

### redirect

`redirect` (_Function_)

Use este método para redirecionar o usuário para outra rota, o código de status é usado no lado do servidor, o padrão é `302`. `redirect([status,] path [, query])`.

### error

`error` (_Function_)

Use este método para mostrar a página de erro: `error(params)`. Os `params` devem ter as propriedades `statusCode` e `message`.

### \$config

`$config` (_Object_)

Essa é a [configuração do tempo de execução (runtime config)](/docs/2.x/configuration-glossary/configuration-runtime-config).

## Propriedades do lado do servidor

Essas propriedades estão disponíveis apenas no lado do servidor.

### req

`req` ([_http.Request_](https://nodejs.org/api/http.html#http_class_http_incomingmessage))

Requisição do servidor Node.js. Se o Nuxt for usado como um middleware, o objeto de requisição pode ser diferente dependendo da estrutura que você está usando. <br>**Não está disponível via `nuxt generate`**.

### Res

`res` ([_http.Response_](https://nodejs.org/api/http.html#http_class_http_serverresponse))

Resposta do servidor Node.js. Se o Nuxt for usado como um middleware, o objeto de resposta pode ser diferente dependendo da estrutura que você está usando. <br>**Não está disponível via `nuxt generate`**.

### beforeNuxtRender

`beforeNuxtRender(fn)` (_Function_)

Use este método para atualizar a variável `__NUXT__` renderizada no lado do cliente, o `fn` (pode ser assíncrono) é chamado com `{ Componentes, nuxtState }`, veja esse [exemplo](https://github.com/nuxt/nuxt.js/blob/cf6b0df45f678c5ac35535d49710c606ab34787d/test/fixtures/basic/pages/special-state.vue).

## Propriedade do lado do cliente

Essas propriedades estão disponíveis apenas no lado do cliente.

### from

`from` ([_Rota do Vue Router_](https://router.vuejs.org/api/#the-route-object))

A rota de onde foi navegado.

### nuxtState

`nuxtState` _(Object)_

Útil para plugins que usam `beforeNuxtRender` para obter o nuxtState no lado do cliente antes da hidratação. **Disponível apenas no modo `universal`**.
