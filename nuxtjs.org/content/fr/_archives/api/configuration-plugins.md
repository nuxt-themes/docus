---
title: 'API: La propriété plugins'
description: Utilisez les plugins vue.js avec l'option plugins de Nuxt.js.
menu: plugins
category: configuration
position: 121
---

**Remarque**: Depuis Nuxt.js 2.4, `mode` a été introduit comme option de `plugins` pour spécifier le type de plugin, les valeurs possibles sont: `client` ou `server`. `ssr: false` sera adapté à `mode: 'client'` et déconseillé dans la prochaine version majeure.

- Type: `Array`
  - Éléments: `String` ou `Object`

Si l'élément est un objet, les propriétés sont:

- src: `String` (chemin du fichier)
- mode: `String` (peut être `client` ou `server`) _S'il est défini, le fichier sera inclus uniquement du côté respectif (client ou serveur)._

**Remarque**: Ancienne version

- Type: `Array`
  - Éléments: `String` ou `Object`

Si l'élément est un objet, les propriétés sont:

- src: `String` (chemin du fichier)
- ssr: `Boolean` (`true` par défaut) _Si faux, le fichier sera inclus uniquement du côté client._

> La propriété plugins vous permet d'ajouter facilement des plugins vue.js à votre application principale.

Exemple (`nuxt.config.js`):

```js
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

Exemple de framework UI (`nuxt.config.js`):

```js
export default {
  plugins: ['@/plugins/ant-design-vue']
}
```

Il s'agit d'un fichier dans `plugins/ant-design-vue.js`:

```js
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // Docs Ant Design

Vue.use(Antd)
```

Remarquez que le css a été [importé selon la documentation Ant Design](https://vue.ant.design/docs/vue/getting-started/#3.-Use-antd's-Components 'Astuce externe pertinente pour la création de plugins')

Tous les chemins définis dans la propriété `plugins` seront **importés** avant d'initialiser l'application principale.

## Quand utiliser des plugins?

Chaque fois que vous devez utiliser `Vue.use()`, vous devez créer un fichier dans `plugins/` et ajouter son chemin vers `plugins` dans `nuxt.config.js`.

Pour en savoir plus sur l'utilisation des plugins, consultez la [documentation du guide](/guide/plugins#vue-plugins).
