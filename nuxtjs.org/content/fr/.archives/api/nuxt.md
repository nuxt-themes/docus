---
title: 'API : Nuxt(options)'
description: Vous pouvez utiliser Nuxt.js par programmation et l'utiliser en tant que middleware vous donnant la possibilité de créer votre propre serveur pour le rendu de vos applications web.
menu: Usage
category: programmatically
position: 201
---

Vous voudrez peut-être utiliser votre propre serveur avec vos middlewares et votre API. C'est pourquoi vous pouvez utiliser Nuxt.js par programmation.

Vous pouvez inclure Nuxt.js ainsi :

```js
const { Nuxt, Builder } = require('nuxt')
```

## Constructeur Nuxt

Pour voir la liste des options à fournir à Nuxt.js, consultez la section configuration.

```js
// Inclure les modules `Nuxt` et `Builder`
const { Nuxt, Builder } = require('nuxt')

// Inclure la configuration Nuxt
const config = require('./nuxt.config.js')

// Créer une nouvelle instance de Nuxt
const nuxt = new Nuxt(config)

// Activer le build live et le rechargement à chaud reloading en développement
if (nuxt.options.dev) {
  new Builder(nuxt).build()
}

// Nous pouvons utiliser `nuxt.render(req, res)` ou `nuxt.renderRoute(route, context)`
```

Vous pouvez jeter un œil aux modules de démarrage [nuxt-express](https://github.com/nuxt/express) et [adonuxt](https://github.com/nuxt/adonuxt) pour démarrer rapidement

### Logs de débogue

Si vous voulez afficher les logs de Nuxt.js, vous pouvez ajouter en première ligne de fichier le code suivant :

```js
process.env.DEBUG = 'nuxt:*'
```
