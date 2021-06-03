---
title: 'nuxt.renderRoute(route, context)'
description: Renderize uma rota específica com um determinado contexto.
menu: renderRoute
category: internals-glossary
position: 11
---

- Tipo: `Function`
- Argumentos:
  1. `String`: rota para renderizar
  2. _Opcional_, `Object`, contexto dado, propriedades disponíveis: `req` & `res`
- Retorna: `Promise`
  - `html`: `String`
  - `error`: `null` ou `Object`
  - `redirected`: `false` ou `Object`

> Renderize uma rota específica com um determinado contexto.

Este método deve ser usado principalmente para fins de teste, bem como com [`nuxt.renderAndGetWindow`](/docs/2.x/internals-glossary/nuxt-render-and-get-window).

<base-alert>

`nuxt.renderRoute` deve ser executado após o processo de build, no modo de produção.

</base-alert>

```js
const { loadNuxt, build } = require('nuxt')

async function start() {
  // Obter instância nuxt para iniciar (modo de produção)
  // Certifique-se de ter executado `nuxt build` antes de executar este script
  const nuxt = await loadNuxt({ for: 'start' })

  const { html, error, redirected } = await nuxt.renderRoute('/')

  // `html` sempre será uma string

  // `error` !== null quando o layout de erro é exibido, o formato do erro é:
  // { statusCode: 500, message: 'Minha mensagem de erro' }

  // `redirected` não é` false` quando `redirect()` foi usado em `asyncData()` ou `fetch()`
  // { path: '/outra-rota', query: {}, status: 302 }
}

start()
```

### O que vem em seguida

<base-alert type="next">

Confira o [livro Glossário de Componentes](/docs/2.x/components-glossary/pages-fetch)

</base-alert>
