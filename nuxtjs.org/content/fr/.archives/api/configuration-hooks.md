---
title: "API: La propriété d'écouteurs"
description: Les écouteurs écoutent les événements Nuxt qui sont généralement utilisés dans les modules Nuxt, mais sont également disponibles dans `nuxt.config.js`.
menu: hooks
category: configuration
position: 113
---

- Type: `Object`

> Les écouteurs sont [des évènements d'écoutes de](/api/internals) qui sont généralement utilisés dans les modules Nuxt, mais sont également disponibles dans `nuxt.config.js`. [En savoir plus](/api/internals)

Exemple (`nuxt.config.js`):

```js
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(
          builder.nuxt.options.buildDir,
          'extra-file'
        )
        fs.writeFileSync(extraFilePath, 'Something extra')
      }
    }
  }
}
```

En interne, les écouteurs respectent un modèle de nommage en utilisant à l'aide des deux points (cf, `build:done`). Pour faciliter la configuration, vous pouvez les structurer comme un objet hiérarchique lorsque vous utilisez `nuxt.config.js` (comme illustré ci-dessus) pour définir vos propres écouteurs. Voir [Nuxt en interne](/api/internals) pour des informations plus détaillées sur leur fonctionnement.

## Listes des écouteurs

- [Écouteurs Nuxt](https://nuxtjs.org/api/internals-nuxt#hooks)
- [Écouteurs de rendu](https://nuxtjs.org/api/internals-renderer#hooks)
- [Écouteurs de ModulesContainer](https://nuxtjs.org/api/internals-module-container#hooks)
- [Écouteurs de constructeurs](https://nuxtjs.org/api/internals-builder#hooks)
- [Écouteurs de génerateurs](https://nuxtjs.org/api/internals-generator#hooks)

## Exemples

### Rediriger vers router.base lorsqu'il n'est pas sur la racine

Supposons que vous souhaitiez servir des pages en tant que `/portal` au lieu de `/`.

Il s'agit peut-être d'un cas limite, et l'intérêt de _nuxt.config.js_ `router.base` est pour quand un serveur Web servira Nuxt ailleurs que la racine du domaine.

Mais en développement local, en tapant sur _localhost_, lorsque router.base n'est pas / retourne un 404. Pour éviter cela, vous pouvez configurer un écouteur.

La redirection n'est peut-être pas le meilleur cas d'utilisation pour un site Web de production, mais cela vous aidera à tirer parti des écouteurs.

Pour commencer, vous [pouvez changer `router.base`](/api/configuration-router#base); Mettez à jour votre `nuxt.config.js`:

```js
// nuxt.config.js
import hooks from './hooks'
export default {
  router: {
    base: '/portal'
  }
  hooks: hooks(this)
}
```

Ensuite, créez quelques fichiers;

1. `hooks/index.js`, module d'écouteur

   ```js
   // file: hooks/index.js
   import render from './render'

   export default nuxtConfig => ({
     render: render(nuxtConfig)
   })
   ```

1. `hooks/render.js`, écouteur de rendu

   ```js
   // file: hooks/render.js
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

1. `hooks/route-redirect-portal.js`, le middleware lui-même

   ```js
   // file: hooks/route-redirect-portal.js

   /**
    * L'écouteur du middleware Nuxt pour rediriger de / ver /portal (ou tout ce que nous avons défini dans nuxt.config.js)
    *
    * Doit être la même version que connect
    * {@link node_modules/connect/package.json}
    */
   import parseurl from 'parseurl'

   /**
    * Connectez le middleware pour gérer la redirection vers la racine de contexte d'application Web souhaitée.
    *
    * Notez que les documents Nuxt manquent d'expliquer comment utiliser les écouteurs.
    * Ceci est un exemple de routeur pour aider à expliquer.
    *
    * Voir une belle mise en œuvre d'inspiration:
    * - https://github.com/nuxt/nuxt.js/blob/dev/examples/with-cookies/plugins/cookies.js
    * - https://github.com/yyx990803/launch-editor/blob/master/packages/launch-editor-middleware/index.js
    *
    * [http_class_http_clientrequest]: https://nodejs.org/api/http.html#http_class_http_clientrequest
    * [http_class_http_serverresponse]: https://nodejs.org/api/http.html#http_class_http_serverresponse
    *
    * @param {http.ClientRequest} req Objet de requête client interne Node.js [http_class_http_clientrequest]
    * @param {http.ServerResponse} res Réponse interne de Node.js [http_class_http_serverresponse]
    * @param {Function} next middleware callback
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

Ainsi, chaque fois qu'un collègue en développement frappe accidentellement `/` pour atteindre le service de développement Web, Nuxt redirigera automatiquement vers `/portal`
