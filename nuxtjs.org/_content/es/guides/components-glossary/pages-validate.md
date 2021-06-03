---
title: 'El método validate'
description: Nuxt.js te permite definir un método de validación dentro del componente de ruta dinámico.
menu: Método validate
category: components-glossary
position: 0
---

> Nuxt.js te permite definir un método de validación dentro del componente de ruta dinámico.

- **Tipo:** `Function` or `Async Function`

Se llama a `validate` cada vez que se navega a una nueva ruta. Se llamará del lado del servidor una vez (en la primera solicitud a la aplicación Nuxt) y del lado del cliente cuando se navegue a otras rutas. Este método toma el objeto [`context`](/docs/2.x/internals-glossary/context) como argumento.

```js
validate({ params, query, store }) {
  return true // Si el parametro es valido
  return false // Detendrá Nuxt.js para cargar la página de error
}
```

```js
async validate({ params, query, store }) {
  // operaciones await
  return true // Si el parametro es valido
  return false // Detendrá Nuxt.js para cargar la página de error
}
```

También puedes devolver promesas:

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
}
```

Nuxt.js le permite definir un método de validación dentro de las rutas dinámicas de tu componente (en este ejemplo: `pages / users / _id.vue`).

Si el método de validación no devuelve `true`, Nuxt.js cargará automáticamente la página de error 404.

```js
export default {
  validate({ params }) {
    // Debe ser un número
    return /^\d+$/.test(params.id)
  }
}
```

También puede verificar algunos datos en su [store](/docs/2.x/directory-structure/store) por ejemplo (cargado en [`nuxtServerInit`] (/docs/2.x/directory-structure/store#the-nuxtserverinit-action) antes de la acción) :

```js
export default {
  validate({ params, store }) {
    // Comprueba si `params.id` es una categoría existente
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

También puede generar errores esperados o inesperados durante la ejecución de la función de validación:

```js
export default {
  async validate({ params, store }) {
    // Lanza un error de servidor interno 500 con un mensaje personalizado
    throw new Error('Under Construction!')
  }
}
```
