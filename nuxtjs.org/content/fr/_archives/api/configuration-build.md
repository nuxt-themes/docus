---
title: 'API: La propriété build'
description: Nuxt.js vous permet de personnaliser la configuration de webpack pour créer votre application web comme vous le souhaitez.
menu: build
category: configuration
position: 101
---

> Nuxt.js vous permet de personnaliser la configuration de webpack pour créer votre application web comme vous le souhaitez.

## analyze

> Nuxt.js utilise [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) pour vous permettre de visualiser vos paquets et comment les optimiser.

- Type: `Boolean` ou `Object`
- Par défaut: `false`

Si c'est un objet, voir les propriétés disponibles [ici](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

Exemple (`nuxt.config.js`):

```js
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

<div class="Alert Alert--teal">

**Info:** vous pouvez utiliser la commande `yarn nuxt build --analyze` ou `yarn nuxt build -a` pour construire votre application et lancer l'analyseur de paquet [http://localhost:8888](http://localhost:8888). Si vous n'utilisez pas `yarn`, vous pouvez exécuter la commande avec `npx`.

</div>

## babel

> Personnalisez la configuration Babel pour les fichiers JavaScript et Vue. `.babelrc` est ignoré par défaut.

- Type: `Object` Voir les [options](https://github.com/babel/babel-loader#options) de `babel-loader` ainsi que les [options](https://babeljs.io/docs/en/options) de `babel`
- Par défaut:

  ```js
  {
    babelrc: false,
    cacheDirectory: undefined,
    presets: ['@nuxt/babel-preset-app']
  }
  ```

Les cibles par défaut de [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/blob/dev/packages/babel-preset-app/src/index.js) sont `ie: '9'` dans la version `client`, et `node: 'current'` dans la version `server`.

### presets

- Type: `Function`
- Argument:
  1. `Object`: { isServer: true | false }
  2. `Array`:
     - le nom du préréglage `@nuxt/babel-preset-app`
     - [`options`](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app#options) de `@nuxt/babel-preset-app`

**Remarque**: Les pré-réglages configurés dans `build.babel.presets` seront appliqués à la fois à la génération du client et du serveur. La cible sera fixée par Nuxt en conséquence (client/serveur). Si vous souhaitez configurer le préréglage différemment pour le client ou la version du serveur, veuillez utiliser `presets` comme fonction:

> Nous **recommandons vivement** d'utiliser le pré-réglage par défaut au lieu de la personnalisation ci-dessous:

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [ preset, options ]) {
        // changer les options directement
        options.targets = isServer ? ... :  ...
        options.corejs = ...
        // ne retourne rien
      }
    }
  }
}
```

