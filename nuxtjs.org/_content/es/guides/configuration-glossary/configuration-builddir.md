---
title: 'La propiedad buildDir'
description: Defina el directorio dist para su aplicación Nuxt.js
menu: buildDir
category: configuration-glossary
position: 2
---

- Tipo: `String`
- Por defecto: `.nuxt`

> Defina el directorio dist para su aplicación Nuxt.js

```js{}[nuxt.config.js]
export default {
  buildDir: 'nuxt-dist'
}
```

De forma predeterminada, muchas herramientas asumen que `.nuxt` es un directorio oculto, porque su nombre comienza con un punto. Puede utilizar esta opción para evitarlo.
