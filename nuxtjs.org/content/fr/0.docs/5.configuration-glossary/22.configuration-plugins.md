---
title: 'API: La propriété plugins'
description: 'Use vue.js plugins with the plugins option of Nuxt.js.'
menu: plugins
category: configuration-glossary
position: 21
---

**Note**: Depuis Nuxt.js v2.4, `mode` est disponible en tant qu'option pour les `plugins` afin de spécifier leur type, les valeurs possibles sont: `client` ou `server`. `ssr: false` sera transformé en `mode: 'client'` et déprécié dans la prochaine mise à jour majeure.

- Type: `Array`
  - Items: `String` ou `Object`

Si l'élément est un objet, les propriétés sont:

- src: `String` (le chemin du fichier)
- mode: `String` (`client` ou `server`) _Si défini, le fichier sera inclus seulement du côté (client ou serveur)._

**Note**: Ancienne version

- Type: `Array`
  - Items: `String` ou `Object`

Si l'élément est un objet, les propriétés sont:

- src: `String` (le chemin du fichier)
- ssr: `Boolean` (par défaut à `true`) _Si faux, le fichier sera inclus seulement du côté client._

> La propriété `plugins` nous permet d'ajouter des plugins Vue.js à notre application principale.

```js{}[nuxt.config.js]
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

```js{}[nuxt.config.js]
export default {
  plugins: ['@/plugins/ant-design-vue']
}
```

```js{}[plugins/ant-design-vue.js]
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // comme indiqué dans la documentation d'Ant Design

Vue.use(Antd)
```

À noter que le CSS a été importé selon la documentation de [Ant Design](https://www.antdv.com/docs/vue/getting-started/#3.-Use-antd's-Components).

Tous les chemins définis dans la propriété `plugins` seront **importés** avant l'initialisation de l'application principale.
