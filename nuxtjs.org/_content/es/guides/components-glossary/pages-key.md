---
title: 'La propiedad Key'
description: Defina la propiedad `key` del componente interno `<router-view>`
menu: Propiedad Key
category: components-glossary
position: 0
---

> Defina la propiedad `key` del componente interno `<router-view>`

- **Tipo:** `String` o `Function`

La propiedad `key` (clave) se propaga en `<router-view>`, lo cual es útil para realizar transiciones dentro de una página dinámica y una ruta diferente. Diferentes claves dan como resultado el renderizado de los componentes de la página.

Existen varias maneras de definir una clave. Para obtener más detalles, por favor consulte la propiedad `nuxtChildKey` en [el componente nuxt](/docs/2.x/features/nuxt-components).

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
