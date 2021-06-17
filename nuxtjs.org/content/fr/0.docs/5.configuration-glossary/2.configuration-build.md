---
title: La propriété build
description: Nuxt.js nous permet de personnaliser la configuration de webpack afin de build notre application Web comme on l'entend.
menu: build
category: configuration-glossary
position: 1
---

> Nuxt.js nous permet de personnaliser la configuration de webpack afin de build notre application Web comme on l'entend.

## analyze

> Nuxt.js utilise [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) pour nous permettre de visualiser les bundles et trouver comment les optimiser.

- Type: `Boolean` ou `Object`
- Par défaut: `false`

Si c'est un objet, les propriétés disponibles sont visibles [ici](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

```js{}[nuxt.config.js]
export default {
  build: {
    analyze: true,
    // ou
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<base-alert type="info">

**Info**: on peut utiliser la commande `yarn nuxt build --analyze` ou bien `yarn nuxt build -a` pour build notre application et lancer l'analyseur des bundles sur [http://localhost:8888](http://localhost:8888). Si on n'utilise pas `yarn`, on peut exécuter la commande avec `npx`.

</base-alert>

## corejs

> Depuis [Nuxt@2.14](https://github.com/nuxt/nuxt.js/releases/tag/v2.14.0), Nuxt.js va automatiquement détecter la version actuelle de `core-js` dans notre projet. On peut bien sûr aussi lui spécifier la version que l'on veut utiliser.

- Type: `number` | `string` (Les valeurs disponibles sont `'auto'`, `2` et `3`)
- Default: `'auto'`

## babel

> Permet de personnaliser la configuration Babel pour le JavaScript et les fichiers Vue. `.babelrc` est ignoré par défaut.

- Type: `Object`
- Voir les [options](https://github.com/babel/babel-loader#options) de `babel-loader` et les [options](https://babeljs.io/docs/en/options) de `babel`.
- Par défaut:

  ```js
  {
    babelrc: false,
    cacheDirectory: undefined,
    presets: ['@nuxt/babel-preset-app']
  }
  ```

Les cibles par défaut de [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/blob/dev/packages/babel-preset-app/src/index.js) sont `ie: '9'` dans le build `client`, et `node: 'current'` dans le build `serveur`.

### presets

- Type: `Function`
- Argument:
  1. `Object`: { isServer: true | false }
  2. `Array`:
     - nom du preset `@nuxt/babel-preset-app`
     - [`options`](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app#options) de `@nuxt/babel-preset-app`

**Note**: Les presets configurés dans `build.babel.presets` seront appliqués tant au build du client que celui du serveur. La cible sera choisie par Nuxt.js en conséquence (client/serveur). Si on veut configurer le preset différemment, il faut utiliser `presets` en tant que fonction:

> Nous recommandons **très chaudement** d'utiliser la configuration par défaut au lieu du code plus bas

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [ preset, options ]) {
        // on change directement les options
        options.targets = isServer ? ... :  ...
        options.corejs = ...
        // renvoie rien
      }
    }
  }
}
```

On peut aussi écraser les valeurs par défaut en retournant la liste complète des presets:

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [preset, options]) {
        return [
          [
            preset,
            {
              buildTarget: isServer ? 'server' : 'client',
              ...options
            }
          ],
          [
            // d'autres presets
          ]
        ]
      }
    }
  }
}
```

## cache

- Type: `Boolean`
- Par défaut: `false`
- ⚠️ Expérimental

> Active le cache de [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin#options) et de [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader)

## cssSourceMap

- Type: `boolean`
- Par défaut: `true` pour le développement et `false` pour la production.

> Active le support du CSS Source Map

## devMiddleware

- Type: `Object`

Voir [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) pour les options disponibles.

## devtools

- Type: `boolean`
- Par défaut: `false`

Définit le droit d'afficher l'inspection des [vue-devtools](https://github.com/vuejs/vue-devtools).

Si cela a déjà été activé grâce au fichier `nuxt.config.js` ou autrement, les devtools seront activés, peu importe le flag.

## extend

> Permet de personnaliser manuellement la configuration de Webpack pour les bundles client et serveur.

- Type: `Function`

`extend` est appelé deux fois, une fois pour le bundle du serveur, et une fois pour celui du client. Les arguments de la méthode sont:

1. L'objet de configuration Webpack
2. L'objet avec les clés suivantes (tous sont des booléens sauf `loaders`): `isDev`, `isClient`, `isServer` et `loaders`.

<base-alert>

**Attention**: Les clés `isClient` et `isServer` fournies n'ont rien à voir avec celles présentes dans le [`context`](/docs/2.x/internals-glossary/context). Elles ne sont **pas** dépréciées. Il ne faut en outre pas utiliser `process.client` et `process.server` ici car ils seront `undefined` à ce niveau.

</base-alert>

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      // personnalisotion de la configuration Webpack seulement pour le bundle client
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
```

