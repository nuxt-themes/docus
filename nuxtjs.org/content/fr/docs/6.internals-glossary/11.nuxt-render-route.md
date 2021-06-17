---
title: 'nuxt.renderRoute(route, context)'
description: Rendu d'une route spécifique avec un contexte donné.
menu: nuxt.renderRoute
category: internals-glossary
position: 11
---

- Type: `Function`
- Arguments:
  1. `String` : route to render
  2. _Optional_, `Object`, context given, available keys: `req` & `res`
- Returns: `Promise`
  - `html`: `String`
  - `error`: `null` or `Object`
  - `redirected`: `false` or `Object`

> Rendu d'une route spécifique avec un contexte donné.

Cette méthode doit être utilisée principalement à des fins d'essai ainsi qu'avec [`nuxt.renderAndGetWindow`](/docs/2.x/internals-glossary/nuxt-render-and-get-window).

<base-alert>

`nuxt.renderRoute` doit être exécuté après le processus de construction en mode production.

</base-alert>

```js
const { loadNuxt, build } = require('nuxt')

async function start() {
  // Récupè une instance Nuxt pour commencer (en mode production)
  // Assurez-vous d'avoir exécuté `nuxt build` avant de lancer ce script
  const nuxt = await loadNuxt({ for: 'start' })

  const { html, error, redirected } = await nuxt.renderRoute('/')

  // `html` sera toujours une chaîne de caractères

  // `error` ne sera pas nulle lorsque la mise en page de l'erreur est affichée, le format de l'erreur l'est :
  // { statusCode: 500, message: 'Mon message d\'erreur' }

  // `redirected` n'est pas `false` lorsque `redirect()` a été utilisé dans `asyncData()` ou `fetch()`.
  // { path: '/other-path', query: {}, status: 302 }
}

start()
```

### Prochaine étape

<base-alert type="next">

Consultez le [Glossaire des composants](/docs/2.x/components-glossary/pages-fetch)

</base-alert>
