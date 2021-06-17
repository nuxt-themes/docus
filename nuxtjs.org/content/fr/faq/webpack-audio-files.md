---
title: Comment étendre Webpack pour charger des fichiers audio ?
description: Comment étendre Webpack pour charger des fichiers audio ?
category: configuration
position: 11
---

Les fichiers audio doivent être traités par `file-loader`. Ce chargement est déjà inclus dans la configuration Webpack par défaut, mais il n'est pas configuré pour gérer les fichiers audio. Vous devez étendre sa configuration par défaut dans `nuxt.config.js`:

```js
export default {
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
```

Vous pouvez maintenant importer des fichiers audio comme ceci `<audio :src="require('@/assets/water.mp3')" controls></audio>`.

Si vous voulez seulement écrire: `<audio src="@/assets/water.mp3" controls></audio>`, vous devez dire à `vue-loader` de charger automatiquement vos fichiers audio lorsque vous les référencez avec l'attribut `src`:

```js
export default {
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
```
