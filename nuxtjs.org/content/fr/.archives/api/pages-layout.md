---
title: 'API : la propriété layout'
description: Chaque fichier (premier niveau) dans le répertoire `layouts` créera un layout personnalisé accessible avec la propriété layout dans le composant page.
menu: layout
category: pages
position: 25
---

> Chaque fichier (premier niveau) dans le répertoire `layouts` créera une mise en page personnalisée accessible avec la propriété `layout` dans le composant de page.

- **Type :** `String` ou `Function` (par défaut : `'default'`)

Utilisez la clé `layout` dans vos composants de page pour définir la mise en page à utiliser :

```js
export default {
  layout: 'blog',
  // OU
  layout(context) {
    return 'blog'
  }
}
```

Dans cet exemple, Nuxt.js inclura le fichier `layouts/blog.vue` comme mise en page pour ce composant de page.

Voyez cela en action dans [cette vidéo de démonstration](https://www.youtube.com/watch?v=YOKnSTp7d38).

Afin de comprendre comment les mises en page fonctionnent avec Nuxt.js, regardez la documentation sur les [Mises en page](/guide/views#mises-en-page).
