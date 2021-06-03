---
title: Système de route par fichier
description: Nuxt.js s'occupe de générer automatiquement la configuration pour vue-router en fonction de l'arborescence des fichiers Vue à l'intérieur du répertoire des pages. Il suffit de créer un fichier .vue à l'intérieur du répertoire des pages pour que le routage soit fonctionnel, nul besoin de configuration.
position: 3
category: features
questions:
  - question: Quel est le nom du composant utilisé pour naviguer entre les pages ?
    answers:
      - '<a>'
      - '<NuxtLink>'
      - '<Nuxt>'
    correctAnswer: '<NuxtLink>'
  - question: Qu'est-ce qu'il faut pour générer automatiquement une configuration avec le routeur ?
    answers:
      - ajouter un fichier .vue dans le répertoire des pages
      - créer un fichier de configuration router.config
      - 'ajouter un <NuxtLink> à notre page'
    correctAnswer: ajouter un fichier .vue dans le répertoire des pages
  - question: Lequel ne va pas créer une route dynamique ?
    answers:
      - dynamic.vue
      - _slug.vue
      - _slug/index.vue
    correctAnswer: dynamic.vue
  - question: Les routes dynamiques sont ignorées par la commande nuxt generate.
    answers:
      - vrai
      - faux
    correctAnswer: faux
  - question: Comment accède-t-on aux paramètres de la route dans une page dynamique telle que users/id.vue ?
    answers:
      - $route.params.id
      - $route.id
      - $route.params.users.id
    correctAnswer: $route.params.id
  - question: Comment se déclare le composant parent d'une route imbriquée ?
    answers:
      - en créant un fichier Vue appelé parent, à l'intérieur du répertoire qui contient les vues imbriquées
      - en créant un fichier Vue avec un nom différent du répertoire qui contient les vues imbriquées
      - en créant un fichier Vue du même nom que le répertoire qui contient les vues imbriquées
    correctAnswer: en créant un fichier Vue du même nom que le répertoire qui contient les vues imbriquées
  - question: Si nous ne connaissons pas la profondeur de la structure de notre URL, quel fichier pouvons-nous utiliser pour dynamiquement correspondre aux chemins imbriqués ?
    answers:
      - _.vue
      - _index.vue
      - _id.vue
    correctAnswer: _.vue
  - question: Quels composants pouvons-nous utiliser pour render des vues nommées ?
    answers:
      - '<Nuxt> and <Child>'
      - '<Nuxt> and <NuxtChild>'
      - '<NuxtChild> and <NuxtLink>'
    correctAnswer: '<Nuxt> and <NuxtChild>'
  - question: Quel fichier pouvons-nous créer afin d'avoir la scrollbar en haut de page pour chaque route ?
    answers:
      - app/router.scrollBehavior.js
      - app/scrollBehavior.js
      - app/router.js
    correctAnswer: app/router.scrollBehavior.js
  - question: Nous pouvons ajouter un slash traînant pour chaque route.
    answers:
      - vrai
      - faux
    correctAnswer: vrai
---

Nuxt.js s'occupe de générer automatiquement la configuration pour vue-router en fonction de l'arborescence des fichiers Vue à l'intérieur du répertoire des pages. Il suffit de créer un fichier .vue à l'intérieur du répertoire des pages pour que le routage soit fonctionnel, nul besoin de configuration.

Parfois nous aurons besoin de créer une route dynamique ou une route imbriquée ou encore de configurer notre router de manière plus poussée. Ce chapitre a pour but de tout passer en revue afin de tirer le maximum de notre routeur.

<base-alert type="info">

Nuxt.js nous offre du code splitting automatique pour nos routes, sans configuration supplémentaire.

</base-alert>

<base-alert type="info">

Utilisez le composant [NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component) pour naviguer entre les pages.

</base-alert>

```html
<template>
  <nuxt-link to="/">Page d'accueil</nuxt-link>
</template>
```

## Routes Basiques

Cette structure de fichier:

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

va automatiquement générer ceci:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## Routes Dynamiques

Parfois il n'est pas possible de connaître le nom de la route. Un call vers une API pour récupérer une liste d'utilisateurs ou d'articles de blog par exemple. C'est ce que l'on appelle des routes dynamiques. Pour créer une route dynamique, il faut ajouter un underscore (`_`) avant le nom du fichier `.vue` ou devant le nom du répertoire. Nous pouvons nommer le fichier ou le répertoire de la façon dont nous voulons mais il doit être préfixé d'un underscore.

