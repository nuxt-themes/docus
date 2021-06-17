---
title: "API: La propriété d'entête"
description: Nuxt.js vous permet de définir toutes les méta par défaut pour votre application dans nuxt.config.js.
menu: head
category: configuration
position: 112
---

> Nuxt.js vous permet de définir toutes les métas par défaut pour votre application dans `nuxt.config.js`, en utilisant la même propriété `head`

- Type: `Object` ou `Function`

Un example `nuxt.config.js`:

```js
export default {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid est utilisé comme identifiant unique. N'utilisez pas `vmid` car cela ne fonctionnera pas
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

Pour connaitre la liste des options que vous pouvez donner à `head`, jeter un coup d'œil à la [documentation vue-meta](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

Vous pouvez également utiliser `head` en tant que fonction dans vos composants pour accéder aux données des composants via `this` ([lire la suite](/api/pages-head)).

<div class="Alert Alert--teal">

<b>Info:</b> Pour éviter les balises métas dupliquées lorsqu'elles sont utilisées dans le composant enfant, configurez un identifiant unique avec la clé `hid` pour vos méta-éléments([lire la suite](https://vue-meta.nuxtjs.org/api/#tagidkeyname)).

</div>
