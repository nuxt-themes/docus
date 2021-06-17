---
title: 'API: La propriété ignore'
description: Définissez les fichiers ignorés pour votre application Nuxt.js
menu: ignore
category: configuration
position: 114
---

## .nuxtignore

Vous pouvez utiliser un fichier `.nuxtignore` pour permettre à Nuxt.js d'ignorer les fichiers `layout`, `page`, `store` et `middleware` dans le répertoire racine de votre projet (`rootDir`) pendant la phase de construction. Le fichier `.nuxtignore` est soumis aux mêmes spécifications que les fichiers `.gitignore` et `.eslintignore`, dans lequel chaque ligne est un modèle global indiquant quels fichiers doivent être ignorés.

Par exemple:

```
# ignore la mise en page de foo.vue
layouts/foo.vue
# ignore la mise en page des fichiers qui ont un nom se terminant par -ignore.vue
layouts/*-ignore.vue

# ignore la page bar.vue
pages/bar.vue
# ignore les pages à l'intérieur du dossier ignore
pages/ignore/*.vue

# ignore le store baz.js
store/baz.js
# ignore les fichiers du store qui contiennent *.test.*
store/ignore/*.test.*

# ignore les fichiers middleware sous le dossier foo à l'exception de foo/bar.js
middleware/foo/*.js
!middleware/foo/bar.js
```

> Plus d'informations sur les détails de la spécification dans la [documentation de gitignore](https://git-scm.com/docs/gitignore).

## La propriété ignorePrefix

- Type: `String`
- Par défaut : `'-'`

> Tout fichier dans pages/, layout/, middleware/ ou store/ sera ignoré lors de la construction si son nom de fichier commence par le préfixe spécifié par `ignorePrefix`.

Par défaut, tous les fichiers commençant par `-` seront ignorés, tels que `store/-foo.js` et `pages / -bar.vue`. Cela permet de localiser les tests, les utilitaires et les composants avec leurs appelants sans être eux-mêmes convertis en chemin, store, etc.

## La propriété ignore

- Type: `Array`
- Par défaut : `['**/*.test.*']`

> Plus personnalisable que `ignorePrefix`: tous les fichiers correspondant aux motifs globaux spécifiés dans `ignore` seront ignorés lors de la construction.

## ignoreOptions

`nuxtignore` utilise `node-ignore` sous le capot, `ignoreOptions` peut être configuré comme `options` de `node-ignore`.

Exemple (`nuxt.config.js`, rendre les modèles .nuxtignore sensibles à la casse) :

```js
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```
