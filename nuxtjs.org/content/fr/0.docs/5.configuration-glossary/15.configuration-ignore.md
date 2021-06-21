---
title: La propriété ignore
description: Définit les fichiers à ignorer pour l'application Nuxt.js
menu: ignore
category: configuration-glossary
position: 14
---

## .nuxtignore

On peut utiliser un fichier `.nuxtignore` pour dire à Nuxt.js d'ignorer des fichiers `layout`, `page`, `store` et `middleware` à la racine du projet (`rootDir`) durant la phase de build. Le fichier `.nuxtignore` est sujet à la même spécification que les fichiers `.gitignore` et `.eslintignore`, dans lesquels chaque ligne est un _glob pattern_ indiquant quels fichiers devraient être ignorés.

Par exemple:

```
# ignore le layout foo.vue
layouts/foo.vue
# ignore les fichiers layout dont le nom finit par un `-ignore.vue`
layouts/*-ignore.vue

# ignore la page bar.vue
pages/bar.vue
# ignore la page à l'intérieur du répertoire ignore
pages/ignore/*.vue

# ignore le store baz.js
store/baz.js
# ignore les fichiers store qui match *.test.*
store/ignore/*.test.*

# ignore les fichiers middleware dans le répertoire foo sauf foo/bar.js
middleware/foo/*.js
!middleware/foo/bar.js
```

> Plus de détails peuvent être trouvés dans la documentation du [gitignore](https://git-scm.com/docs/gitignore).

## La propriété ignorePrefix

- Type: `String`
- Par défaut: `'-'`

> N'importe quel fichier dans `pages/`, `layouts/`, `middleware/` ou `store/` sera ignoré durant la phase de build si le nom du fichier commence par le préfixe spécifié par `ignorePrefix`.

Par défaut, tous les fichiers qui commencent par un `-` seront ignorés, tels que `store/-foo.js` et `pages/-bar.vue`. Cela permet de pouvoir garder des tests, utilitaires et composants avec leur appelants sans qu'ils ne soient eux même convertis en routes, stores, etc...

## La propriété ignore

- Type: `Array`
- Par défaut: `['**/*.test.*']`

> Encore plus personnalisable que `ignorePrefix`: tous les fichiers qui match les _glob patterns_ spécifiés dans `ignore` seront ignorés lors de la phase de build.

## ignoreOptions

`nuxtignore` utilise `node-ignore` de manière implicite, `ignoreOptions` peut donc être configuré comme les `options` dans `node-ignore`.

```js{}[nuxt.config.js]
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```