Cette structure de fichiers:

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

va automatiquement générer ceci:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

<base-alert type="info">

Comme nous pouvons le voir, la route nommée `users-id` a la valeur `:id?` dans son chemin, ce qui en fait une valeur optionnelle. Si nous souhaitons rendre ce paramètre obligatoire, il faut créer un fichier `index.vue` dans le répertoire `users/_id`.

</base-alert>

<base-alert type="info">

Depuis Nuxt >= v2.13, un crawler va détecter nos liens et générer des routes dynamiques à partir de ceux-ci. Cependant, si nous avons des pages qui ne sont pas liées (comme une page secrète), nous aurons besoin de spécifier manuellement que nous souhaitons générer cette route dynamique.

</base-alert>

<base-alert type="next">

[Générer des routes dynamiques](/docs/2.x/concepts/static-site-generation) pour des sites statiques.

</base-alert>

### Accéder aux paramètres de la route localement

Nous pouvons accéder aux paramètres de la route actuelle, depuis notre page locale ou notre composant en appelant `this.$route.params.{nomDuParamètre}`. Par exemple, si nous avons une page dynamique avec la liste de nos utilisateurs (`users\_id.vue`), nous pouvons accéder au paramètre `id` pour charger un utilisateur en particulier, pour cela nous pouvons utiliser: `this.$route.params.id`.

## Routes Imbriquées

Nuxt.js nous permet de créer des routes imbriquées grâce à `vue-router`. Pour définir le composant parent d'une route imbriquée, nous avons besoin de créer un fichier Vue du même nom que le répertoire qui va contenir les vues imbriquées.

<base-alert>

Il ne faut pas oublier d'inclure le composant [NuxtChild](/docs/2.x/features/nuxt-components#the-nuxtchild-component) à l'intérieur du composant parent (fichier `.vue`).

</base-alert>

Cette structure de fichiers:

```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

va automatiquement générer ceci:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## Routes dynamiques imbriquées

Ce n'est pas très commun mais il se peut que nous ayons envie d'avoir des enfants dynamiques dans des parents dynamiques, c'est possible avec Nuxt.js.

Cette structure de fichiers:

```
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

va automatiquement générer ceci:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

## Routes dynamiques imbriquées inconnues

Si nous ne connaissons pas la profondeur d'une URL, nous pouvons utiliser `_.vue` pour dynamiquement faire correspondre les chemins imbriqués. Cela va matcher tant qu'il n'y a pas de _requête plus spécifique_.

Cette structure de fichiers:

```
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

va automatiquement générer ceci:

```
/ -> index.vue
/people -> people/index.vue
/people/123 -> people/_id.vue
/about -> _.vue
/about/careers -> _.vue
/about/careers/chicago -> _.vue
```

<base-alert type="info">

Gérer les pages 404 ne fait pas partie du travail d'une page `_.vue`.

</base-alert>

## Personnaliser le routeur

Il y a plusieurs façons de personnaliser notre routeur avec Nuxt:

- [router-extras-module](https://github.com/nuxt-community/router-extras-module) pour personnaliser les paramètres dans la page
- le composant [@nuxtjs/router](https://github.com/nuxt-community/router-module) pour écraser le routeur Nuxt et écrire notre propre fichier `router.js`
- utiliser la propriété [router.extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes) dans notre fichier `nuxt.config.js`

## La propriété router

La propriété router nous permet de personnaliser le routeur Nuxt.js (`vue-router`).

```js{}[nuxt.config.js]
export default {
  router: {
    // personnalisons le routeur de Nuxt.js
  }
}
```

### Base:

L'url de base de notre application. Par exemple, si nous voulons que notre Single Page App soit sous le chemin `/app/`, alors nous devons lui attribuer la valeur `'app/'`.

<base-alert type="next">

[Propriété base du routeur](/docs/2.x/configuration-glossary/configuration-router#base).

</base-alert>

### extendRoutes

Nous voulons peut-être personnaliser les routes créées par Nuxt.js, pour cela nous pouvons utiliser l'option `extendRoutes`.

Exemple d'ajout d'une route personnalisée:

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

Si nous souhaitons trier nos routes, nous pouvons utiliser la fonction `sortRoutes(routes)` à partir de `@nuxt/utils`:

```js{}[nuxt.config.js]
import { sortRoutes } from '@nuxt/utils'
export default {
  router: {
    extendRoutes(routes, resolve) {
      // ajouter nos routes ici ...

      // trions-les
      sortRoutes(routes)
    }
  }
}
```

<base-alert>

Les routes doivent respecter le schéma du [vue-router](https://router.vuejs.org/en/).

</base-alert>

<base-alert>

Lorsque l'on ajoute les routes qui utilisent des [routes nommées](https://nuxtjs.org/guide/routing#named-views), il ne faut pas oublier d'ajouter les `chunkNames` des `components`.

</base-alert>

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/users/:id',
        components: {
          default: resolve(__dirname, 'pages/users'), // ou routes[index].component
          modal: resolve(__dirname, 'components/modal.vue')
        },
        chunkNames: {
          modal: 'components/modal'
        }
      })
    }
  }
}
```

