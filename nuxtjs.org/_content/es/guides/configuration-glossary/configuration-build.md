---
title: 'La propiedad build'
description: Nuxt.js te permite personalizar la configuración de webpack para crear su aplicación web como desee.
menu: build
category: configuration-glossary
position: 1
---

> Nuxt.js te permite personalizar la configuración de webpack para crear su aplicación web como desee.

## analyze

> Nuxt.js usa [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) para permitirle visualizar sus paquetes y cómo optimizarlos.

- Tipo: `Boolean` o `Object`
- Por defecto: `false`

Si es un objeto, mira las propiedades disponibles [aquí](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

```js{}[nuxt.config.js]
export default {
  build: {
    analyze: true,
    // o
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<base-alert type="info">

**Info:** puedes usar el comando `yarn nuxt build --analyze` o `yarn nuxt build -a` para construir su aplicación e iniciar el analizador de paquetes en [http://localhost:8888](http://localhost:8888). Si no estás utilizando `yarn` puedes correr el comando con `npx`.

</base-alert>

## corejs

> A partir de [Nuxt@2.14](https://github.com/nuxt/nuxt.js/releases/tag/v2.14.0) Nuxt detecta automáticamente la versión actual de `core-js` en su proyecto, también puede especificar qué versión desea usar.

- Tipo: `number` | `string` (Los valores validos son `'auto'`, `2` y `3`)
- Por defecto: `'auto'`

## babel

> Personalice la configuración de Babel para archivos JavaScript y Vue. `.babelrc` se ignora de forma predeterminada.

- Tipo: `Object`
- Mira las [opciones](https://github.com/babel/babel-loader#options) para `babel-loader` y las [opciones](https://babeljs.io/docs/en/options) para `babel`
- Por defecto:

  ```js
  {
    babelrc: false,
    cacheDirectory: undefined,
    presets: ['@nuxt/babel-preset-app']
  }
  ```

Los destinos predeterminados de [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/blob/dev/packages/babel-preset-app/src/index.js) son `ie: '9'` en el build del `client`, y `node: 'current'` en el build del `server`.

### presets

- Tipo: `Function`
- Argumento:
  1. `Object`: { isServer: true | false }
  2. `Array`:
     - preset name `@nuxt/babel-preset-app`
     - [`options`](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app#options) de `@nuxt/babel-preset-app`

**Nota**: Los ajustes preestablecidos configurados en `build.babel.presets` se aplicarán tanto al cliente como al servidor. El objetivo será establecido por Nuxt en consecuencia (cliente / servidor). Si desea configurar el preset preestablecido de manera diferente para el cliente o la compilación del servidor, utilice `presets` como función:

> **Recomendamos encarecidamente** utilizar el ajuste predeterminado predeterminado en lugar de la siguiente personalización

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [ preset, options ]) {
        // cambia opciones directamente
        options.targets = isServer ? ... :  ...
        options.corejs = ...
        // no devuelve nada
      }
    }
  }
}
```

O sobrescribe el valor por defecto devolviendo toda la lista de presets:

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
            // Más presets
          ]
        ]
      }
    }
  }
}
```

## cache

- Tipo: `Boolean`
- Por defecto: `false`
- ⚠️ Experimental

> Habilita la caché de [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin#options) y [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader)

## cssSourceMap

- Tipo: `boolean`
- Por defecto: `true` para desarrollo y `false` para producción.

> Habilita la compatibilidad con CSS Source Map

## devMiddleware

- Tipo: `Object`

Mira [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) para las opciones disponibles.

## devtools

- Tipo: `boolean`
- Por defecto: `false`

Configurar si permitir la inspección con [vue-devtools](https://github.com/vuejs/vue-devtools).

Si ya lo activó a través de nuxt.config.js o de otra manera, devtools se habilita independientemente de la bandera.

## extend

> Extiende la configuración de webpack manualmente para los paquetes de cliente y servidor.

- Tipo: `Function`

La extensión se llama dos veces, una vez para el paquete del servidor y una vez para el paquete del cliente. Los argumentos del método son:

1. El objeto de configuración de Webpack,
2. Un objeto con las siguientes llaves (todas son boolean excepto `loaders`): `isDev`, `isClient`, `isServer`, `loaders`.

<base-alert>

**Advertencia:** Las llaves proporcionadas `isClient` e `isServer` son independientes de las llaves disponibles en [`context`](/docs/2.x/internals-glossary/context). **No** están obsoletas. No utilice `process.client` ni `process.server` aquí ya que son `undefined` a esté punto.

</base-alert>

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      // Extienda solo la configuración de Webpack para el paquete de cliente
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
```

