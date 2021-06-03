---
title: 'La propiedad vue.config'
description: Un objeto de configuración para Vue.config
menu: vue.config
category: configuration-glossary
position: 32
---

- Tipo: `Object`
- Por defecto: `{ silent: !isDev, performance: isDev }`

> La propiedad vue.config ofrece un puente directo de configuración para `Vue.config`.

**Ejemplo**

```js{}[nuxt.config.js]
export default {
  vue: {
    config: {
      productionTip: true,
      devtools: false
    }
  }
}
```

Esta configuración resulta en el siguiente Vue.config:

```js
Vue.config.productionTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev [valor por defecto]
Vue.config.performance // isDev [valor por defecto]
```

Para saber más sobre la API de `Vue.config`, visita la [documentación oficial de Vue](https://vuejs.org/v2/api/#Global-Config)
