---
title: 'La propiedad ssr'
description: Cambia el valor por defecto de ssr de nuxt
menu: ssr
category: configuration-glossary
position: 28.1
---

- Tipo: `boolean`
  - Por defecto: `true`
  - Posibles valores:
    - `false`: No hay renderizado del lado del servidor (solo navegación del lado del cliente)

> Debes configurar esta opción cuando trabajas con single page applications

```js{}[nuxt.config.js]
export default {
  ssr: false // para SPAs
}
```

<base-alert type="next">

Anteriormente, `mode` se utilizaba para desactivar o activar el renderizado server-side. Aquí está la [documentación de `mode`](/docs/2.x/configuration-glossary/configuration-mode).

</base-alert>
