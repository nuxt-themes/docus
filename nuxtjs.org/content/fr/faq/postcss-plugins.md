---
title: Comment ajouter des plugins PostCSS?
description: Comment ajouter des plugins PostCSS dans NuxtJS?
category: configuration
position: 4
---

### Méthode recommandée

S'il est présent, renommez ou supprimez le `postcss.config.js` dans votre répertoire de projet. Ensuite, dans votre fichier `nuxt.config.js`, ajoutez ce qui suit:

```js
export default {
  build: {
    postcss: {
      // Ajouter des noms de plugins comme clé et des arguments comme valeur
      // Installez-les avant comme dépendances avec npm ou yarn
      plugins: {
        // Désactiver un plugin en passant false comme valeur
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // Modifier les paramètres postcss-preset-env
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```

### Méthode héritée

**⚠️ Avertissement: c'est obsolète.**

Utilisez `postcss.config.js`, par exemple:

```js
const join = require('path').join
const tailwindJS = join(__dirname, 'tailwind.js')

module.exports = {
  plugins: [require('tailwindcss')(tailwindJS), require('autoprefixer')]
}
```
