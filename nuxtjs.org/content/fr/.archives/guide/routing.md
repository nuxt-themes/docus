---
title: Routage
description: Nuxt.js utilise le système de fichiers pour générer les routes de votre application web.
category: getting-started
position: 104
---

> Nuxt.js génère automatiquement la configuration pour [vue-router](https://github.com/vuejs/vue-router) en fonction de votre arborescence de fichiers Vue se trouvant au sein du répertoire `pages`.

<div class="Alert Alert--grey">

Pour naviguer entre les pages, nous recommandons l'utilisation du composant [`<nuxt-link>`](/api/components-nuxt-link).

</div>

Par exemple :

```html
<template>
  <nuxt-link to="/">Accueil</nuxt-link>
</template>
```

## Routes basiques

Cette arborescence :

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

génèrera automatiquement :

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

## Routes dynamiques

Pour définir une route dynamique à l'aide d'un paramètre, vous devez définir un fichier `.vue` OU un répertoire **préfixé par un souligné (`_`)**.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/nuxtjs-dynamic-routes?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Visionner un cours gratuit sur les <strong>routes dynamiques</strong> sur Vue School 
    </p>
  </a>
</div>

Cette arborescence :

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

génèrera automatiquement :

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

Comme vous pouvez le voir, la route nommée `users-id` contient le chemin `:id?` ce qui le rend optionnel. Si vous voulez le rendre obligatoire, créez un fichier `index.vue` dans le dossier `users/_id`.

<div class="Alert Alert--orange">

**Attention :** les routes dynamiques sont ignorées par la commande `generate`, consultez la configuration de l'API à propos de [La propriété `generate`](/api/configuration-generate#routes)

</div>

### Validation des paramètres de route

Nuxt.js vous permet de définir une méthode de validation dans votre composant de routage dynamique.

Par exemple : `pages/users/_id.vue`

```js
export default {
  validate({ params }) {
    // Doit être un nombre
    return /^\d+$/.test(params.id)
  }
}
```

Si la méthode de validation ne renvoie pas `true` ou une `Promise` résolue à `true` ou génère une erreur, Nuxt.js chargera automatiquement la page d'erreur 404 ou la page d'erreur 500 en cas d'erreur.

Pour plus d'informations à propos de la méthode de validation, consultez [la partie Pages de l'API pour La méthode `validate`](/api/pages-validate)

## Routes imbriquées

Nuxt.js vous permet de créer des routes imbriquées en utilisant les routes enfants de vue-router.

Pour définir le composant parent d'une route imbriquée, vous devez créer un fichier Vue avec le **même nom que le répertoire** qui contient les vues enfants.

<div class="Alert Alert--orange">

<b>Attention :</b> n'oubliez pas d'écrire `<nuxt-child/>` au sein du composant parent (fichier <code>.vue</code>).

</div>

Cette arborescence :

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

génèrera automatiquement :

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

Ce scénario ne devrait pas arriver souvent, mais il est possible avec Nuxt.js d'avoir des routes dynamiques enfants dans des routes dynamiques parentes.

Cette arborescence :

```bash
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

génèrera automatiquement :

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

### Itinéraire dynamique inconnu imbriqué

Si vous ne connaissez pas la profondeur de la structure de vos URL, vous pouvez utiliser `_.vue` pour correspondre dynamiquement au chemin demandé. Ceci gérera les requêtes qui ne correpondent pas à une requête _plus spécifique_ .

Cette arborescence :

```bash
pages/
--| personne/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

traitera les requêtes comme cela :

| Chemin                    | Fichier              |
| ------------------------- | -------------------- |
| `/`                       | `index.vue`          |
| `/personne`               | `personne/index.vue` |
| `/personne/123`           | `personne/_id.vue`   |
| `/apropos`                | `_.vue`              |
| `/apropos/carriere`       | `_.vue`              |
| `/apropos/carriere/paris` | `_.vue`              |

