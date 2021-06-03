---
title: 'O método validate'
description: Nuxt.js permite definir um método validador dentro de seu componente de rota dinâmica.
menu: Validate Method
category: components-glossary
position: 0
---

> Nuxt.js permite definir um método validador dentro de seu componente de rota dinâmica.

- **Tipo:** `Function` ou `Async Function`

`validate` é sempre chamado antes de navegar para uma nova rota. Será chamado do lado do servidor uma vez (na primeira requisição da aplicação Nuxt) e do lado do cliente ao navegar para outras rotas. Este método usa o objeto [`contexto`](/docs/2.x/internals-glossary/context) como argumento.

```js
validate({ params, query, store }) {
  return true // se os parâmetros são válidos
  return false // irá parar o Nuxt.js para renderizar a rota e exibir a página de erro
}
```

```js
async validate({ params, query, store }) {
  // aguarda operações
  return true // se os parâmetros são válidos
  return false // irá parar o Nuxt.js para renderizar a rota e exibir a página de erro
}
```

Você também pode retornar promises:

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
}
```

O Nuxt.js permite definir o método validate dentro do seu componente de rota dinâmica (neste exemplo: `pages/users/_id.vue`).

Se o método validate não retornar `true`, o Nuxt.js carregará automaticamente a página de erro 404.

```js
export default {
  validate({ params }) {
    // Deve ser um número
    return /^\d+$/.test(params.id)
  }
}
```

Você também pode verificar alguns dados em sua [store](/docs/2.x/directory-structure/store), por exemplo (preenchido pelo [`nuxtServerInit`](/docs/2.x/directory-structure/store#the-nuxtserverinit-action) antes da action):

```js
export default {
  validate({ params, store }) {
    // Verifique se `params.id` é uma categoria existente
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

Você também pode lançar erros esperados ou inesperados durante a execução da função validate:

```js
export default {
  async validate({ params, store }) {
    // Lança um erro de servidor interno 500 com mensagem personalizada
    throw new Error('Under Construction!')
  }
}
```
