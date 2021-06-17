---
title: La propriété modules
description: Les modules sont des extensions Nuxt.js qui peuvent personnaliser les fonctionnalités principales et ajouter des intégrations sans fin.
menu: modules
category: configuration-glossary
position: 19
---

- Type: `Array`

> Les modules sont des extensions Nuxt.js qui peuvent personnaliser les fonctionnalités principales et ajouter des intégrations sans fin. [En apprendre davantage](/docs/2.x/directory-structure/modules)

Exemple (`nuxt.config.js`):

```js
export default {
  modules: [
    // en utilisant le nom du package
    '@nuxtjs/axios',

    // de manière relative par rapport au répertoire source du projet (srcDir)
    '~/modules/awesome.js',

    // on peut lui passer des options
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // ou le définir directement
    function () {}
  ]
}
```

Les développeurs fournissent la plupart du temps des étapes et détails additionnels pour l'utilisation des modules.

Nuxt.js essaie de résoudre chaque élément qui est présent dans le tableau des modules en utilisant `require path` de Node (dans les `node_modules`) et résout ensuite en partant du `srcDir` du projet si un alias `~` est utilisé. Les modules sont exécutés de manière séquentielle, l'ordre est donc important.

Les modules doivent exporter une fonction pour permettre d'améliorer le build/runtime et peuvent (optionnel) aussi retourner une promesse en attendant que leur job ne soit terminé. À noter qu'ils seront importés au runtime, donc ils doivent déjà être transpilés s'ils utilisent des fonctionnalités modernes (ex: ES6).

Se référer au [guide des modules](/docs/2.x/directory-structure/modules) pour des informations détaillées sur leur fonctionnement ou si l'on souhaite développer son propre module. En outre, nous avons une section officielle des [modules](https://github.com/nuxt-community/awesome-nuxt#modules), listant des douzaines de modules prêts à l'emploi et faits par la communauté de Nuxt.js.

## `buildModules`

<div class="Alert Alert--info">

Cette fonctionnalité est disponible depuis Nuxt v2.9

</div>

Certains modules sont importés seulement lors du développement et du build. Utiliser `buildModules` permet de démarrer un projet en production plus rapidement et réduit aussi significativement la taille des `node_modules` pour les déploiements en production. Se référer à la documentation de chaque module pour voir s'il est recommandé d'utiliser `modules` ou `buildModules`.

La différence à l'utilisation est la suivante:

- Au lieu d'ajouter aux `modules` à l'intérieur du fichier `nuxt.config.js`, il faut utiliser `buildModules`
- Au lieu d'ajouter aux `dependencies` à l'intérieur du fichier `package.json`, il faut utiliser `devDependencies`