<base-alert type="next">

[propriété extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes).

</base-alert>

### fallback

S'occupe du routeur, si ce dernier doit se rabattre en mode `hash` lorsque le navigateur ne supporte pas `history.pushState` alors que le mode est configuré sur `history`.

<base-alert type="next">

[propriété fallback](/docs/2.x/configuration-glossary/configuration-router#fallback).

</base-alert>

### mode

Nous pouvons changer le mode du routeur, ce n'est cependant pas recommandé en raison du Server Side Rendering (SSR).

<base-alert type="next">

[propriété mode](/docs/2.x/configuration-glossary/configuration-router#mode).

</base-alert>

### parseQuery / stringifyQuery

Fournit des fonctions de _parsing_ / _stringification_ personnalisées.

<base-alert type="next">

[propriété parseQuery / stringifyQuery](/docs/2.x/configuration-glossary/configuration-router#parsequery--stringifyquery).

</base-alert>

### routeNameSplitter

Nous pourrions vouloir changer le séparateur entre les noms des routes que Nuxt.js utilise, pour cela nous pouvons utiliser l'option `routeNameSplitter` dans notre fichier de configuration. Prenons par exemple le fichier page `pages/posts/_id.vue`. Nuxt.js va générer le nom de la route de manière programmatique, ici ce sera `posts-id`. Passer le `routeNameSplitter` à `/` va changer le nom en `posts/id`.

```js{}[nuxt.config.js]
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

### scrollBehavior

L'option `scrollBehavior` nous laisse le choix pour définir un comportement personnalisé pour la position du défilement entre les routes. Cette méthode est appelée à chaque fois qu'une page est render.

<base-alert type="next">

Pour plus d'informations, veuillez consulter [la documentation sur le scrollBehavior de vue-router](https://router.vuejs.org/guide/advanced/scroll-behavior.html).

</base-alert>

Disponible depuis la version `2.9.0`:

Dans Nuxt.js, nous pouvons utiliser un fichier pour écraser le `scrollBehavior` du routeur. Ce fichier doit être placé dans le répertoire `app`.

`~/app/router.scrollBehavior.js`.

Un exemple de comment forcer la position du défilement à se retrouver tout en haut pour chaque route:

```js{}[app/router.scrollBehavior.js]
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

<base-alert type="next">

[fichier `router.scrollBehavior.js` par défaut de Nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js).

</base-alert>

<base-alert type="next">

[propriété scrollBehavior](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior).

</base-alert>

### trailingSlash

Disponible depuis la version `2.10`:

Si cette option est passée à `true`, des slashs traînants seront suffixés pour chaque route. Sinon, ils seront enlevés.

```js{}[nuxt.config.js]
export default {
  router: {
    trailingSlash: true
  }
}
```

<base-alert>

Cette option doit être changée avec une certaine préparation et une sequence de tests conséquents. Lorsque l'on définit `router.trailingSlash` a quelque chose d'autre que la valeur par défaut (`undefined`), la route opposée cessera de fonctionner. Il doit donc y avoir des redirections 301 et nos _liens internes_ doivent s'adapter eux aussi. Si nous passons `trailingSlash` à `true`, alors seulement `example.com/abc/` vont marcher mais pas `example.com/abc`. Dans le cas d'un `false`, c'est l'inverse.

</base-alert>

<base-alert type="next">

[propriété trailingSlash](/docs/2.x/configuration-glossary/configuration-router#trailingslash).

</base-alert>

<quiz :questions="questions"></quiz>
