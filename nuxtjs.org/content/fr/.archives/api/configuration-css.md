---
title: 'API : La propriété css'
description: Nuxt.js vous permet de définir le fichier, la bibliothèque ou le module CSS que vous souhaiter définir globalement (inclue sur toutes les pages).
menu: css
category: configuration
position: 104
---

> Nuxt.js vous permet de définir le fichier, la bibliothèque ou le module CSS que vous souhaitez définir globalement (inclue sur toutes les pages).

Dans le cas où vous souhaiteriez utiliser `sass`, assurez-vous d'avoir installé les packages `sass` et `sass-loader`. Si non, utilisez cette commande :

```sh
npm install --save-dev sass sass-loader fibers
```

- Type : `Array`
- Éléments : `string`

Dans `nuxt.config.js`, ajouter les ressources CSS :

```js
export default {
  css: [
    // Charge un module Node.js directement (ici un fichier Sass)
    'bulma',
    // fichier CSS dans le projet
    '@/assets/css/main.css',
    // un fichier SCSS dans le projet
    '@/assets/css/main.scss'
  ]
}
```

Nuxt.js va automatiquement deviner le type de fichier grâce à son extension et utiliser l'adaptateur de préprocesseur approprié pour webpack. Vous devez toujours installer les adaptateurs requis si vous avez besoin de les utiliser.
