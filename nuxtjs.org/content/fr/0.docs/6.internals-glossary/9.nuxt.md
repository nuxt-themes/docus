---
title: Utiliser Nuxt.js programmatiquement
description: Vous pouvez utiliser Nuxt.js par programmation pour l'utiliser comme un middleware vous donnant la liberté de créer votre propre serveur pour le rendu de vos applications web.
menu: Utiliser Nuxt.js programmatiquement
category: internals-glossary
position: 9
---

Vous pouvez utiliser votre propre serveur avec votre middleware et votre API. C'est pourquoi vous pouvez utiliser Nuxt.js par programmation.

## Le constructeur Nuxt

Pour voir la liste des options à donner à Nuxt.js, voir la section configuration.

```js
const { loadNuxt, build } = require('nuxt')

// Vérifie si Nuxt fonctionne en mode développement
const isDev = process.env.NODE_ENV !== 'production'

// Obtiens une instance Nuxt prête à l'emploi
const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

// Permet la construction en direct et le rechargement en mode développement
if (isDev) {
  build(nuxt)
}

// Nous pouvons utiliser `nuxt.render(req, res)` ou `nuxt.renderRoute(route, contexte)`.
```

Vous pouvez consulter les sites [nuxt-express](https://github.com/nuxt/express) et [adonuxt](https://github.com/nuxt/adonuxt) pour démarrer rapidement.

### Journaux de debug

Si vous souhaitez afficher les logs de Nuxt.js, vous pouvez ajouter ce qui suit en haut de votre fichier :

```js
process.env.DEBUG = 'nuxt:*'
```
