---
title: 'API: La propriété modulesDir'
description: Définissez le répertoire des modules pour votre application Nuxt.js
menu: modulesDir
category: configuration
position: 120
---

- Type: `Array`
- Par défaut: `['node_modules']`

> Utilisé pour définir les répertoires des modules pour la résolution de chemin, par exemple: Webpack `resolveLoading`, `nodeExternals` et `postcss`.Le chemin de configuration est relatif à [options.rootDir](/api/configuration-rootdir) (par défaut: `process.cwd()`).

Exemple (`nuxt.config.js`):

```js
export default {
  modulesDir: ['../../node_modules']
}
```

La définition de ce champ peut être nécessaire si votre projet est organisé comme un mono-référentiel de style espace de travail Yarn.
