---
title: 'A propriedade vue.config'
description: Um objeto de configuração para Vue.config
menu: vue.config
category: configuration-glossary
position: 32
---

- Tipo: `Object`
- Padrão: `{ silent: !isDev, performance: isDev }`

> A propriedade vue.config fornece uma ponte de configuração direta para o `Vue.config`

**Example**

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

Essa configuração levará ao seguinte Vue.config:

```js
Vue.config.productionTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev [valor padrão]
Vue.config.performance // isDev [valor padrão]
```

Para saber mais sobre a API `Vue.config`, verifique a [documentação oficial do Vue](https://vuejs.org/v2/api/#Global-Config).
