---
title: Le Contexte
description: Le `context` fournit des objets/paramètres en plus aux composants Vue et est disponible dans des lifecycles Nuxt spéciaux comme par exemple `asyncData`, `fetch`, `plugins`, `middleware` et `nuxtServerInit`.
menu: Contexte
category: internals-glossary
position: 1
---

Le `context` fournit des objets/paramètres en plus aux composants Vue et est disponible dans des lifecycles Nuxt spéciaux comme par exemple [`asyncData`](/api), [`fetch`](/docs/2.x/features/data-fetching), [`plugins`](/docs/2.x/directory-structure/plugins), [`middleware`](/docs/2.x/directory-structure/middleware#router-middleware) et [`nuxtServerInit`](/docs/2.x/directory-structure/store#the-nuxtserverinit-action).

> _Note: Le "context" auquel on fait référence ici ne doit pas être confondu avec l'objet `context` disponible dans les [`actions Vuex`](https://vuex.vuejs.org/guide/actions.html). Les deux n'ont rien à voir._

```js
function (context) {
  // Paramètres universels
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
    error,
    $config
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

## Paramètres universels

Ce sont les paramètres qui sont disponibles côté client et côté serveur.

### app

`app` (_NuxtAppOptions_)

L'instance principale de Vue avec les options qui incluent tous vos plugins. Par exemple, lorsque l'on utilise `i18n`, on peut avoir accès à `$i18n` grâce à `context.app.i18n`.

### store

`store` ([_Store Vuex_](https://vuex.vuejs.org/api/#vuex-store-instance-properties))

L'instance du Store Vuex. **Disponible uniquement si le [store vuex](/docs/2.x/directory-structure/store) a été défini**.

### route

`route` ([_Vue Router Route_](https://router.vuejs.org/api/#the-route-object))

L'instance du Routeur de Vue.

### params

`params` (_Objet_)

Un alias de `route.params`.

### query

`query` (_Objet_)

Un alias de `route.query`.

### env

`env` (_Objet_)

Variables d'environnement définies dans le fichier `nuxt.config.js`, se référer à l'[API env](/docs/2.x/configuration-glossary/configuration-env).

### IsDev

`isDev` (_Booléen_)

Un booléen qui permet de savoir si l'on est en mode développement, cela peut être utile pour mettre en cache de la data en production.

### isHMR

`isHMR` (_Booléen_)

Un booléen qui permet de savoir si la méthode/middleware est appellé depuis le module de remplacement à chaud de webpack (_vrai seulement du côté client et en mode développement_).

### redirect

`redirect` (_Fonction_)

Utilisez cette méthode pour rediriger l'utilisateur vers une autre route, le status code est utilisé du côté serveur, prend la valeur `302` par défaut. `redirect([status,] path [, query])`.

### error

`error` (_Fonction_)

Utilisez cette méthode pour afficher la page d'erreur: `error(paramètres)`. Les `paramètres` doivent avoir les propriétés `statusCode` et `message`.

### \$config

`$config` (_Objet_)

La [configuration de l'exécution](/docs/2.x/runtime-config) même.

## Paramètres côté serveur

Ces paramètres ne sont disponibles que du côté serveur.

### req

`req` ([_http.Request_](https://nodejs.org/api/http.html#http_class_http_incomingmessage))

Requête provenant du serveur Node.js. Si Nuxt.js est utilisé en tant que middleware, l'objet de la requête risque d'être différent en fonction du framework que l'on utilise.<br>**Non disponible lors d'un `nuxt generate`**.

### Res

`res` ([_http.Response_](https://nodejs.org/api/http.html#http_class_http_serverresponse))

Réponse du serveur Node.js. Si Nuxt.js est utilisé en tant que middleware, l'objet de la réponse peut être différent en fonction du framework que l'on utilise.<br>**Non disponible lors d'un `nuxt generate`**.

### beforeNuxtRender

`beforeNuxtRender(fn)` (_Fonction_)

Utilisez cette méthode pour mettre à jour la variable `__NUXT__` render du côté client, `fn` (peut être asynchrone) est appelé avec `{ Components, nuxtState }`, voir cet [exemple](https://github.com/nuxt/nuxt.js/blob/cf6b0df45f678c5ac35535d49710c606ab34787d/test/fixtures/basic/pages/special-state.vue).

## Paramètres côté client

Ces paramètres ne sont disponibles que du côté client.

### from

`from` ([_Vue Router Route_](https://router.vuejs.org/api/#the-route-object))

La route d'où l'on vient.

### nuxtState

`nuxtState` _(Objet)_

Le state de Nuxt.js, utile pour les plugins qui utilisent `beforeNuxtRender` pour avoir le state de Nuxt.js avant l'hydratation. **Disponible uniquement dans le mode `universal`**.
