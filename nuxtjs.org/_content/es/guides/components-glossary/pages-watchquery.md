---
title: 'La propiedad watchQuery'
description: Observar los query strings y ejecutar métodos del componente cuando cambien (asyncData, fetch, validate, layout, ...)
menu: Propiedad WatchQuery
category: components-glossary
position: 0
---

> Observar los query strings y ejecutar métodos del componente cuando cambien (asyncData, fetch(context), validate, layout, ...)

- **Tipo:** `Boolean` o `Array` o `Function` (default: `[]`)

Utiliza `watchQuery` para configurar un watcher para las query strings. Si las strings definidas cambian, se llamará a todos los métodos del componente (asyncData, fetch(context), validate, layout, ...). Este seguimiento está desactivado por defecto para mejorar el rendimiento.

Si quieres configurar un watcher para todas las strings, asigna el valor `watchQuery: true`.

```js
export default {
  watchQuery: ['page']
}
```

También puedes utilizar la función `watchQuery(newQuery, oldQuery)` para tener watchers más refinados.

```js
export default {
  watchQuery(newQuery, oldQuery) {
    // Solo ejecuta los métodos del componente si la query string antigua contenía `bar`
    // y la nueva query string contiene `foo`
    return newQuery.foo && oldQuery.bar
  }
}
```

<base-alert>

**Advertencia**: El nuevo hook `fetch` introducido en la versión 2.12 no se ve afectado por `watchQuery`. Para más información ver [escuchando cambios en query strings](/docs/2.x/features/data-fetching#the-fetch-hook).

</base-alert>
