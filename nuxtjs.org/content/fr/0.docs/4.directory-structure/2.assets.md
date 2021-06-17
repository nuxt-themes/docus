---
title: assets
description: Le répertoire `assets` contient les ressources comme des fichiers Stylus, du SASS, des images ou des polices de caractères.
position: 2
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/02_assets?fontsize=14&hidenavigation=1&theme=dark
videoScript:
  - assets-video.md
questions:
  - question: Quel répertoire contient les ressources comme des fichiers Stylus, du SASS, des images ou des polices de caractères ?
    answers:
      - static
      - assets
      - pages
    correctAnswer: assets
  - question: Lorsque l'on est dans un template vue, qu'utilise t-on pour avoir accès au répertoire de ressources ?
    answers:
      - '/assets/notre_image.png'
      - '@assets/notre_image.png'
      - '@/assets/notre_image.png'
    correctAnswer: '@/assets/notre_image.png'
  - question: Lorsque l'on est dans un fichier CSS, qu'utilise t-on pour avoir accès au répertoire de ressources ?
    answers:
      - url("@assets/banniere.svg")
      - url("assets/banniere.svg")
      - url("@/assets/banniere.svg")
    correctAnswer: url("@assets/banniere.svg")
  - question: Où importe t-on les feuilles de style CSS globales ?
    answers:
      - dans le fichier index.vue
      - dans le fichier nuxt.config.js
      - dans le fichier du layout par défaut
    correctAnswer: dans le fichier nuxt.config.js
  - question: Quelle propriété est utilisée pour importer une police de caractères de manière globale ?
    answers:
      - font
      - head
      - css
    correctAnswer: head
  - question: Quel loader permet d'encoder un fichier en URL de base-64 ?
    answers:
      - file-loader
      - url-loader
      - image-loader
    correctAnswer: url-loader
  - question: Quel est l'alias pour le répertoire des sources ?
    answers:
      - '@'
      - '@@'
      - '^'
    correctAnswer: '@'
  - question: Quel est l'alias pour le répertoire racine ?
    answers:
      - '@'
      - '@@'
      - '@root'
    correctAnswer: '@@'
---

Le répertoire `assets` contient les ressources comme des fichiers Stylus, du SASS, des images ou des polices de caractères.

## Images:

À l'intérieur de nos templates `vue`, si nous avons besoin de faire un lien vers notre répertoire `assets` (ressources), il faut utiliser `~/assets/notre_image.png` (avec un slash avant les `assets`).

```html
<template>
  <img src="~/assets/notre_image.png" />
</template>
```

À l'intérieur de nos fichiers `CSS`, si nous avons besoin de faire un lien vers notre répertoire `assets` (ressources), il faut utiliser `~/assets/banniere.svg` (sans le slash).

```css
background: url('~assets/banniere.svg');
```

Si l'on travaille avec des images dynamiques, on aura besoin d'utiliser `require`.

```html
<img :src="require(`~/assets/img/${image}.jpg`)" />
```

<base-alert type="next">

Voir les [ressources webpack](/docs/2.x/directory-structure/assets#webpack-assets).

</base-alert>

## Styles:

Nuxt.js nous permet de définir les fichiers/modules/librairies CSS que nous souhaitons utiliser de manière globale (dans chaque page). Dans le fichier de config `nuxt.config.js`, on peut spécifier cela grâce à la propriété `css`:

```js{}[nuxt.config.js]
export default {
  css: [
    // charge un module Node.js directement (ici un fichier SASS)
    'bulma',
    // un fichier CSS dans le projet
    '~/assets/css/main.css',
    // un fichier SCSS dans le projet
    '~/assets/css/main.scss'
  ]
}
```

<base-alert type="info">

Dans le cas où l'on veut utiliser `SASS`, il faut bien faire attention à installer les packages `node-sass` et `sass-loader`.

</base-alert>

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D node-sass sass-loader
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev node-sass sass-loader
```

  </code-block>
</code-group>

Nuxt.js va automatiquement deviner le type de fichier grâce à son extension et utiliser le loader webpack approprié pour le pré-processeur. Nous aurons cependant besoin d'installer le loader requis si nous avons besoin de l'utiliser.

## Fonts:

On peut utiliser des polices de caractères locales en les ajoutant dans le répertoire des ressources. Une fois ajoutées, on peut y avoir accès dans notre CSS en utilisant `@font-face`.

```
-| assets
----| fonts
------| DMSans-Regular.ttf
------| DMSans-Bold.ttf
```

```css{}[assets/main.css]
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Bold.ttf') format('truetype');
}
```

<base-alert type="info">Les fichiers CSS ne sont pas chargés automatiquement. Ajoutez-les en utilisant la [propriété css](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-css/).</base-alert>

<base-alert type="next">

Pour ajouter des polices de caractères externes telles que des Google Fonts, se référer le chapitre sur le [SEO et les méta tags](/docs/2.x/features/meta-tags-seo#external-resources).

</base-alert>

## Ressources de Webpack

Par défaut, Nuxt.js utilise les `vue-loader`, `file-loader` et `url-loader` de Webpack pour délivrer les ressources. On peut aussi utiliser le répertoire statique pour les ressources, ce dernier ne doit cependant pas passer par Webpack.

## Webpack

Le compilateur de templates de Vue s'occupe de process le style (avec `css-loader`) et les fichiers de templates (grâce à [`vue-loader`](http://vue-loader.vuejs.org/)). Durant ce processus, toutes les URL des ressources telles que `<img src="...">`, `background: url(...)` et les `@import` CSS sont résolues en tant que dépendances de modules.

Par exemple, avec cette arborescence de fichiers:

```
-| assets/
----| image.png
-| pages/
----| index.vue
```

Si dans notre CSS, on utilise `url('~assets/image.png')`, ceci sera traduit en `require('~/assets/image.png')`.

<base-alert>

L'alias `~/` ne sera pas résolu correctement dans les fichiers CSS. Il faut bien utiliser `~assets` (**sans le slash**) dans les références CSS `url`, ex: `background: url("~assets/banniere.svg")`.

</base-alert>

Si on référence cette image dans notre fichier `pages/index.vue`:

```html{}[pages/index.vue]
<template>
  <img src="~/assets/image.png" />
