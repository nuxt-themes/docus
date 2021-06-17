---
title: 'API: Le contexte'
description: Le `context` fournit des objets/paramètres de Nuxt qui ne sont pas traditionnellement disponible dans les composants de Vue. Le `context` est disponible dans des zones spéciales du cycle de vie de Nuxt comme `asyncData`, `plugins`,` middlewares`, `modules` et` store / nuxtServerInit`.
menu: context
category: essential
position: 1
---

> Le `context` fournit des objets/paramètres de Nuxt qui ne sont pas traditionnellement disponible dans les composants de Vue. Le `context` est disponible dans des zones spéciales du cycle de vie de Nuxt comme [`asyncData`](/api), [`fetch`](/api/pages-fetch), [`plugins`](/guide/plugins), [`middleware`](/guide/routing#middleware) et [`nuxtServerInit`](/guide/vuex-store#the-nuxtserverinit-action).

> _Note: "Le Contexte" auquel nous nous référons ici ne doit pas être confondu avec le `context` disponible dans les actions du store [`Vuex`](https://vuex.vuejs.org/guide/actions.html). Les deux ne sont pas liés._

```js
function (context) {
  // Clés universelles
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error
  } = context
  // Côté serveur
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }
  // Côté client
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

## Clés universelles

Ces clés sont disponibles à la fois côté client et côté serveur.

### `app` (_NuxtAppOptions_)

Les options d'instance de la racine Vue qui incluent tous vos plugins. Par exemple, lorsque vous utilisez `i18n`, vous pouvez accéder à `$i18n` via `context.app.i18n`.

### `store` ([_Vuex Store_](https://vuex.vuejs.org/api/#vuex-store-instance-properties))

L'instance du store de Vuex. **Disponible uniquement si [vuex store](/guide/vuex-store) est défini**.

### `route` ([_Vue Router Route_](https://router.vuejs.org/api/#the-route-object))

L'instance du routage de Vue.

### `params` (_Objet_)

Alias de `route.params`.

### `query` (_Objet_)

Alias de `route.query`.

### `env` (_Objet_)

Variables d'environnement définies dans `nuxt.config.js`, voir [env api](/api/configuration-env).

### `isDev` (_Booléen_)

Booléen permettant de savoir si vous êtes en mode dev, peut être utile pour mettre en cache certaines données en production.

### `isHMR` (_Booléen_)

Booléen permettant de savoir si la méthode/middleware est appelé depuis le remplacement à chaud du module webpack (_vrai uniquement côté client en mode dev_).

### `redirect` (_Fonction_)

Utilisez cette méthode pour rediriger l'utilisateur vers une autre route, le code de retour est utilisé côté serveur, par défaut à `302`. `redirect([status,] chemin [, requête])`.

### `error` (_Fonction_)

Utilisez cette méthode pour afficher la page d'erreur : `error(params)`. Les `params` devraient avoir les propriétés `statusCode` et `message`.

## Clés côté serveur

Ces clés sont disponibles uniquement côté serveur.

### `req` ([_http.Request_](https://nodejs.org/api/http.html#http_class_http_incomingmessage))

Requête depuis le serveur Node.js. Si Nuxt est utilisé comme middleware, l'objet de la requête peut être différent selon le framework que vous utilisez. <br>**Non disponible via `nuxt generate`**.

### `res` ([_http.Response_](https://nodejs.org/api/http.html#http_class_http_serverresponse))

Réponse depuis le serveur Node.js. Si Nuxt est utilisé comme middleware, l'object de la réponse peut être différent selon le framework que vous utilisez. <br>**Non disponible via `nuxt generate`**.

### `beforeNuxtRender(fn)` (_Fonction_)

Utiliser cette méthdode pour mettre à jour la variable `__NUXT__` rendue côté client, le paramètre `fn` (peut être asynchrone) est appelé avec `{ Components, nuxtState }`, voir [l'exemple](https://github.com/nuxt/nuxt.js/blob/cf6b0df45f678c5ac35535d49710c606ab34787d/test/fixtures/basic/pages/special-state.vue).

## Clés côté client

Ces clés sont disponibles uniquement côté client.

### `from` ([_Vue Router Route_](https://router.vuejs.org/api/#the-route-object))

Le chemin de départ.

### `nuxtState` _(Object)_

L'état de Nuxt, utile pour les plugins qui utilisent `beforeNuxtRender` pour obtenir cet état côté client avant le rendu. **Disponible uniquement pour le mode `universal`**.
