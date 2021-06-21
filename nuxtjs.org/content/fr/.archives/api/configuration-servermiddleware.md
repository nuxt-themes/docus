---
title: 'API: La propriété serverMiddleware'
description: Définissez le middleware côté serveur.
menu: serverMiddleware
category: configuration
position: 127
---

- Type: `Array`
  - Éléments: `String` ou `Object` ou `Function`

Nuxt crée en interne une instance [connect](https://github.com/senchalabs/connect) à laquelle nous pouvons ajouter notre propre middleware personnalisé. Cela nous permet d'enregistrer des chemins supplémentaires (généralement des chemins `/api`) **sans avoir besoin d'un serveur externe**.

Parce que connect lui-même est un middleware, le middleware enregistré fonctionnera à la fois avec `nuxt start` et également lorsqu'il sera utilisé comme middleware avec des utilisations programmatiques comme [express-template](https://github.com/nuxt-community/express-template). Les [Modules](/guide/modules) de Nuxt peuvent également fournir `serverMiddleware` en utilisant [this.addServerMiddleware()](/api/internals-module-container#addservermiddleware-middleware-)

En plus de cela, nous avons introduit une option `prefix` qui par défaut est `true`. Il ajoutera la base du routeur aux middlewares de votre serveur.

**Exemple:**

- Chemin du serveur middleware: `/api`
- Base du router: `/admin`
- Avec `prefix: true` (par défaut): `/admin/api`
- Avec `prefix: false`: `/api`

## serverMiddleware vs middleware!

Ne le confondez pas avec [routes middleware](/guide/routing#middleware) qui est appelé avant chaque route par Vue du côté client ou SSR. Le middleware répertorié dans la propriété `serverMiddleware` s'exécute côté serveur **avant** `vue-server-renderer` et peut être utilisé pour des tâches spécifiques au serveur telles que la gestion des demandes d'API ou le service des ressources.

## Utilisation

Si le middleware est une chaine de caractère, Nuxt.js essaiera de le résoudre automatiquement dès qu'il en aura besoin.

Exemple (`nuxt.config.js`):

```js
import serveStatic from 'serve-static'

export default {
  serverMiddleware: [
    // Enregistre le package npm de redirect-ssl
    'redirect-ssl',

    // Enregistrera le fichier du répertoire du projet api pour gérer /api/*
    { path: '/api', handler: '~/api/index.js' },

    // Nous pouvons également créer des instances personnalisées
    { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ]
}
```

<p class="Alert Alert--danger">
    <b>TÊTE HAUTE! </b>
    Si vous ne voulez pas que le middleware s'enregistre pour tous les chemins, vous devez utiliser le formulaire d'objet 
    avec un chemin spécifique, sinon le gestionnaire par défaut nuxt ne fonctionnera pas!
</p>

## Middleware de serveur personnalisé

Il est également possible d'écrire un middleware personnalisé. Pour plus d'informations, voir [Connect Docs](https://github.com/senchalabs/connect#appusefn).

Middleware (`server-middleware/logger.js`):

```js
export default function (req, res, next) {
  // req est l'objet de requête http de Node.js
  console.log(req.url)

  // res est l'objet de réponse http de Node.js

  // est ensuite une fonction appelée pour invoquer le prochain middleware
  // N'oubliez pas d'appeler le suivant à la fin si votre middleware n'est pas un endpoint!
  next()
}
```

Configuration de Nuxt (`nuxt.config.js`):

```js
serverMiddleware: ['~/api/logger']
```

## Syntaxe d'objet

Si votre middleware de serveur se compose d'une liste de fonctions mappées sur des chemins:

```js
export default {
  serverMiddleware: [
    { path: '/a', handler: '~/api/a.js' },
    { path: '/b', handler: '~/api/b.js' },
    { path: '/c', handler: '~/api/c.js' }
  ]
}
```

Vous pouvez également passer un objet pour les définir, comme suit:

```js
export default {
  serverMiddleware: {
    '/a': '~/api/a.js',
    '/b': '~/api/b.js',
    '/c': '~/api/c.js'
  }
}
```