**Note :** traiter les pages 404 est maintenant inclu dans la logique de la page `_.vue`. [Vous trouverez ici plus d'information sur les redirections 404](/guide/async-data#handling-errors).

### Routes nommées

Pour afficher les routes nommées, vous pouvez utiliser les composants `<nuxt name="top"/>` ou `<nuxt-child name="top"/>` dans votre layout/page. Pour spécifier une route nommée dans une page vous devez d'abord étendre la config de votre routeur dans le fichier `nuxt.config.js`:

```js
export default {
  router: {
    extendRoutes(routes, resolve) {
      const index = routes.findIndex(route => route.name === 'main')
      routes[index] = {
        ...routes[index],
        components: {
          default: routes[index].component,
          top: resolve(__dirname, 'components/mainTop.vue')
        },
        chunkNames: {
          top: 'components/mainTop'
        }
      }
    }
  }
}
```

Il est nécessaire d'étendre la route en question avec 2 propriétés, `components` and `chunkNames`. La vue nommée dans cet exemple a dans sa configuration une clef `name` avec comme valeur `top`.

Pour voir un exemple, jetez un coup d'œil au [examples de vue nommées](/examples/named-views).

### Alternative pour application monopage

Vous pouvez activer l'alternative pour application monopage pour les routes dynamiques aussi. Nuxt.js va générer un fichier supplémentaire identique à `index.html` qui pourra être utilisé en `mode: 'spa'`. La plupart des services d'hébergement statiques peuvent être configurés pour utiliser le template d'application monopage si aucun fichier ne concorde. Les informations de `head` ou HTML ne seront pas inclus mais les données seront toujours résolues et chargées depuis l'API.

Nous pouvons activer cela dans notre fichier `nuxt.config.js` :

```js
export default {
  generate: {
    fallback: true, // si vous souhaitez utiliser un fichier '404.html'
    fallback: 'my-fallback/file.html' // si votre hébergement nécessite une localisation personnalisée
  }
}
```

#### Implémentation pour Surge

Surge [peut gérer](https://surge.sh/help/adding-a-custom-404-not-found-page) aussi bien les fichiers `200.html` que `404.html`. `generate.fallback` est mis à `200.html` par défaut, donc vous devez changer cela.

#### Implémentation pour GitHub Pages et Netlify

GitHub Pages et Netlify reconnaissent les fichiers `404.html` automatiquement, donc mettre `generate.fallback` à `true` est tout ce que vous avez besoin de faire !

#### Implémentation pour Firebase Hosting

Pour utiliser Firebase Hosting, configurez `generate.fallback` à `true` et utilisez la configuration suivante ([plus d'informations](https://firebase.google.com/docs/hosting/url-redirects-rewrites#section-rewrites)) :

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/404.html"
      }
    ]
  }
}
```

## Transitions

Nuxt.js utilise le composant [`<transition>`](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) afin de vous permettre de créer de superbes transitions / animations entre vos routes.

### Paramètres globaux

<div class="Alert Alert--nuxt-green">

<b>Info :</b> dans Nuxt.js, le nom de la transition par défaut est `"page"`.

</div>

Pour ajouter une transition de fondu à chaque page de votre application, nous avons besoin d'un fichier CSS qui est partagé sur toutes nos routes. Commençons par créer un fichier dans le dossier `assets`.

Notre CSS global dans `assets/main.css` :

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
```

Nous ajoutons son chemin dans le tableau des `css` de notre fichier de configuration `nuxt.config.js` :

```js
export default {
  css: ['~/assets/main.css']
}
```

Pour plus d'informations à propos des transitions, consultez [la partie Configuration de l'API pour La propriété `transition`](/api/pages-transition)

### Paramètres des pages

Vous êtes également libre de définir une transition personnalisée pour une seule page à l'aide de la propriété `transition`.

Nous ajoutons une nouvelle classe dans notre CSS global `assets/main.css` :

```css
.test-enter-active,
.test-leave-active {
  transition: opacity 0.5s;
}
.test-enter,
.test-leave-active {
  opacity: 0;
}
```

Puis, nous utilisons la propriété transition pour définir le nom de la classe à utiliser pour cette transition de page :

```js
export default {
  transition: 'test'
}
```

Pour plus d'informations à propos de la propriété transition, consultez [la partie Configuration de l'API pour La propriété `transition`](/api/pages-transition)

## Middleware

> Le middleware vous permet de définir une fonction personnalisée qui sera exécutée avant le rendu d'une page ou d'un groupe de pages.

**Tous les middlewares devraient être placés dans le répertoire `middleware/`.** Le nom du fichier étant le nom du middleware (`middleware/auth.js` deviendra le middleware `auth`).

Un middleware reçoit [le contexte](/api#context) comme premier argument :

```js
export default function (context) {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

En mode universel, les middlewares seront appelés une seule fois côté serveur (à la première requête à l'application Nuxt ou sur le rechargement de la page) et côté client lors de la navigation vers une autre route. En mode SPA, les middlewares seront appelés côté client sur la première requête et à chaque navigation à travers les routes.

Le middleware sera exécuté en série dans l'ordre suivant :

1. `nuxt.config.js` (dans l'ordre interne du fichier)
2. Mises en page correspondantes
3. Pages correspondantes

Un middleware peut être asynchrone, retourner une `Promise` ou utiliser une fonction de rappel en second argument :

`middleware/stats.js`

```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Puis, dans `nuxt.config.js`, utilisez la clé `router.middleware` :

`nuxt.config.js`

```js
export default {
  router: {
    middleware: 'stats'
  }
}
```

Maintenant le middleware `stats` sera appelé à chaque changement de routes.

Vous pouvez ajouter votre middleware à une mise en page spécifique ou à une page comme ceci :

`pages/index.vue` or `layouts/default.vue`

```js
export default {
  middleware: 'stats'
}
```

Pour voir un exemple d'usage utilisant les middlewares, consultez [example-auth0](https://github.com/nuxt/example-auth0) sur GitHub.
