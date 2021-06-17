---
title: La propriété css
description: Nuxt.js permet aux fichiers/modules/librairies que l'on veut d'être définis de manière globale (inclus dans chaque page).
menu: css
category: configuration-glossary
position: 4
---

> Nuxt.js permet aux fichiers/modules/librairies que l'on veut d'être définis de manière globale (inclus dans chaque page).

Si on veut utiliser `SASS`, il faut bien faire attention à avoir les packages `node-sass` et `sass-loader` d'installés. Si ce n'est pas encore le cas, on peut faire:

```sh
npm install --save-dev node-sass sass-loader
```

- Type: `Array`
  - Items: `string`

```js{}[nuxt.config.js]
export default {
  css: [
    // charge un module Node.js directement (ici c'est un fichier SASS)
    'bulma',
    // fichier CSS dans le projet
    '@/assets/css/main.css',
    // fichier SCSS dans le projet
    '@/assets/css/main.scss'
  ]
}
```

Nuxt.js va automatiquement deviner le type de fichier par son extension et utiliser le loader du pré-processeur adéquat pour Webpack. Nous aurons cependant besoin d'installer le loader requis si nous avons besoin de l'utiliser.

### Extensions de style

On peut omettre l'extension de nos fichiers CSS/SCSS/Postcss/Less/Stylus/... listés dans le tableau `css` du fichier `nuxt.config.js`.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

<base-alert>

Si nous avons deux fichiers du même nom, par ex `main.scss` et `main.css` et si on ne spécifie par l'extension dans le tableau `css` par ex `css: ['~/assets/css/main']` alors seulement un fichier sera chargé en fonction de l'ordre défini par `styleExtensions`. Dans ce cas, le fichier `css` sera chargé et le `scss` sera ignoré parce que l'extension `css` arrive en premier dans le tableau `styleExtension`.

</base-alert>

Ordre par défaut: `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`