Si quieres ver más información sobre la configuración por defecto de Webpack, echa un vistazo a nuestro [directorio de webpack](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config).

### loaders en extend

`loaders` tiene la misma estructura que [build.loaders](#loaders), para que pueda cambiar las opciones de los cargadores dentro de `extend`.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient, loaders: { vue } }) {
      // Extienda solo la configuración de Webpack para el paquete de cliente
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  }
}
```

## extractCSS

> Habilita la extracción de CSS común usando las [pautas](https://ssr.vuejs.org/en/css.html) de Vue Server Renderer.

- Tipo: `Boolean` o `Object`
- Por defecto: `false`

Usando [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/) bajo el capó, todo su CSS se extraerá en archivos separados, generalmente uno por componente. Esto permite almacenar en caché su CSS y JavaScript por separado y vale la pena intentarlo en caso de que tenga mucho CSS global o compartido.

Ejemplo (`nuxt.config.js`):

```js
export default {
  build: {
    extractCSS: true,
    // o
    extractCSS: {
      ignoreOrder: true
    }
  }
}
```

<base-alert type="info">

**Nota:** Hubo un error antes de Vue 2.5.18 que eliminó las importaciones CSS críticas al usar estas opciones.

</base-alert>

Es posible que desee extraer todo su CSS en un solo archivo. Hay una solución para esto:

<base-alert>

No se recomienda extraer todo en un solo archivo. La extracción en varios archivos css es mejor para el almacenamiento en caché y el aislamiento de precarga. También puede mejorar el rendimiento de la página al descargar y resolver solo los recursos necesarios.

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

> Personalice los nombres de archivo de los paquetes.

- Tipo: `Object`
- Por defecto:

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

Este ejemplo cambia los nombres elegantes de los fragmentos a identificadores numéricos:

```js{}[nuxt.config.js]
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    }
  }
}
```

Para entender mejor como funciona el uso de manifests, echa un vistazo a la [documentación de webpack](https://webpack.js.org/guides/code-splitting/).

<base-alert>

Tenga cuidado al usar nombres de archivo no basados en hash en producción, ya que la mayoría de los navegadores almacenarán en caché el activo y no detectarán los cambios en la primera carga.

</base-alert>

## friendlyErrors

- Tipo: `Boolean`
- Por defecto: `true` (Superposición habilitada)

Habilita o deshabilita la superposición proporcionada por [FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin)

## hardSource

- Type: `Boolean`
- Default: `false`
- ⚠️ Experimental

Enables the [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) for improved caching

## hotMiddleware

- Tipo: `Object`

Mira [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) para la opciones disponibles.

## html.minify

- Tipo: `Object`
- Por defecto:

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

**Atención:** Si haces cambios a `html.minify`, no serán no se fusionarán con los valores predeterminados!

Configuración para el complemento [html-minifier](https://github.com/kangax/html-minifier) utilizado para minimizar los archivos HTML creados durante el proceso de compilación (se aplicará para _todos los modos_).

## indicator

> Indicador de compilación de pantalla para reemplazo de módulo en caliente en desarrollo (disponible en `v2.8.0+`)

- Tipo: `Boolean`
- Por defecto: `true`

![nuxt-build-indicator](https://user-images.githubusercontent.com/5158436/58500509-93ba0f80-8197-11e9-8524-e115c6d32571.gif)

## loaders

> Personalice las opciones de los cargadores de webpack integrados de Nuxt.js.

- Tipo: `Object`
- Por defecto:

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

> Nota: Además de especificar las configuraciones en `nuxt.config.js`, también puede ser modificado por [build.extend](#extend)

### loaders.file

> Más detalles en las [opciones del file-loader](https://github.com/webpack-contrib/file-loader#options).

### loaders.fontUrl y loaders.imgUrl

> Más detalles en las [opciones del url-loader](https://github.com/webpack-contrib/url-loader#options).

### loaders.pugPlain

> Más detalles en [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) o las [opciones del compilador Pug](https://pugjs.org/api/reference.html#options).

### loaders.vue

> Más detalles en las [opciones de vue-loader](https://vue-loader.vuejs.org/options.html).

### loaders.css and loaders.cssModules

> Más detalles en las [opciones de css-loader](https://github.com/webpack-contrib/css-loader#options). Nota: cssModules son opciones de carga para el uso de [Módulos de CSS](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules)

### loaders.less

> Puede pasar cualquier opción específica de Less al `less-loader` a través de `loaders.less`. Mira la [documentación de Less](http://lesscss.org/usage/#command-line-usage-options) para todas las opciones disponibles en dash-case.

### loaders.sass y loaders.scss

> Mira la [documentación de Sass](https://github.com/sass/dart-sass#javascript-api) para todas las opciones disponibles de Sass. Note: `loaders.sass` es para [Sass Indented Syntax](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html)

### loaders.vueStyle

> Más detalles en las [opciones de vue-style-loader](https://github.com/vuejs/vue-style-loader#options).

## optimization

- Tipo: `Object`
- Por defecto:

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

El valor por defecto de `splitChunks.name` es `true` en `dev` o en modo `analyze`.

Puede configurar `minimizer` en una matriz personalizada de complementos o configurar `minimize` en `false` para deshabilitar todos los minimizadores. (`minimize` está deshabilitado para el desarrollo de forma predeterminada)

Mira [optimización para Webpack](https://webpack.js.org/configuration/optimization).

## optimizeCSS

- Tipo: `Object` o `Boolean`
- Por defecto:
  - `false`
  - `{}` cuando extractCSS está habilitado

Opciones para plugin OptimizeCSSAssets.

Mira [NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin).

## parallel

- Tipo: `Boolean`
- Por defecto: `false`
- ⚠️ Experimental

> Habilita [thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader) en la construcción de webpack

## plugins

> Agrega complementos de webpack

- Tipo: `Array`
- Por defecto: `[]`

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

> Personaliza plugins de [PostCSS Loader](https://github.com/postcss/postcss-loader#usage).

- Tipo: `Array` (legado, anulará los valores por defecto), `Object` (recomendado), `Function` o `Boolean`

  **Nota:** Nuxt.js ha aplicado [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env). De forma predeterminada, habilita [Funciones de la etapa 2](https://cssdb.org/) y [Autoprefixer](https://github.com/postcss/autoprefixer), puede usar `build.postcss.preset` para configurarlo .

- Por defecto:

  ```js{}[nuxt.config.js]
  {
    plugins: {
      'postcss-import': {},
      'postcss-url': {},
      'postcss-preset-env': this.preset,
      'cssnano': { preset: 'default' } // deshabilitar en modo dev
    },
    order: 'presetEnvAndCssnanoLast',
    preset: {
      stage: 2
    }
  }
  ```

La configuración de su complemento personalizado se fusionará con los complementos predeterminados (a menos que esté usando un `Array` en lugar de un `Object`).

```js{}[nuxt.config.js]
export default {
  build: {
    postcss: {
      plugins: {
        // Deshabilita `postcss-url`
        'postcss-url': false,
        // Agrega algunos complementos
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

Si la configuración de postcss es un `Object`, se puede usar `order` para definir el orden del complemento:

- Tipo: `Array` (nombres de los complementos odernados), `String` (orden nombre preestablecido), `Function`
- Por defecto: `cssnanoLast` (Pone a `cssnano` en la última posición)

```js{}[nuxt.config.js]
export default {
  build: {
    postcss: {
      // nombre preestablecido
      order: 'cssnanoLast',
      // nombres de complementos ordenados
      order: ['postcss-import', 'postcss-preset-env', 'cssnano']
      // Function to calculate plugin order
      order: (names, presets) => presets.cssnanoLast(names)
    }
  }
}
```

### complementos postcss y nuxt-tailwindcss

Si desea aplicar el complemento postcss (por ejemplo, postcss-pxtorem) en la configuración de nuxt-tailwindcss, debe cambiar el orden y cargar primero tailwindcss.

**Esta configuración no tiene ningún impacto en nuxt-purgecss.**

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

- Tipo: `Boolean`
- Por defecto: habilitado por el comando de la consola `--profile`

> Habilite el generador de perfiles en [WebpackBar](https://github.com/nuxt/webpackbar#profile)

## publicPath

> Nuxt.js le permite cargar sus archivos dist a su CDN para obtener el máximo rendimiento, simplemente configure el `publicPath` en su CDN.

- Tipo: `String`
- Por defecto: `'/_nuxt/'`

```js{}[nuxt.config.js]
export default {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

Luego, cuando ejecutes `nuxt build`, sube el contenido del directorio `.nuxt / dist / client` a tu CDN y ¡listo!

## quiet

> Suprime la mayor parte del registro de salida de la compilación

- Tipo: `Boolean`
- Por defecto: Habilitado cuando [std-env](https://github.com/blindmedia/std-env) detecta un entorno "CI" o "prueba"

## splitChunks

- Tipo: `Object`
- Por defecto:

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

Si se dividen los códigos para `layout`, `pages` y `commons` (librerias comunes: vue | vue-loader | vue-router | vuex ...).

## ssr

> Crea un paquete de webpack especial para el renderizador SSR.

- Tipo: `Boolean`
- Por defecto: `true` para modo universal y `false` para modo spa

Esta opción se establece automáticamente en función del valor de `mode` si no se proporciona.

## styleResources

- Tipo: `Object`
- Por defecto: `{}`

<base-alert>

**Advertencia:** Esta propiedad está obsoleta. En su lugar use por favor [style-resources-module](https://github.com/nuxt-community/style-resources-module/) para mejorar rendimiento y un mejor DX!

</base-alert>

Esto es útil cuando necesita inyectar algunas variables y mixins en sus páginas sin tener que importarlos cada vez.

Nuxt.js utiliza https://github.com/yenshih/style-resources-loader para lograr este comportamiento.

Debe especificar los patrones/ruta que desea incluir para los preprocesadores dados: `less`, `sass`, `scss` o `stylus`

Aquí no se pueden usar alises de rutas como (`~` and `@`), necesitas usar rutas relativas o absolutas.

```js{}[nuxt.config.js]
{
  build: {
    styleResources: {
      scss: './assets/variables.scss',
      less: './assets/*.less',
      // sass: ...,
      // scss: ...
      options: {
        // Mira https://github.com/yenshih/style-resources-loader#options
        // Excepto la propiedad `patterns`
      }
    }
  }
}
```

## templates

> Nuxt.js le permite proporcionar sus propias plantillas que se procesarán según la configuración de Nuxt. Esta función es especialmente útil para usar con [módulos](/docs/2.x/directory-structure/modules).

- Tipo: `Array`

```js{}[nuxt.config.js]
export default {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` puede ser absoluta o relativa
        dst: 'support.js', // `dst` es relativa al dir `.nuxt` del proyecto
        options: {
          // Las opciones se proporcionan a la plantilla como clave `options`
          live_chat: false
        }
      }
    ]
  }
}
```

Las plantillas se renderizan usando [`lodash.template`](https://lodash.com/docs/#template) puedes aprender más sobre su uso [aquí](https://github.com/learn-co-students/javascript-lodash-templates-lab-v-000).

## terser

- Tipo: `Object` o `Boolean`
- Por defecto:

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

Opciones del complemento Terser. Establecer en "false" para deshabilitar este complemento.

`sourceMap` estará habilitado cuando webpack `config.devtool` coincida con `source-?map`

Mira [webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin).

## transpile

- Tipo: `Array<String | RegExp | Function>`
- Por defecto: `[]`

Si desea transpilar dependencias específicas con Babel, puede agregarlas en `build.transpile`. Cada elemento en transpile puede ser un nombre de paquete, una string o un objeto regex que coincida con el nombre del archivo de la dependencia.

Comenzando con `v2.9.0`, también puedes usar una función para transpilar condicionalmente, la función recibirá un objeto (`{isDev, isServer, isClient, isModern, isLegacy}`):

```js{}[nuxt.config.js]
{
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'ky']
  }
}
```

## vueLoader

> Nota: Esta configuración se ha eliminado desde Nuxt 2.0, por favor utilice [`build.loaders.vue`](#loaders) en su lugar.

- Tipo: `Object`
- Por defecto:

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

> Especifique las [Opciones de Vue Loader](https://vue-loader.vuejs.org/options.html).

## watch

> Puede proporcionar sus archivos personalizados para verlos y regenerarlos después de los cambios. Esta característica es especialmente útil para usar con [módulos](/docs/2.x/directory-structure/modules).

- Tipo: `Array<String>`

```js{}[nuxt.config.js]
export default {
  build: {
    watch: ['~/.nuxt/support.js']
  }
}
```

## followSymlinks

> De forma predeterminada, el proceso de construcción no analiza archivos dentro de enlaces simbólicos. Este booleano los incluye, lo que permite el uso de enlaces simbólicos dentro de carpetas como la carpeta "pages", por ejemplo.

- Tipo: `Boolean`

```js{}[nuxt.config.js]
export default {
  build: {
    followSymlinks: true
  }
}
```
