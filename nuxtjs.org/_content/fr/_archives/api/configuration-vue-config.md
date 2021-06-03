---
title: 'API: La propriété vue.config'
description: Un objet de configuration pour Vue.config
menu: vue.config
category: configuration
position: 132
---

- Type: `Object`
- Par défaut: `{ silent: !isDev, performance: isDev }`

> La propriété vue.config fournit un pont de configuration direct pour `Vue.config`

**Exemple**

`nuxt.config.js`

```js
export default {
  vue: {
    config: {
      productionTip: true,
      devtools: false
    }
  }
}
```

Cette configuration conduira à Vue.config suivant:

```js
Vue.config.productionTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev [default value]
Vue.config.performance // isDev [default value]
```

Pour en savoir plus sur l'API `Vue.config`, consultez la [documentation officielle de Vue](https://vuejs.org/v2/api/#Global-Config)
