---
title: 'API: La propriété router'
description: La propriété router vous permet de personnaliser le routeur Nuxt.js.
menu: router
category: configuration
position: 124
---

> La propriété router vous permet de personnaliser le routeur Nuxt.js. ([vue-router](https://router.vuejs.org/en/)).

## base

- Type: `String`
- Par défaut: `'/'`

L'URL de base de l'application. Par exemple, si l'intégralité de l'application d'une seule page est servie sous `/app/`, alors la base doit utiliser la valeur `'/app/'`.

Cela peut être utile si vous devez servir Nuxt en tant que racine de contexte différente, à partir d'un site Web plus grand. Notez que vous pouvez ou non configurer un serveur Web Front Proxy.

Si vous voulez avoir une redirection vers `router.base`, vous pouvez le faire [en utilisant un écouteur, voir _Rediriger vers router.base lorsqu'il n'est pas sur la racine_](/api/configuration-hooks#redirect-to-router-base-quand-pas-sur-root).

Exemple (`nuxt.config.js`):

```js
export default {
  router: {
    base: '/app/'
  }
}
```

<div class="Alert Alert-blue">

Lorsque `base` est défini, Nuxt.js ajoutera également dans l'en-tête du document `<base href="{{ router.base }}"/>`.

</div>

> Cette option est donnée directement au routeur vue [base](https://router.vuejs.org/api/#base).

## routeNameSplitter

- Type: `String`
- Par défaut: `'-'`

Vous souhaiterez peut-être modifier le séparateur entre les noms de route utilisés par Nuxt.js. Vous pouvez le faire via l'option `routeNameSplitter` dans votre fichier de configuration. Imaginez que nous ayons le fichier d'échange `pages/posts/_id.vue`. Nuxt générera le nom de la route par programmation, dans ce cas `posts-id`. En changeant la configuration de `routeNameSplitter` en `/` le nom changera donc en `posts/id`.

Exemple (`nuxt.config.js`):

```js
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

## extendRoutes

- Type: `Function`

Vous souhaiterez peut-être étendre les routes créées par Nuxt.js. Vous pouvez le faire via l'option `extendRoutes`.

Exemple d'ajout d'un chemin personnalisé:

`nuxt.config.js`

```js
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

Si vous souhaitez trier vos chemins, vous pouvez utiliser la fonction `sortRoutes(routes)` de `@nuxt/utils`:

`nuxt.config.js`

```js
import { sortRoutes } from '@nuxt/utils'
export default {
  router: {
    extendRoutes(routes, resolve) {
      // Ajoutez des chemins ici ...

      // puis trier les
      sortRoutes(routes)
    }
  }
}
```

Le schéma du chemin doit respecter le schéma [vue-router](https://router.vuejs.org/en/).

<div class="Alert Alert--orange">

<b>Avertissement:</b> lors de l'ajout de chemins qui utilisent [les routes nommées](/guide/routing#named-views), n'oubliez pas d'ajouter les `chunkNames` correspondants des `components` nommés.

</div>

`nuxt.config.js`

```js
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

Contrôle si le routeur doit revenir au mode de hachage lorsque le navigateur ne prend pas en charge history.pushState mais que le mode est défini sur history.

La définition de ce paramètre sur false fait une actualisation de page complète dans IE9. Cela est utile lorsque l'application est rendue par le serveur et doit fonctionner dans IE9, car une URL en mode de hachage ne fonctionne pas avec SSR.

> Cette option est donnée directement au router vue [fallback](https://router.vuejs.org/api/#fallback).

## linkActiveClass

- Type: `String`
- Par défaut: `'nuxt-link-active'`

Configurez globalement la classe active par défaut [`<nuxt-link>`](/api/components-nuxt-link).

Exemple (`nuxt.config.js`):

```js
export default {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> Cette option est donnée directement au routeur vue [linkactiveclass](https://router.vuejs.org/api/#linkactiveclass).

## linkExactActiveClass

- Type: `String`
- Par défaut: `'nuxt-link-exact-active'`

Configurez globalement la classe active par défaut [`<nuxt-link>`](/api/components-nuxt-link).

Exemple (`nuxt.config.js`):

```js
export default {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> Cette option est donnée directement au routeur vue [linkexactactiveclass](https://router.vuejs.org/api/#linkexactactiveclass).

## linkPrefetchedClass

- Type: `String`
- Par défaut: `false`

Configurer globalement [`<nuxt-link>`](/api/components-nuxt-link) par défaut la classe de prefetch (fonctionnalité désactivée par défaut)

Exemple (`nuxt.config.js`):

```js
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

## middleware

- Type: `String` or `Array`
  - Éléments: `String`

Définissez le middleware par défaut pour chaque page de l'application.

Exemple:

`nuxt.config.js`

```js
export default {
  router: {
    // Exécutez le middleware/user-agent.js sur chaque page
    middleware: 'user-agent'
  }
}
```

`middleware/user-agent.js`

```js
export default function (context) {
  // Ajoutez la propriété userAgent dans le contexte (disponible dans `asyncData` et` fetch`)
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

Pour en savoir plus sur le middleware, voir le [guide du middleware](/guide/routing#middleware).

## mode

- Type: `String`
- Par défaut: `'history'`

Configurez le mode routeur, il n'est pas recommandé de le changer en raison du rendu côté serveur.

Exemple (`nuxt.config.js`):

```js
export default {
  router: {
    mode: 'hash'
  }
}
```

> Cette option est donnée directement au routeur vue [mode](https://router.vuejs.org/api/#mode).

## parseQuery / stringifyQuery

- Type: `Function`

Fournissez des fonctions d'analyse / chaîne de chaîne de requête personnalisées. Remplace la valeur par défaut.

> Cette option est donnée directement au routeur vue [parseQuery / stringifyQuery](https://router.vuejs.org/api/#parsequery-stringifyquery).

## prefetchLinks

> Ajouté avec Nuxt v2.4.0

- Type: `Boolean`
- Par défaut: `true`

Configurez `<nuxt-link>` pour pré-charger la page _divisée par code_ lorsqu'elle est détectée dans la fenêtre. Nécessite [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) pour être pris en charge (voir [CanIUse](https://caniuse.com/#feat=intersectionobserver)) .

Nous vous recommandons de polyfiller conditionnellement cette fonctionnalité avec un service comme [Polyfill.io](https://polyfill.io):

`nuxt.config.js`

```js
export default {
  head: {
    script: [
      {
        src: 'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver',
        body: true
      }
    ]
  }
}
```

Pour désactiver le préchargement sur un lien spécifique, vous pouvez utiliser la propriété `no-prefetch`. Depuis Nuxt.js v2.10.0, vous pouvez également utiliser la propriété `prefetch` à `false`:

```html
<nuxt-link to="/about" no-prefetch>About page not pre-fetched</nuxt-link>
<nuxt-link to="/about" :prefetch="false">About page not pre-fetched</nuxt-link>
```

Pour désactiver le préchargement sur tous les liens, définissez la propriété `prefetchLinks` à `false`:

```js
// nuxt.config.js
export default {
  router: {
    prefetchLinks: false
  }
}
```

Depuis Nuxt.js v2.10.0, si vous avez défini `prefetchLinks` sur `false` mais que vous souhaitez pré-charger un lien spécifique, vous pouvez utiliser la propriété `prefetch`:

```html
<nuxt-link to="/about" prefetch>About page pre-fetched</nuxt-link>
```

## scrollBehavior

- Type: `Function`

L'option `scrollBehavior` vous permet de définir un comportement personnalisé pour la position de défilement entre les chemins. Cette méthode est appelée chaque fois qu'une page est rendue. Pour en savoir plus à ce sujet, consultez la [documentation de vue-router scrollBehavior](https://router.vuejs.org/guide/advanced/scroll-behavior.html).

<div class="Alert Alert-blue">

À partir de la v2.9.0, vous pouvez utiliser un fichier pour remplacer le scrollBehavior du routeur, ce fichier doit être placé dans `~/app/router.scrollBehavior.js`.

</div>

Vous pouvez voir le fichier par défaut de Nuxt `router.scrollBehavior.js` ici: [packages/vue-app/template/router.scrollBehavior.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js).

Exemple pour forcer la position de défilement vers le haut pour chaque chemin:

`app/router.scrollBehavior.js`

```js
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

## trailingSlash

- Type: `Boolean` or `undefined`
- Par défaut: `undefined`
- Disponible depuis: v2.10

Si cette option est définie sur true, des barres obliques de fin seront ajoutées à chaque chemin. S'il est défini sur false, elles seront supprimées.

**Attention**: Cette option ne doit pas être définie sans préparation ni être testée de manière approximative. Lorsque vous définissez `router.trailingSlash` sur autre chose que `undefined`, la route opposée cessera de fonctionner. Ainsi, les redirections 301 doivent être en place et votre _lien interne_ doit être adapté correctement. Si vous définissez `trailingSlash` sur `true`, seul `example.com/abc/` fonctionnera mais pas `example.com/abc`. Sur faux, vice-versa.
