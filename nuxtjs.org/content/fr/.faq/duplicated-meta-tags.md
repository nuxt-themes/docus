---
title: Balises meta dupliquées
description: Balises meta dupliquées avec Nuxt.js ?
category: development
position: 204
---

Il s'agit d'une « fonctionnalité » de [vue-meta](https://github.com/nuxt/vue-meta), merci de lire la [documentation des éléments d'entête](/docs/2.x/concepts/views#html-head).

<div class="Alert">

Afin d'éviter toute duplication lors de l'utilisation d'un composant enfant, donnez un identifiant unique à l'aide de la clé <code>hid</code>. [En savoir plus](https://vue-meta.nuxtjs.org/api/#tagidkeyname).

</div>

Pour la meta description, vous devez ajouter un identifiant unique `hid` afin que vue-meta sache qu'il doit remplacer la balise par défaut.

Votre `nuxt.config.js` :

```js
...head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'keyword 1, keyword 2'},
      { hid: 'description', name: 'description', content: 'This is the generic description.'}
    ],
  },
...
```

Dans votre page individuelle :

```js
export default {
  head() {
    return {
      title: `Page 1 (${this.name}-side)`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Page 1 description'
        }
      ]
    }
  }
}
```

Pour apprendre à utiliser la propriété `head` dans vos pages, consultez la documentation [d'entête HTML](/docs/2.x/concepts/views#html-head).
