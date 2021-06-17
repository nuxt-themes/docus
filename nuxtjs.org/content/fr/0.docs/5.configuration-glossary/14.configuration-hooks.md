---
title: La propriété hooks
description: Les hooks sont des écouteurs aux évènements de Nuxt.js qui sont généralement utilisés dans les modules de Nuxt, mais aussi disponibles dans le fichier `nuxt.config.js`.
menu: hooks
category: configuration-glossary
position: 13
---

- Type: `Object`

> Les hooks sont des [écouteurs aux évènements de Nuxt.js](/docs/2.x/internals-glossary/internals) qui sont généralement utilisés dans les modules de Nuxt, mais aussi disponibles dans le fichier `nuxt.config.js`.

```js{}[nuxt.config.js]
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(
          builder.nuxt.options.buildDir,
          'fichier-supplementaire'
        )
        fs.writeFileSync(extraFilePath, 'Quelque chose de spécial')
      }
    }
  }
}
```

Le fonctionnement des hooks suit un modèle de nommage avec des `:` (ex: `build:done`). Pour des raisons de simplicité de configuration, on peut les structurer de manière hiérarchique pour ses propres hooks en utilisant un objet (cf. code juste au dessus). Se référencer au [fonctionnement interne de Nuxt.js](/docs/2.x/internals-glossary/internals) pour davantage d'informations.

## Liste des hooks

- [Nuxt hooks](/docs/2.x/internals-glossary/internals-nuxt#hooks)
- [Renderer hooks](/docs/2.x/internals-glossary/internals-renderer#hooks)
- [ModulesContainer hooks](/docs/2.x/internals-glossary/internals-module-container#hooks)
- [Builder hooks](/docs/2.x/internals-glossary/internals-builder#hooks)
- [Generator hooks](/docs/2.x/internals-glossary/internals-generator#hooks)

## Exemples

### Rediriger au `router.base` lorsque l'on n'est pas sur `root`

Imaginons que l'on souhaite servir les pages sur `/portal` au lieu de `/`.

C'est peut être un cas particulier, mais le but d'un `router.base` dans `nuxt.config.js` est de permettre à un serveur Web de servir une application Nuxt.js lorsque son point d'entrée n'est pas le domaine principal.

Ceci dit, lorsque l'on est en développement, aller sur _localhost_, lorsque `router.base` n'est défini à `/` retournera une 404. Pour prévenir cela, on peut configurer un hook.

La redirection n'est peut-être pas le meilleur cas d'usage pour une application Web en production, mais cela permettra de pratiquer les hooks.

Pour commencer, on peut changer le [`router.base`](/docs/2.x/configuration-glossary/configuration-router#base) dans le fichier `nuxt.config.js`:

```js{}[nuxt.config.js]
import hooks from './hooks'
export default {
  router: {
    base: '/portal'
  }
  hooks: hooks(this)
}
```

Ensuite, nous allons créer quelques nouveaux fichiers:

1. `hooks/index.js`, module des hooks

   ```js{}[hooks/index.js]
   import render from './render'

   export default nuxtConfig => ({
     render: render(nuxtConfig)
   })
   ```

2. `hooks/render.js`, render du hook

   ```js{}[hooks/render.js]
   import redirectRootToPortal from './route-redirect-portal'

   export default nuxtConfig => {
     const router = Reflect.has(nuxtConfig, 'router') ? nuxtConfig.router : {}
     const base = Reflect.has(router, 'base') ? router.base : '/portal'

     return {
       /**
        * 'render:setupMiddleware'
        * {@link node_modules/nuxt/lib/core/renderer.js}
        */
       setupMiddleware(app) {
         app.use('/', redirectRootToPortal(base))
       }
     }
   }
   ```

3. `hooks/route-redirect-portal.js`, le middleware en question

   ```js{}[hooks/route-redirect-portal.js]
   /**
    * Hook de middleware de Nuxt.js pour rediriger de `/` à `/portal` (ou toute autre valeur attribuée à `router.base` dans `nuxt.config.js`)
    *
    * Doit avoir la même version que `connect`
    * {@link node_modules/connect/package.json}
    */
   import parseurl from 'parseurl'

   /**
    * On branche le middleware pour gérer les redirections au contexte principal de l'application Web.
    *
    * La documentation de Nuxt.js manque d'explications sur l'usage des hooks.
    * Ceci est un exemple de router afin d'aider à l'expliquer.
    *
    * On peut regarder d'autres implémentations en tant qu'inspiration:
    * - https://github.com/nuxt/nuxt.js/blob/dev/examples/with-cookies/plugins/cookies.js
    * - https://github.com/yyx990803/launch-editor/blob/master/packages/launch-editor-middleware/index.js
    *
    * [http_class_http_clientrequest]: https://nodejs.org/api/http.html#http_class_http_clientrequest
    * [http_class_http_serverresponse]: https://nodejs.org/api/http.html#http_class_http_serverresponse
    *
    * @param {http.ClientRequest} req objet de la requête du client interne de Node.js [http_class_http_clientrequest]
    * @param {http.ServerResponse} res Réponse interne de Node.js [http_class_http_serverresponse]
    * @param {Function} next callback du middleware
    */
   export default desiredContextRoot =>
     function projectHooksRouteRedirectPortal(req, res, next) {
       const desiredContextRootRegExp = new RegExp(`^${desiredContextRoot}`)
       const _parsedUrl = Reflect.has(req, '_parsedUrl') ? req._parsedUrl : null
       const url = _parsedUrl !== null ? _parsedUrl : parseurl(req)
       const startsWithDesired = desiredContextRootRegExp.test(url.pathname)
       const isNotProperContextRoot = desiredContextRoot !== url.pathname
       if (isNotProperContextRoot && startsWithDesired === false) {
         const pathname = url.pathname === null ? '' : url.pathname
         const search = url.search === null ? '' : url.search
         const Location = desiredContextRoot + pathname + search
         res.writeHead(302, {
           Location
         })
         res.end()
       }
       next()
     }
   ```

Ainsi, lorsqu'un collègue accédera accidentellement à `/` en développement, Nuxt.js le redirigera automatiquement vers `/portal`.
