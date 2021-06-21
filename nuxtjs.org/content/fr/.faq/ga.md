---
title: Intégration de Google Analytics
description: Comment intégrer Google Analytics avec NuxtJS ?
category: configuration
position: 9
---

Tout d'abord consultez le [module officiel Google Analytics](https://github.com/nuxt-community/analytics-module) pour Nuxt.js.

Ensuite, pour utiliser [Google Analytics](https://www.google.com/analytics/) avec votre application Nuxt.js, nous recommandons de créer un plugin `plugins/ga.js` :

```js
/* eslint-disable */

export default ({ app }) => {
  /*
   ** Seulement exécuté côté client et en mode production
   */
  if (process.env.NODE_ENV !== 'production')
    return /*
     ** Inclusion du script Google Analytics
     */
  ;(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r
    ;(i[r] =
      i[r] ||
      function () {
        ;(i[r].q = i[r].q || []).push(arguments)
      }),
      (i[r].l = 1 * new Date())
    ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  )
  /*
   ** Affecter la page courante
   */
  ga('create', 'UA-XXXXXXXX-X', 'auto')
  /*
   ** Chaque fois que la route change
   */
  app.router.afterEach((to, from) => {
    /*
     ** Nous expliquons à Google Analytics d'ajouter une `pageview`
     */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
```

> Remplacez `UA-XXXXXXXX-X` par votre ID de suivi Google Analytics.

Puis nous expliquons à Nuxt.js d'importer le plugin dans notre application principale :

`nuxt.config.js`

```js
export default {
  plugins: [{ src: '~plugins/ga.js', mode: 'client' }]
}
```

Voilà, Google Analytics est intégré dans notre application Nuxt.js et suivra chaque page vue !

<div class="Alert Alert--nuxt-green">

<b>Info :</b> cette méthode est valable pour n'importe quel autre service de suivi.

</div>
