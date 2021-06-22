---
title: La propriété router
description: La propriété router permet de personnaliser le routeur de Nuxt.js
menu: router
category: configuration-glossary
position: 24
---

> La propriété router permet de personnaliser le routeur de Nuxt.js ([vue-router](https://router.vuejs.org/en/)).

## base

- Type: `String`
- Par défaut: `'/'`

L'URL de base de l'application. Par exemple, si l'intégralité de la SPA se situe sous `/app/` alors la valeur de `base` doit être définie sur `'/app/'`.

Ceci peut être utile si l'on a besoin de servir du Nuxt.js dans un autre contexte, tel qu'une partie d'un plus gros site par exemple. Il sera à vous de juger si vous pensez qu'un reverse proxy pour le front sera nécessaire ou pas.

Si on veut une redirection sur le `router.base`, on peut y parvenir en utilisant un hook, se référer à la documentation sur la [redirection sur router.base lorsque non à la racine](/docs/2.x/configuration-glossary/configuration-hooks#redirect-to-routerbase-when-not-on-root).

```js{}[nuxt.config.js]
export default {
  router: {
    base: '/app/'
  }
}
```

<div class="Alert Alert-blue">

Lorsque `base` est défini, Nuxt.js va aussi ajouter `<base href="{{ router.base }}"/>` dans l'entête du document.

</div>

> Cette option est donnée directement à [base](https://router.vuejs.org/api/#base) dans `vue-router`.

## routeNameSplitter

- Type: `String`
- Par défaut: `'-'`

On pourrait vouloir changer le séparateur entre le nom des routes que Nuxt.js utilise. On peut y parvenir grâce à l'option `routeNameSplitter` dans notre fichier de configuration. Imaginons que nous ayons le fichier page `pages/posts/_id.vue`. Nuxt.js va générer le nom de la route de manière programmatique, dans le cas présent: `posts-id`. Passer le `routeNameSplitter` à `/` nous donnerait `posts/id`.

```js{}[nuxt.config.js]
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

## extendRoutes

- Type: `Function`

On pourrait vouloir personnaliser les routes créées par Nuxt.js. L'option qui nous permet d'y arriver est `extendRoutes`.

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

Si on veut trier nos routes, on peut utiliser la fonction `sortRoutes(routes)` depuis `@nuxt/utils`:

```js{}[nuxt.config.js]
import { sortRoutes } from '@nuxt/utils'
export default {
  router: {
    extendRoutes(routes, resolve) {
      // on ajoute des routes ici...

      // ensuite on les trie
      sortRoutes(routes)
    }
  }
}
```

Le schéma de la route doit respecter le schéma de [vue-router](https://router.vuejs.org/en/).

<base-alert>

Lorsque l'on ajoute des routes qui utilisent des Vues Nommées, il ne faut pas oublier d'ajouter les `chunkNames` qui correspondent aux `composants`.

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

## fallback

- Type: `boolean`
- Par défaut: `false`

Gère le comportement du router quand le navigateur ne supporte pas `history.pushState` alors que ce mode est défini. Lorsque défini à `true`, le router fallback sur le `hash` mode.

Si on le passe à `false`, le router va faire un rafraîchissement à chaque navigation de `router-link` dans IE9. Ceci est essentiel quand l'application est render côté serveur et a besoin de marcher dans IE9 car le `hash` ne marche pas avec du rendu côté serveur (SSR).

> Cette option est donnée directement à [fallback](https://router.vuejs.org/api/#fallback) dans `vue-router`.

## linkActiveClass

- Type: `String`
- Par défaut: `'nuxt-link-active'`

Permet de personnaliser globalement la classe active par défaut de [`<nuxt-link>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

```js{}[nuxt.config.js]
export default {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> Cette option est donnée directement à [linkactiveclass](https://router.vuejs.org/api/#linkactiveclass) dans `vue-router`.

## linkExactActiveClass

- Type: `String`
- Par défaut: `'nuxt-link-exact-active'`

Permet de personnaliser globalement la classe active exacte par défaut de [`<nuxt-link>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> Cette option est donnée directement à [linkexactactiveclass](https://router.vuejs.org/api/#linkexactactiveclass) dans `vue-router`.

## linkPrefetchedClass

- Type: `String`
- Par défaut: `false`

Permet de personnaliser globalement la classe prefetch par défaut de [`<nuxt-link>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) (cette option est désactivée par défaut).

```js{}[nuxt.config.js]
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

## middleware

- Type: `String` ou `Array`
  - Items: `String`

Définit le(s) middleware par défaut pour chaque page de l'application.

```js{}[nuxt.config.js]
export default {
  router: {
    // exécute le middleware/user-agent.js sur chaque page
    middleware: 'user-agent'
  }
}
```

```js{}[middleware/user-agent.js]
export default function (context) {
  // ajoute la propriété userAgent au contexte (disponible dans `asyncData` et `fetch`)
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

Pour en apprendre davantage, se référer au [guide du middleware](/docs/2.x/directory-structure/middleware#router-middleware).

## mode

- Type: `String`
- Par défaut: `'history'`

Personnalise le mode du routeur, ce n'est pas une option qu'il est recommandé de changer en raison du render côté serveur (SSR).

```js{}[nuxt.config.js]
export default {
  router: {
    mode: 'hash'
  }
}
```

> Cette option est donnée directement à [mode](https://router.vuejs.org/api/#mode) dans `vue-router`.

## parseQuery / stringifyQuery

- Type: `Function`

Fournit des fonctions de query string parse / stringify personnalisées. Écrase les valeurs par défaut.

> Cette option est donnée directement aux [parseQuery / stringifyQuery](https://router.vuejs.org/api/#parsequery-stringifyquery) dans `vue-router`.

## prefetchLinks

> Ajouté dans Nuxt.js v2.4.0

- Type: `Boolean`
- Par défaut: `true`

Paramètre le `<nuxt-link>` afin qu'il prefetch la page _code-splitée_ lorsqu'elle apparaît dans le viewport. Requiert le support de l'[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), à vérifier sur [CanIUse](https://caniuse.com/#feat=intersectionobserver).

Si nécessaire, nous recommandons de polyfill cette fonctionnalité avec un service tel que [Polyfill.io](https://polyfill.io):

```js{}[nuxt.config.js]
export default {
  head: {
    script: [
      {
        src:
          'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver',
        body: true
      }
    ]
  }
}
```

Pour désactiver le prefecthing sur un lien spécifique, on peut utiliser la prop `no-prefetch`. Depuis Nuxt.js v2.10.0, on peut aussi passer la prop `prefetch` à `false`:

```html
<nuxt-link to="/about" no-prefetch>Page à propos non pré-fetchée</nuxt-link>
<nuxt-link to="/about" :prefetch="false"
  >Page à propos non pré-fetchée</nuxt-link
>
```

Pour désactiver le prefetching sur tous les liens, il faut passer `prefetchLinks` à `false`:

```js{}[nuxt.config.js]
export default {
  router: {
    prefetchLinks: false
  }
}
```

Depuis Nuxt.js v2.10.0, si nous avons défini `prefetchLinks` à `false` mais souhaitons tout de même prefetch un lien spécifique, on peut utiliser la propriété `prefetch`:

```html
<nuxt-link to="/about" prefetch>APage à propos non pré-fetchée</nuxt-link>
```

## prefetchPayloads

> Ajouté avec la v2.13.0, disponible seulement pour une [cible statique](/docs/2.x/features/deployment-targets#static-hosting).

- Type: `Boolean`
- Par défaut: `true`

Lorsqu'on utilise `nuxt generate` avec `target: 'static'`, Nuxt.js va générer un `payload.js` pour chaque page.

Lorsque cette cette option est activée, Nuxt.js va automatiquement prefetch le payload de la page liée lorsque le `<nuxt-link>` est visible dans le viewport, créant une **navigation instantanée**.

<base-alert type="info">

Pour cela, nous avons besoin que l'option [prefetchLinks](#prefetchlinks) soit activée.

</base-alert>

On peut désactiver ce comportement en passant `prefetchPaylods` à `false`:

```js{}[nuxt.config.js]
export default {
  router: {
    prefetchPayloads: false
  }
}
```

## scrollBehavior

- Type: `Function`

L'option `scrollBehavior` permet de définir un comportement personnalisé pour la position du défilement de la page entre les routes. Cette méthode est appelée à chaque fois qu'une page est render.

Pour en apprendre davantage, se référer à la documentation sur le [vue-router scrollBehavior](https://router.vuejs.org/guide/advanced/scroll-behavior.html).

<div class="Alert Alert-blue">

À partir de la v2.9.0, on peut utiliser un fichier pour écraser le comportement du `router scrollBehavior`, ce fichier doit être placé dans `~/app/router.scrollBehavior.js` (note: ce nom de fichier est sensible à la casse si exécuté sur Windows).

</div>

On peut voir le fichier `router.scrollBehavior.js` par défaut de Nuxt.js ici: [packages/vue-app/template/router.scrollBehavior.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js).

Un exemple de comment forcer la position du défilement à se retrouver tout en haut pour chaque route:

`app/router.scrollBehavior.js`

```js{}[app/router.scrollBehavior.js]
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

## trailingSlash

- Type: `Boolean` ou `undefined`
- Par défaut: `undefined`
- Disponible depuis: v2.10

Si cette option est passée à `true`, des slashs traînants seront suffixés pour chaque route. Sinon, ils seront enlevés.

**Attention**: Cette option doit être changée avec une certaine préparation et une sequence de tests conséquents. Lorsque l'on définit `router.trailingSlash` a quelque chose d'autre que la valeur par défaut (`undefined`), la route opposée cessera de fonctionner. Il doit donc y avoir des redirections 301 et vos _liens internes_ doivent s'adapter eux aussi. Si vous passez `trailingSlash` à `true`, alors seulement `example.com/abc/` vont marcher mais pas `example.com/abc`. Dans le cas d'un `false`, c'est l'inverse.
