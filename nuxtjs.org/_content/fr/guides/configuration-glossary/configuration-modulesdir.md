---
title: La propriété modulesDir
description: Définit le répertoires des modules pour l'application Nuxt.js
menu: modulesDir
category: configuration-glossary
position: 20
---

- Type: `Array`
- Par défaut: `['node_modules']`

Cette propriété est utilisée pour définir les répertoires des modules afin de déterminer le chemin de résolution. Par ex: le `resolveLoading`, ` nodeExternals` et `postcss` de Webpack. Le chemin de la configuration est relatif par rapport à `options.rootDir` (par défaut: process.cwd()).

```js{}[nuxt.config.js]
export default {
  modulesDir: ['../../node_modules']
}
```

Adapter cet emplacement peut être nécessaire si le projet est organisé en tant que workspace Yarn avec un mono-repo.
