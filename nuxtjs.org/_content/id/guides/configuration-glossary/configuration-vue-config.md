---
title: 'Properti vue.config'
description: Sebuah objek konfigurasi untuk Vue.config
menu: vue.config
category: configuration-glossary
position: 32
---

- Tipe: `Object`
- Nilai anggapan: `{ silent: !isDev, performance: isDev }`

> Properti vue.config menjembatani konfigurasi dengan `Vue.config` secara langsung.

**Contoh**

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

Konfigurasi tersebut akan menghasilkan Vue.config seperti berikut:

```js
Vue.config.productionTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev [nilai anggapan]
Vue.config.performance // isDev [nilai anggapan]
```

To learn more about the `Vue.config` API, check out the [official Vue documentation](https://vuejs.org/v2/api/#Global-Config)