Ou remplacez la valeur par défaut en renvoyant la liste complète des pré-réglages:

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [preset, options]) {
        return [
          [
            preset,
            {
              targets: isServer ? ... :  ...,
              ...options
            }
          ],
          [
            // Autres pré-réglage
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
- ⚠️ Expérimentale

> Activer le cache [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin#options) et [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader)

## crossorigin

- Type: `String`
- Par défaut: `undefined`

  Configurez l'attribut `crossorigin` sur les balises `<link rel="stylesheet">` et `<script>` dans le code HTML généré.

  Plus d'informations: [attributes des paramètres CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)

## cssSourceMap

- Type: `boolean`
- Par défaut: `true` pour le mode dev et `false` pour la production.

> Activer la prise en charge de CSS Source Map

## devMiddleware

- Type: `Object`

Voir [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) pour les options disponibles.

## devtools

- Type: `boolean`
- Par défaut: `false`

Configurer s'il faut autoriser l'inspection [vue-devtools](https://github.com/vuejs/vue-devtools).

Si vous l'avez déjà activé via `nuxt.config.js` ou autrement, devtools est activé indépendamment de l'indicateur.

## extend

> Étendez manuellement la configuration de webpack pour les paquets client et serveur.

- Type: `Function`

L'extension est appelée deux fois, une fois pour le groupe de serveurs et une fois pour le groupe de clients. Les arguments de la méthode sont:

1. L'objet de configuration Webpack,
2. Un objet avec les clés suivantes (tous booléens sauf `loaders`): `isDev`, `isClient`, `isServer`, `loaders`.

<div class="Alert Alert--orange">

**Attention:** Les clés `isClient` et `isServer` fournies sont distinctes des clés disponibles dans [`context`](/api/context). Elles ne **sont pas** dépréciées. N'utilisez pas `process.client` et `process.server` ici car elles ne sont pas définies à ce stade.

</div>

Exemple (`nuxt.config.js`):

```js
export default {
  build: {
    extend(config, { isClient }) {
      // Étendre uniquement la configuration de webpack pour le paquet client
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
```

Si vous souhaitez en savoir plus sur notre configuration de webpack par défaut, jetez un œil à notre [répertoire webpack](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config).

### loaders in extend

`loaders` a la même structure d'objet que [build.loaders](#loaders), afin que vous puissiez modifier les options des chargement à l'intérieur de `extend`.

Exemple (`nuxt.config.js`):

```js
export default {
  build: {
    extend(config, { isClient, loaders: { vue } }) {
      // Étendre uniquement la configuration de webpack pour le paquet client
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  }
}
```

## extractCSS

> Active l'extraction CSS commune à l'aide du moteur de rendu Vue Serveur [lignes directrices](https://ssr.vuejs.org/en/css.html).

- Type: `Boolean`
- Par défaut: `false`

En utilisant [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/) sous le capot, tous vos CSS seront extraits dans des fichiers séparés, généralement un par composant. Cela permet de mettre en cache votre CSS et JavaScript séparément et vaut la peine d'essayer si vous avez beaucoup de CSS globaux ou partagés.

<div class="Alert Alert--teal">

**Remarque:** Il y avait un bug avant Vue 2.5.18 qui supprimait les importations CSS critiques lors de l'utilisation de ces options.

</div>

Vous voudrez peut-être extraire tout votre CSS dans un seul fichier. Il existe une solution pour cela:

<div class="Alert Alert--orange">
⚠️ Il n'est pas recommandé d'extraire tout dans un seul fichier.
L'extraction dans plusieurs fichiers CSS est meilleure pour la mise en cache et l'isolation de préchargement.
Cela peut également améliorer les performances des pages en téléchargeant et en résolvant uniquement les ressources
nécessaires.
</div>

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

> Personnalisez les noms de fichiers des paquets.

- Type: `Object`
- Par défaut:

  ```js
  {
    app: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
    chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
    css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
    img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
    font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
    video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
  }
  ```

Cet exemple modifie les noms des fichiers en identifiants numériques (`nuxt.config.js`):

```js
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    }
  }
}
```

Pour en savoir un peu plus sur l'utilisation des manifestes, jetez un œil à la [documentation webpack](https://webpack.js.org/guides/code-splitting/).

## friendlyErrors

- Type: `Boolean`
- Par défaut: `true` (Superposition activée)

Active ou désactive la superposition fournie par [FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin)

## hardSource

- Type: `Boolean`
- Par défaut: `false`
- ⚠️ Expérimentale

Activez [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) pour une mise en cache améliorée

## hotMiddleware

- Type: `Object`

Voir [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) pour les options disponibles.

## html.minify

- Type: `Object`
- Par défaut:

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

**Attention:** Si vous apportez des modifications à `html.minify`, elles ne seront pas fusionnées avec les valeurs par défaut!

Configuration du plugin [html-minifier](https://github.com/kangax/html-minifier) utilisé pour minimiser les fichiers HTML créés pendant le processus de construction (seront appliqués pour _tous les modes_).

## indicator

> Affichage de l'indicateur de construction pour le remplacement à chaud du module en cours de développement (disponible dans `v2.8.0+`)

- Type: `Boolean`
- Par défaut: `true`

![nuxt-build-indicator](https://user-images.githubusercontent.com/5158436/58500509-93ba0f80-8197-11e9-8524-e115c6d32571.gif)

## loaders

> Personnalisez les options des chargements Webpack intégrés Nuxt.js.

- Type: `Object`
- Par défaut:

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

> Remarque: En plus de spécifier les configurations dans `nuxt.config.js`, il peut également être modifié par [build.extend](#extend)

### loaders.file

> Plus de détails dans [file-loader options](https://github.com/webpack-contrib/file-loader#options).

### loaders.fontUrl et loaders.imgUrl

> Plus de détails dans [url-loader options](https://github.com/webpack-contrib/url-loader#options).

### loaders.pugPlain

> Plus de détails dans [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) ou [Pug compiler options](https://pugjs.org/api/reference.html#options).

### loaders.vue

> Plus de détails dans [vue-loader options](https://vue-loader.vuejs.org/options.html).

### loaders.css et loaders.cssModules

> Plus de détails dans [css-loader options](https://github.com/webpack-contrib/css-loader#options). Remarque: chargement des options cssModules pour l'utilisation des [modules CSS](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules)

### loaders.less

> Vous pouvez passer toutes les options moins spécifiques à `less-loader` via `loaders.less`. Voir la [documentation de Less](http://lesscss.org/usage/#command-line-usage-options) pour toutes les options disponibles.

### loaders.sass and loaders.scss

> Voir la documentation [Sass](https://github.com/sass/dart-sass#javascript-api) pour toutes les options Sass disponibles. Remarque: `loaders.sass` est pour la [syntaxe indentée Sass](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html)

### loaders.vueStyle

> Plus de détails dans [vue-style-loader options](https://github.com/vuejs/vue-style-loader#options).

## optimization

- Type: `Object`
- Par défaut:

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

La valeur par défaut de `splitChunks.name` est `true` en mode `dev` ou `analyze`.

Vous pouvez définir `minimizer` sur un tableau personnalisé de plugins ou définir `minimize` sur `false` pour désactiver tous les minimiseurs. (`minimize` est désactivé par défaut pour le développement)

Voir [l'optimisation de Webpack](https://webpack.js.org/configuration/optimization).

## optimizeCSS

- Type: `Object` or `Boolean`
- Par défaut:
  - `false`
  - `{}` lorsque extractCSS est activé

Options du plugin OptimizeCSSAssets.

Voir [NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin).

## parallel

- Type: `Boolean`
- Par défaut: `false`
- ⚠️ Expérimentale

> Activez [thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader) dans la construction de webpack

## plugins

> Ajout de plugins webpack

- Type: `Array`
- Par défaut: `[]`

Exemple (`nuxt.config.js`):

```js
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

> Personnalisez le plugin [de chargement PostCSS](https://github.com/postcss/postcss-loader#usage).

- Type: `Array` (hérité, remplacera les valeurs par défaut), `Object` (recommandé), `Function` ou `Boolean`

  **Remarque:** Nuxt.js a appliqué [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env). Par défaut, il active les [fonctionnalités Stage 2](https://cssdb.org/) et [Autoprefixer](https://github.com/postcss/autoprefixer), vous pouvez utiliser `build.postcss.preset` pour le configurer.

- Par défaut:

  ```js
  {
    plugins: {
      'postcss-import': {},
      'postcss-url': {},
      'postcss-preset-env': this.preset,
      'cssnano': { preset: 'default' } // disabled in dev mode
    },
    order: 'presetEnvAndCssnanoLast',
    preset: {
      stage: 2
    }
  }
  ```

Vos paramètres de plugin personnalisés seront fusionnés avec les plugins par défaut (sauf si vous utilisez un `Array` à la place d'un `Object`).

Exemple (`nuxt.config.js`):

```js
export default {
  build: {
    postcss: {
      plugins: {
        // Désactiver `postcss-url`
        'postcss-url': false,
        // Ajouter quelques plugins
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

Si la configuration postcss est un `Object`, `order` peut être utilisé pour définir l'ordre des plugins:

- Type: `Array` (noms de plugins ordonnés), `String` (nom prédéfini ordonné), `Function`
- Par défaut: `cssnanoLast` (mettre `cssnano` en dernier)

Exemple (`nuxt.config.js`):

```js
export default {
  build: {
    postcss: {
      // nom prédéfini
      order: 'cssnanoLast',
      // noms de plugins ordonnés
      order: ['postcss-import', 'postcss-preset-env', 'cssnano']
      // Fonction pour calculer l'ordre des plugins
      order: (names, presets) => presets.cssnanoLast(names)
    }
  }
}
```

### postcss plugins & nuxt-tailwindcss

Si vous souhaitez appliquer le plugin postcss (par exemple postcss-pxtorem) sur la configuration de nuxt-tailwindcss, vous devez changer l'ordre et charger tailwindcss en premier.

**Cette configuration n'a aucun impact sur le nuxt-purgecss.**

Exemple (`nuxt.config.js`):

```js
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
- Par défaut: activé par l'argument de ligne de commande `--profile`

> Activer le profileur dans [WebpackBar](https://github.com/nuxt/webpackbar#profile)

## publicPath

> Nuxt.js vous permet de télécharger vos fichiers dist sur votre CDN pour des performances maximales, il suffit de définir le `publicPath` sur votre CDN.

- Type: `String`
- Par défaut: `'/_nuxt/'`

Exemple (`nuxt.config.js`):

```js
export default {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

Ensuite, lorsque vous lancez `nuxt build`, téléchargez le contenu du répertoire `.nuxt/dist/client` sur votre CDN et voilà!

## quiet

> Supprime la plupart des générations de traces de sortie

- Type: `Boolean`
- Par défaut: activé lorsqu'un environnement `CI` ou `test` est détecté par [std-env](https://github.com/blindmedia/std-env)

## splitChunks

- Type: `Object`
- Par défaut:

  ```js
  {
    layouts: false,
    pages: true,
    commons: true
  }
  ```

Si diviser les codes pour `layout`, `pages` et `commons` (bibliothèques communes: vue|vue-loader|vue-router|vuex...).

## ssr

> Crée un paquet webpack spécial pour le rendu SSR.

- Type: `Boolean`
- Par défaut: `true` pour le mode universel et `false` pour le mode spa

Cette option est automatiquement définie en fonction de la valeur de `mode` si elle n'est pas fournie.

## styleResources

- Type: `Object`
- Par défaut: `{}`

<div class="Alert Alert--orange">

**Attention:** Cette propriété est dépréciée. Veuillez utiliser [style-resources-module](https://github.com/nuxt-community/style-resources-module/) à la place pour de meilleures performances et un meilleur rendu!

</div>

Ceci est utile lorsque vous devez injecter des variables et des mixins dans vos pages sans avoir les importer à chaque fois.

Nuxt.js utilise [style-resources-loader](https://github.com/yenshih/style-resources-loader) pour obtenir ce comportement.

Vous devez spécifier les motifs/chemin que vous souhaitez inclure pour les pré-processeurs donnés: `less`, `sass`, `scss` ou `stylus`.

Vous ne pouvez pas utiliser d'alias de chemin ici (`~` et `@`), vous devez utiliser des chemins relatifs ou absolus.

`nuxt.config.js`:

```js
{
  build: {
    styleResources: {
      scss: './assets/variables.scss',
      less: './assets/*.less',
      // sass: ...,
      // scss: ...
      options: {
        // Voir https://github.com/yenshih/style-resources-loader#options
        // Sauf la propriété `patterns`
      }
    }
  }
}
```

## templates

> Nuxt.js vous permet de fournir vos propres modèles qui seront rendus en fonction de la configuration de Nuxt. Cette fonctionnalité est particulièrement utile pour une utilisation avec [modules](/guide/modules).

- Type: `Array`

Exemple (`nuxt.config.js`):

```js
export default {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` peut être absolu ou relatif
        dst: 'support.js', // `dst` est relative au dossier du projet `.nuxt`
        options: {
          // Les options sont fournies au modèle comme la clé `options`
          live_chat: false
        }
      }
    ]
  }
}
```

Les modèles sont rendues à l'aide de [`lodash.template`](https://lodash.com/docs/#template), vous pouvez en savoir plus sur leur utilisation [ici](https://github.com/learn-co-students/javascript-lodash-templates-lab-v-000).

## terser

- Type: `Object` or `Boolean`
- Par défaut:

```js
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

Option du plugin Terser. Définir sur `false` pour désactiver ce plugin.

`sourceMap` sera activée lorsque webpack `config.devtool` trouvera `source-?map`

Voir [webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin).

## transpile

- Type: `Array<String | RegExp | Function>`
- Par défaut: `[]`

Si vous souhaitez transpiler des dépendances spécifiques avec Babel, vous pouvez les ajouter dans `build.transpile`. Chaque élément transpilé peut être un nom de package, une chaîne ou un objet regex correspondant au nom de fichier de la dépendance.

À partir de `v2.9.0`, vous pouvez également utiliser une fonction pour transpiler conditionnellement, la fonction recevra un objet (`{ isDev, isServer, isClient, isModern, isLegacy }`):

```js
{
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'ky']
  }
}
```

## vueLoader

> Remarque: Cette configuration a été supprimée depuis Nuxt 2.0, veuillez utiliser [`build.loaders.vue`](#loaders) à la place.

- Type: `Object`
- Par défaut:

  ```js
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

> Spécifiez les [options de Vue Loader](https://vue-loader.vuejs.org/options.html).

## watch

> Vous pouvez fournir vos fichiers personnalisés à regarder et à régénérer après les modifications. Cette fonctionnalité est particulièrement utile pour une utilisation avec [modules](/guide/modules).

- Type: `Array<String>`

```js
export default {
  build: {
    watch: ['~/.nuxt/support.js']
  }
}
```

## followSymlinks

> Par défaut, le processus de génération n'analyse pas les fichiers à l'intérieur des liens symboliques. Ce booléen les inclut, permettant ainsi l'utilisation de liens symboliques dans des dossiers tels que le dossier "pages", par exemple.

- Type: `Boolean`

```js
export default {
  build: {
    followSymlinks: true
  }
}
```
