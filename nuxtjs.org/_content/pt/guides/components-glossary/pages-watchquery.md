---
title: 'A propriedade watchQuery'
description: Observe as strings de consulta e execute métodos de componente a cada alteração (asyncData, fetch, validate, layout, ...)
menu: WatchQuery Property
category: components-glossary
position: 0
---

> Observe as strings de consulta e execute métodos de componente a cada alteração (asyncData, fetch(contexto), validate, layout, ...)

- **Tipo:** `Boolean` ou `Array` ou `Function` (padrão: `[]`)

Use a propriedade `watchQuery` para configurar um observador para strings de consulta. Se as strings definidas mudarem, todos os métodos do componente (asyncData, fetch(context), validate, layout, ...) serão chamados. O observador é desabilitado por padrão para melhorar o desempenho.

Se você deseja configurar um observador para todas as strings de consulta, defina `watchQuery: true`.

```js
export default {
  watchQuery: ['page']
}
```

Você também pode usar a função `watchQuery(newQuery, oldQuery)` para ter observadores mais refinados.

```js
export default {
  watchQuery(newQuery, oldQuery) {
    // Só executa métodos de componente se a string de consulta antiga continha `bar`
    // e a nova string de consulta contém `foo`
    return newQuery.foo && oldQuery.bar
  }
}
```

<base-alert>

**Aviso**: O novo hook `fetch`, introduzido em 2.12, não é afetado por `watchQuery`. Para obter mais informações, consulte [ouvindo as alterações da string de consulta](/docs/2.x/features/data-fetching#the-fetch-hook).

</base-alert>