Si on souhaite en savoir davantage sur la configuration Webpack par défaut, il faut aller jeter un coup d'œil au [répertoire de Webpack](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config).

### Les loaders dans extend

Les `loaders` ont la même structure au niveau de l'objet que [build.loaders](#loaders), on peut donc changer les options des `loaders` à l'intérieur d'`extend`.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient, loaders: { vue } }) {
      // personnalisotion de la configuration Webpack seulement pour le bundle client
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  }
}
```

## extractCSS

> Permet le `Common CSS Extraction` en utilisant les [directives](https://ssr.vuejs.org/en/css.html) du package `Vue Server Renderer`.

- Type: `Boolean` ou `Object`
- Par défaut: `false`

L'usage de [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/) se fait de manière implicite, en séparant notre CSS dans des fichiers séparés, un par composant en général. Cela permet de mettre en cache notre CSS et notre JavaScript séparément et est sans doute quelque chose à essayer dans le cas où on possède beaucoup de CSS global ou partagé.

Exemple (`nuxt.config.js`):

```js
export default {
  build: {
    extractCSS: true,
    // ou
    extractCSS: {
      ignoreOrder: true
    }
  }
}
```

<base-alert type="info">

**Note**: Il y avait un bug avant Vue 2.5.18 qui enlevait les imports critiques de CSS lors de l'usage de cette option.

</base-alert>

On pourrait souhaiter extraire tout notre CSS dans un seul fichier. Il y a une solution pour cela:

<base-alert>

Ce n'est pas recommandé de tout extraire dans un seul fichier. Extraire dans plusieurs fichiers CSS est meilleur pour la mise en cache et l'isolation dans le cas d'un préchargement. Cela peut aussi améliorer la performance de la page en ne téléchargeant que les ressources dont on a besoin.

</base-alert>

```js
export default {
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
}
```

## filenames

> Permet de personnaliser le nom des fichiers des bundles.

- Type: `Object`
- Par défault:

  ```js
  {
    app: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
    chunk: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
    css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash:7].css',
    img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
    font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
    video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'
  }
  ```

Cet exemple change les noms originaux des fragments en des identifiants numériques:

```js{}[nuxt.config.js]
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    }
  }
}
```

Pour comprendre un peu mieux l'utilisation des `manifests`, il faut se référer à la [documentation de Webpack](https://webpack.js.org/guides/code-splitting/).

<base-alert>

Il faut bien faire attention lorsque l'on utilise des noms de fichiers non hashés en production car la plupart des navigateurs vont mettre en cache la ressource et ne détecteront pas les modifications lors du premier chargement.

</base-alert>

## friendlyErrors

- Type: `Boolean`
- Par défaut: `true` (Affichage sympa activé)

Active ou désactive les indications claires et précises fournies par [FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin).

## hardSource

- Type: `Boolean`
- Par défaut: `false`
- ⚠️ Expérimental

Active le plugin [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) pour une mise en cache améliorée.

## hotMiddleware

- Type: `Object`

Se référer à [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) pour les options disponibles.

## html.minify

- Type: `Object`
- Par défault:

```js
{
  collapseBooleanAttributes: true,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

**Attention**: si l'on fait des changements à `html.minify`, il ne seront pas fusionnés avec les valeurs par défaut !

La configuration pour le plugin [html-minifier](https://github.com/kangax/html-minifier) est là pour minifier les fichiers HTML créés durant le processus de build (la minification sera appliqueé pour _tous les modes_).

## indicator

> Affiche un indicateur de build pour le Hot Module Replacement (HMR) lors du développement. Disponible depuis la `v2.8.0`.

- Type: `Boolean`
- Par défault: `true`

![nuxt-build-indicator](https://user-images.githubusercontent.com/5158436/58500509-93ba0f80-8197-11e9-8524-e115c6d32571.gif)

## loaders

> Permet de personnaliser les options de Nuxt.js par rapport aux loaders intégrés.

- Type: `Object`
- Par défault:

```js
{
  file: {},
  fontUrl: { limit: 1000 },
  imgUrl: { limit: 1000 },
  pugPlain: {},
  vue: {
    transformAssetUrls: {
      video: 'src',
      source: 'src',
      object: 'src',
      embed: 'src'
    }
  },
  css: {},
  cssModules: {
    localIdentName: '[local]_[hash:base64:5]'
  },
  less: {},
  sass: {
    indentedSyntax: true
  },
  scss: {},
  stylus: {},
  vueStyle: {}
}
```

> Note: en plus de spécifier la configuration d ans un fichier `nuxt.config.js`, cela peut aussi être modifié par [build.extend](#extend).

### loaders.file

> Davantage de détails dans les [options de file-loader](https://github.com/webpack-contrib/file-loader#options).

### loaders.fontUrl and loaders.imgUrl

> Davantage de détails dans les [options d'url-loader](https://github.com/webpack-contrib/url-loader#options).

### loaders.pugPlain

> Davantage de détails dans le [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) ou [les options du compilateur Pug](https://pugjs.org/api/reference.html#options).

### loaders.vue

> Davantage de détails dans les [options de vue-loader](https://vue-loader.vuejs.org/options.html).

### loaders.css and loaders.cssModules

> Davantage de détails dans les [options du css-loader](https://github.com/webpack-contrib/css-loader#options).

Note: les [CSS modules](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules) sont des options pour le loader.

### loaders.less

> On peut passer des options spécifique à Less au `less-loader` via `loaders.less`. Se référer à la documentation de [Less](http://lesscss.org/usage/#command-line-usage-options) pour toutes les options disponibles.

### loaders.sass et loaders.scss

> Se référer à la documentation de [Node Sass](https://github.com/sass/node-sass/blob/master/README.md#options) pour toutes les options disponibles de Sass.

> Note: `loaders.sass` est utilisé pour la [Syntaxe Indentée de Sass](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html).

### loaders.vueStyle

> Davantage de détails dans les options de [vue-style-loader](https://github.com/vuejs/vue-style-loader#options).

## optimization

- Type: `Object`
- Par défault:

  ```js
  {
    minimize: true,
    minimizer: [
      // terser-webpack-plugin
      // optimize-css-assets-webpack-plugin
    ],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: undefined,
      cacheGroups: {}
    }
  }
  ```

La valeur par défaut de `splitChunks.name` est `true` dans le mode `dev` ou bien `analyze`.

On peut définir `minimizer` à un tableau personnalisé de plugins ou définir `minimize` à `false` pour désactiver tous les minimiseurs. (`minimize` est désactivé lors du développement par défaut)

Se référer à la documentation sur [l'optimisation de Webpack](https://webpack.js.org/configuration/optimization).

## optimizeCSS

- Type: `Object` ou `Boolean`
- Par défault:
  - `false`
  - `{}` lorsque extractCSS est activé

Les options du plugin OptimizeCSSAssets.

Se référer à [NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin).

## parallel

- Type: `Boolean`
- Par défaut: `false`
- ⚠️ Expérimental

> Active le [thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader) lors du build de Webpack.

## plugins

> Ajoute des plugins Webpack

- Type: `Array`
- Par défault: `[]`

```js{}[nuxt.config.js]
import webpack from 'webpack'
import { version } from './package.json'
export default {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': version
      })
    ]
  }
}
```

## postcss

> Permet de personnaliser les plugins du [PostCSS Loader](https://github.com/postcss/postcss-loader#usage).

- Type: `Array` (legacy, écrasera les valeurs par défaut), `Object` (recommandé), `Function` ou `Boolean`

**Note**: Nuxt.js a appliqué [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env). Par défaut, cela active les [fonctionnalités du niveau 2](https://cssdb.org/) et l'[Autoprefixer](https://github.com/postcss/autoprefixer), on peut utiliser `build.postcss.preset` pour le configurer.

- Par défault:

  ```js{}[nuxt.config.js]
  {
    plugins: {
      'postcss-import': {},
      'postcss-url': {},
      'postcss-preset-env': this.preset,
      'cssnano': { preset: 'default' } // désactivé lors du développement
    },
    order: 'presetEnvAndCssnanoLast',
    preset: {
      stage: 2
    }
  }
  ```

Les paramètres personnalisés du plugin seront fusionnés avec les valeurs par défaut des plugins (à moins qu'on n'utilise un `Array` au lieu d'un `Object`).

```js{}[nuxt.config.js]
export default {
  build: {
    postcss: {
      plugins: {
        // désactive `postcss-url`
        'postcss-url': false,
        // ajouter quelques plugins
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```

Si la configuration postCSS est un `Object`, `order` peut être utilisé pour définir l'ordre du plugin:

- Type: `Array` (nom des plugins rangés), `String` (rangé selon le nom du preset), `Function`
- Par défaut: `cssnanoLast` (`cssnano` est en dernier)

```js{}[nuxt.config.js]
export default {
  build: {
    postcss: {
      // nom du preset
      order: 'cssnanoLast',
      // nom des plugins rangés
      order: ['postcss-import', 'postcss-preset-env', 'cssnano']
      // fonction pour déterminer l'ordre du plugin
      order: (names, presets) => presets.cssnanoLast(names)
    }
  }
}
```

### plugins postcss et nuxt-tailwindcss

Si l'on souhaite appliquer un plugin postCSS (ex: `postcss-pxtorem`) sur une configuration de `nuxt-tailwindcss`, on doit changer l'ordre et charger `tailwindcss` en premier.

**Cette configuration n'a pas d'impact sur `nuxt-purgecss`.**

```js{}[nuxt.config.js]
import { join } from 'path'

export default {
  // ...
  build: {
    postcss: {
      plugins: {
        tailwindcss: join(__dirname, 'tailwind.config.js'),
        'postcss-pxtorem': {
          propList: ['*', '!border*']
        }
      }
    }
  }
}
```

## profile

- Type: `Boolean`
- Par défault: activé avec l'argument `--profile` dans la ligne de commande

> Active le profiler dans [WebpackBar](https://github.com/nuxt/webpackbar#profile)

## publicPath

> Nuxt.js nous permet de téléverser les fichiers présents dans notre répertoire `dist` jusqu'à notre CDN pour des performances maximales, il suffit de définir l'URL de notre CDN dans `publicPath`.

- Type: `String`
- Default: `'/_nuxt/'`

```js{}[nuxt.config.js]
export default {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

Ensuite, lorsque on lance `nuxt build`, il suffit de téléverser le contenu du répertoire `.nuxt/dist/client` dans notre CDN et voilà !

## quiet

> Supprime la majeure partie de la journalisation des builds

- Type: `Boolean`
- Par défault: Activé lorsque l'environment détecté par [std-env](https://github.com/blindmedia/std-env) est égal à `CI` ou `test`.

## splitChunks

- Type: `Object`
- Par défault:

  ```js{}[nuxt.config.js]
  export default {
    build: {
      splitChunks: {
        layouts: false,
        pages: true,
        commons: true
      }
    }
  }
  ```

<!-- If split codes for `layout`, `pages` and `commons` (common libs: vue|vue-loader|vue-router|vuex...). -->

## ssr

> Crée un bundle Webpack spécial pour le rendu côté serveur.

- Type: `Boolean`
- Par défault: `true` pour le mode universel et `false` pour notre soirée SPA

Cette option est automatiquement définie en se basant sur la valeur de `mode` si rien n'est fourni.

## styleResources

- Type: `Object`
- Par défault: `{}`

<base-alert>

**Attention**: cette propriété est dépréciée. Il faudrait utiliser le module [style-resources-module](https://github.com/nuxt-community/style-resources-module/) à la place, pour avoir des performances accrues et une meilleure DX !

</base-alert>

Ceci est utile lorsque on a besoin d'injecter certains variables ou mixins à l'intérieur de nos pages sans avoir besoin de les importer à chaque fois.

Nuxt.js utilise https://github.com/yenshih/style-resources-loader pour réussir ce comportement.

Il y a besoin de spécifier un schéma/un chemin si on veut la partager pour les pre-processors nuls et ajoute des: `less`, `sass`, `scss` ou `stylus`.

On ne peut pas utiliser d'alias de chemin (`~` ou `@`), on aura besoin d'utiliser des chemins relatifs ou absolus.

```js{}[nuxt.config.js]
{
  build: {
    styleResources: {
      scss: './assets/variables.scss',
      less: './assets/*.less',
      // sass: ...,
      // scss: ...
      options: {
        // See https://github.com/yenshih/style-resources-loader#options
        // Sauf la propriété `patterns`
      }
    }
  }
}
```

## templates

> Nuxt.js nous permet d'utiliser nos propres templates qui seront render basés sur les [modules](/docs/2.x/directory-structure/modules).

- Type: `Array`

```js{}[nuxt.config.js]
export default {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` peut être relatif ou absolu
        dst: 'support.js', // `dst` est relative au project `.nuxt` dir
        options: {
          // les options sont passés aux templates grâce à la clé `options`
          live_chat: false
        }
      }
    ]
  }
}
```

Les templates sont render en utilisant [`lodash.template`](https://lodash.com/docs/#template), cela permet d'en savoir plus sur les otages et leur mentalité/adresse psk c'est sincère.

## terser

- Type: `Object` ou `Boolean`
- Par défault:

```js{}[nuxt.config.js]
{
  parallel: true,
  cache: false,
  sourceMap: false,
  extractComments: {
    filename: 'LICENSES'
  },
  terserOptions: {
    output: {
      comments: /^\**!|@preserve|@license|@cc_on/
    }
  }
}
```

Options du plugin Terser. Il suffit de mettre un `false` pour désactiver le plugin.

L'activation de `sourceMap` laissera le commentaire de liaison `//# sourceMappingURL` à la fin de chaque fichier de sortie si webpack `config.devtool` est défini sur `source-map`.

Voir [webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin).

## transpile

- Type: `Array<String | RegExp | Function>`
- Par défault: `[]`

Si on veut transpiler certaines dépendances spécifiques avec Babel, on peut les ajouter dans `build.transpile`. Chaque item transpilé peut être un nom de package, une chaîne de caractères ou un objet regex pour matcher le nom du fichier avec la dépendance que l'on souhaite.

Depuis `v2.9.0`, on peut aussi utiliser une fonction pour rendre la transpilation conditionnelle, la fonction recevra un objet (`{ isDev, isServer, isClient, isModern, isLegacy }`):

```js{}[nuxt.config.js]
{
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'ky']
  }
}
```

## vueLoader

> Note: Cette configuration a été enlevée depuis Nuxt 2.0, il faut maintenant utiliser [`build.loaders.vue`](#loaders) à la place.

- Type: `Object`
- Par défault:

  ```js{}[nuxt.config.js]
  {
    productionMode: !this.options.dev,
    transformAssetUrls: {
      video: 'src',
      source: 'src',
      object: 'src',
      embed: 'src'
    }
  }
  ```

> Pour spécifier les options [Vue Loader Options](https://vue-loader.vuejs.org/options.html).

## watch

> On peut fournir nos propres fichiers personnalisés à surveiller avant de régénérer après des modifications. Cette fonctionnalité est surtout utile à utiliser avec [modules](/docs/2.x/directory-structure/modules).

- Type: `Array<String>`

```js{}[nuxt.config.js]
export default {
  build: {
    watch: ['~/.nuxt/support.js']
  }
}
```

## followSymlinks

> Par défaut, le build process ne scan pas les fichiers avec des liens symboliques. Ce booléen les inclut, et nous permet donc d'avoir des liens symboliques à l'intérieur des répertoires tels que `pages` par exemple.

- Type: `Boolean`

```js{}[nuxt.config.js]
export default {
  build: {
    followSymlinks: true
  }
}
```