</template>
```

Ce sera compilé en:

```js
createElement('img', { attrs: { src: require('~/assets/image.png') } })
```

Parce que `.png` n'est pas un fichier JavaScript, Nuxt.js s'occupe tout seul de demander à Webpack d'utiliser [file-loader](https://github.com/webpack/file-loader) et [url-loader](https://github.com/webpack/url-loader) pour s'occuper de ce format.

Les bénéfices de ces loaders sont les suivants:

`file-loader` s'occupe de définir où copier et placer la ressource, ainsi que comment la nommer en utilisant des hash pour une meilleure mise en cache. En production, on pourra bénéficier d'une mise en cache sur le long terme par défaut !

`url-loader` permet de transformer un fichier en une seule ligne de data URL encodé en base-64 s'il est en dessous d'un certain seuil. Ceci permet de réduire le nombre de requêtes HTTP pour des fichiers anodins. Si la taille du fichier est plus grosse que le seuil fixé, il va utiliser `file-loader` en solution de repli.

Pour ces deux loaders, la configuration par défaut est la suivante:

```js
// https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L297-L316
;[
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

Ce qui veut dire que n'importe quel fichier en dessous de 1 Ko sera mis sur une seule ligne de data URL encodé en base-64. Autrement, l'image/police de caractères sera copiée dans le répertoire correspondant (à l'intérieur du répertoire `.nuxt`) avec un nom comprenant le hash d'une version pour une meilleure mise en cache.

Lorsqu'on lancera l'application `nuxt` avec un template tel que `pages/index.vue`:

```html{}[pages/index.vue]
<template>
  <img src="@/assets/notre_image.png" />
</template>
```

Cela sera transformé en:

```html
<img src="/_nuxt/img/notre_image.0c61159.png" />
```

Si on souhaite changer la configuration d'un des loaders, on trouvera plus de détails à la page de [`build.extend`](/docs/2.x/configuration-glossary/configuration-build#extend).

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

## Les Alias

Par défaut le répertoire des sources (`srcDir`) et le répertoire racine (`rootDir`) sont les mêmes. On peut utiliser l'alias `~` pour le répertoire des sources. Au lieu d'écrire des chemins relatifs tels que `../assets/notre_image.png`, on peut écrire `~/assets/notre_image.png` à la place.

Les deux donneront le même résultat.

```html{}[components/Avatar.vue]
<template>
  <div>
    <img src="../assets/notre_image.png" />
    <img src="~/assets/notre_image.png" />
  </div>
</template>
```

Nous recommandons l'usage de `~` en tant qu'alias. `@` est toujours supporté mais il ne marchera pas dans certains cas tel que les images de background dans le CSS.

On peut utiliser `~~` ou `@@` pour le répertoire racine.

<base-alert type="info">

Astuce: Pour avoir accès à `~` sur un clavier espagnol, il faut utiliser `Option` + `ñ` sur Mac OS ou (`Alt gr` + `4`) sur Windows.

</base-alert>

<quiz :questions="questions"></quiz>
