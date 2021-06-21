---
title: 'La Propriété head'
description: Nuxt.js vous permet de définir toutes les métadonnées par défaut pour votre application dans le fichier nuxt.config.js.
menu: head
category: configuration-glossary
position: 12
---

> Nuxt.js vous permet de définir toutes les métadonnées par défaut pour votre application dans le fichier nuxt.config.js.

- Type: `Object` or `Function`

```js{}[nuxt.config.js]
export default {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

Pour connaître la liste des options que vous pouvez donner à `head`, consultez la documentation [vue-meta](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

Vous pouvez également utiliser `head` comme fonction dans vos composants pour accéder aux données des composants avec `this` ([en savoir plus](/docs/2.x/components-glossary/pages-head)).

<base-alert type="info">

<b>Info :</b> Pour éviter la duplication des métadonnées dans le composant enfant, configurez un identifiant unique avec la clé `hid` pour vos balises méta ([en savoir plus](https://vue-meta.nuxtjs.org/api/#tagidkeyname)).

</base-alert>
