---
title: Ressources
description: Nuxt utilise vue-loader, file-loader et url-loader avec webpack par défaut pour servir les fichiers statiques mais vous pouvez également utiliser un répertoire `static` pour les fichiers statiques.
category: getting-started
position: 107
---

> Par défaut, Nuxt utilise vue-loader, file-loader et url-loader avec webpack pour servir les fichiers statiques. Vous pouvez également utiliser un répertoire `static` pour les fichiers statiques.

## Avec webpack

Par défaut, [vue-loader](http://vue-loader.vuejs.org/) traite automatiquement vos fichiers de styles et vos templates à l'aide de `css-loader` et du compilateur de template de Vue. Dans ce processus de compilation, toutes les URL des fichiers comme `<img src="...">`, `background: url(...)` et les CSS `@import` sont résolus en tant que dépendances des modules.

Imaginons par exemple cette arborescence :

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

Dans votre CSS, si vous utilisez `url('~assets/image.png')`, cela sera _transformé_ en `require('~/assets/image.png')`.

<div class="Alert Alert--orange">

**Attention:** À partir de Nuxt 2.0 l'alias `~/` n'est plus résolu correctement dans vos fichiers CSS. Vous devez utiliser `~assets` (sans le slash) ou l'alias `@` dans la référence CSS `url`, par exemple `background: url("~assets/banner.svg")`

</div>

Ou si vous référencez cette image dans `pages/index.vue` :

```html
<template>
  <img src="~/assets/image.png" />
</template>
```

Ce sera compilé en :

```js
createElement('img', { attrs: { src: require('~/assets/image.png') } })
```

Puisque que les fichiers `.png` ne sont pas des fichiers JavaScript, Nuxt.js configure webpack pour utiliser [file-loader](https://github.com/webpack/file-loader) et [url-loader](https://github.com/webpack/url-loader) afin de pouvoir s'en charger à votre place.

Les avantages de ces chargeurs sont :

- `file-loader` vous laisse définir où copier et placer les ressources, et comment les nommer en utilisant des hashs de version pour un meilleur cache. En production, vous bénéficierez par défaut de la mise en cache à long terme !
- `url-loader` vous permet d'insérer de façon conditionnelle un fichier en tant qu'URL encodée en base 64 si sa taille est inférieure à un seuil donné. Cela peut réduire le nombre de demandes HTTP pour les fichiers triviaux. Si la taille du fichier est supérieure au seuil, il retombe automatiquement sur file-loader.

Pour ces deux chargeurs, la configuration par défaut est la suivante :

```js
// https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L297-L316
;[
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 ko
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 ko
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

Ce qui signifie que tous les fichiers inférieurs à 1 ko seront intégrés comme URL base-64. Sinon, l'image / police sera copiée dans son dossier correspondant (dans le répertoire `.nuxt`) avec un nom contenant des hashs de version pour une meilleure mise en cache.

Lors du lancement de notre application avec `nuxt`, notre template dans `pages/index.vue` :

```html
<template>
  <img src="~/assets/image.png" />
</template>
```

Sera transformé en :

```html
<img src="/_nuxt/img/image.0c61159.png" />
```

Si vous désirez modifier la configuration de ces loaders, merci d'utiliser [build.extend](/api/configuration-build#extend).

## Avec des fichiers statiques

Si vous ne souhaitez pas utiliser les ressources à l'aide de webpack à partir du répertoire `assets`, vous pouvez créer et utiliser le répertoire `static` (dans le répertoire racine du projet).

Tous les fichiers inclus seront automatiquement servis par Nuxt et accessibles via l'URL racine du projet. (`static/favicon.ico` sera disponible à l'adresse `localhost:3000/favicon.ico`)

Cette option est utile pour les fichiers tels que `robots.txt`, `sitemap.xml` ou `CNAME` (Ce qui est important pour le déploiement des pages GitHub).

Dans votre code, vous pouvez ensuite référencer ces fichiers relativement à la racine (`/`) :

```html
<!-- Image statique du répertoire `static` -->
<img src="/mon-image.png" />

<!-- Image avec webpack du répertoire `assets` -->
<img src="~/assets/mon-image-2.png" />
```
