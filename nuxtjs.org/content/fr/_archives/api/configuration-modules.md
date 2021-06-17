---
title: 'API: La propriété modules'
description: Les modules sont des extensions Nuxt.js qui peuvent étendre ses fonctionnalités de base et ajouter des intégrations sans fin.
menu: modules
category: configuration
position: 119
---

- Type: `Array`

> Les modules sont des extensions Nuxt.js qui peuvent étendre ses fonctionnalités de base et ajouter des intégrations sans fin. [En savoir plus](/guide/modules)

Exemple (`nuxt.config.js`):

```js
export default {
  modules: [
    // Utilisation du nom du package
    '@nuxtjs/axios',

    // Par rapport à votre projet srcDir
    '~/modules/awesome.js',

    // Offrir des options
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // Définition en ligne
    function () {}
  ]
}
```

Les développeurs de modules fournissent généralement les étapes et les détails supplémentaires nécessaires à l'utilisation.

Nuxt.js essaie de résoudre chaque élément du tableau de modules en utilisant le chemin de nœud requis (dans le `node_modules`), puis sera résolu à partir du projet `srcDir` si l'alias `~` est utilisé. Les modules sont exécutés séquentiellement, donc l'ordre est important.

Les modules doivent exporter une fonction pour améliorer la construction/exécution de Nuxt et éventuellement renvoyer une promesse jusqu'à ce que leur travail soit terminé. Notez qu'ils sont requis au moment de l'exécution et doivent donc déjà être transpilés si cela dépend des fonctionnalités ES6 modernes.

Veuillez consulter le [Guide des modules](/guide/modules) pour plus d'informations sur leur fonctionnement ou si vous êtes intéressé par le développement de votre propre module. Nous avons également fourni une section officielle [Modules](https://github.com/nuxt-community/awesome-nuxt#modules) répertoriant des dizaines de modules prêts à la production fabriqués par la communauté Nuxt.

## `buildModules`

<div class="Alert Alert--info">

Cette fonctionnalité est disponible depuis Nuxt v2.9

</div>

Certains modules ne sont nécessaires que pendant le développement et la construction. L'utilisation de `buildModules` permet d'accélérer le démarrage de la production et également de réduire considérablement la taille de `node_modules` pour les déploiements de production. Veuillez vous référer à la documentation de chaque module pour voir s'il est recommandé d'utiliser `modules` ou `buildModules`.

La différence d'utilisation est:

- Au lieu d'ajouter à `modules` dans`nuxt.config.js`, utilisez `buildModules`
- Au lieu d'ajouter à `dependencies` dans `package.json`, utilisez `devDependencies` (`yarn add --dev` ou `npm install --save-dev`)
