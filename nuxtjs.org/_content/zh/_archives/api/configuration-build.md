---
title: 'API: 构建配置'
description: Nuxt.js 允许你根据服务端需求，自定义 webpack 的构建配置。
menu: build
category: configuration
position: 101
---

# 构建配置

> Nuxt.js 允许你根据服务端需求，自定义 webpack 的构建配置。

## analyze

> Nuxt.js 使用 [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) 分析并可视化构建后的打包文件，你可以基于分析结果来决定如何优化它。

- 类型： `Boolean` 或 `Object`
- 默认值： `false`

如果是 `Object` 类型， 可以移步 [这里](https://github.com/th0r/webpack-bundle-analyzer#as-plugin) 查看可用的属性。

例如 (`nuxt.config.js`):

```js
module.exports = {
  build: {
    analyze: true
    // or
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<div class="Alert Alert--teal">

**提示：** 可通过 `nuxt build --analyze` 或 `nuxt build -a` 命令来启用该分析器进行编译构建，分析结果可在 [http://localhost:8888](http://localhost:8888) 上查看。

</div>

## babel

> 为 JS 和 Vue 文件设定自定义的 babel 配置。

- 类型: `Object`
- 默认:

```js
{
  babelrc: false,
  cacheDirectory: undefined,
  presets: ['@nuxt/babel-preset-app']
}
```

默认为 [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/blob/dev/packages/babel-preset-app/src/index.js) 在`client`构建中是`ie：'9'`，在`server`构建中是`node:'current'`。

**注意**: `build.babel.presets` 中配置的预设将应用于客户端和服务器构建。目标将由 Nuxt 相应地设置（客户端/服务器）。如果要为客户端或服务器版本配置不同的预设，请使用`presets`作为函数：

```js
export default {
  build: {
    babel: {
      presets({ isServer }) {
        const targets = isServer ? { node: '10' } : { ie: '11' }
        return [[require.resolve('@nuxt/babel-preset-app'), { targets }]]
      }
    }
  }
}
```

我们**强烈建议**使用默认预设。但是,如果必须，您可以更改预设。

_Example_ for custom presets:

```js
export default {
  build: {
    babel: {
      presets: ['es2015', 'stage-0']
    }
  }
}
```

## cache

- 类型: `Boolean`
- 默认: `false`
- ⚠️ 实验性的

> 启用缓存 [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin#options) 和 [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader)

## crossorigin

- 类型: `String`
- 默认: `undefined`

在生成的 HTML 中的 `<link rel="stylesheet">` 和 `<script>` 标记上配置 `crossorigin` 属性。请查看 [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) 了解更多可用选项。

## cssSourceMap

- 类型: `boolean`
- 默认: `true` 为开发模式(development)， `false` 为生产模式(production)。

> 开启 CSS Source Map 支持

## devMiddleware

- 类型: `Object`

请查看 [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 了解更多可用选项。

## devtools

- 类型: `boolean`
- 默认: `false`

配置是否允许 [vue-devtools](https://github.com/vuejs/vue-devtools) 调试。

如果您已经通过 nuxt.config.js 或其他方式激活，则无论标志为 true 或 false，devtools 都会启用。

## extend

- 类型： `Function`

> 为客户端和服务端的构建配置进行手工的扩展处理。

该扩展方法会被调用两次，一次在服务端打包构建的时候，另外一次是在客户端打包构建的时候。该方法的参数如下：

1. Webpack 配置对象
2. 构建环境对象，包括这些属性(全部为布尔类型):`isDev`，`isClient`，`isServer`

<div class="Alert Alert--orange">

**警告:** 提供的`isClient`和`isServer`键与[`context`](/api/context)中可用的键分开， 它们是**长期支持**的。这里不要使用`process.client`和`process.server`，因为它们是`'undefined'`。

</div>

例如 (`nuxt.config.js`)：

```js
module.exports = {
  build: {
    extend(config, { isClient }) {
      // 为 客户端打包 进行扩展配置
      if (isClient) {
        config.devtool = 'eval-source-map'
      }
    }
  }
}
```

如果你想了解更多关于 webpack 的配置，可以移步 Nuxt.js 源码的 [webpack 目录](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config)。

### loaders in extend

`loaders`具有与之相同的对象结构 [build.loaders](#loaders), 所以你可以在`extend`中更改`loaders`的选项。

例如 (`nuxt.config.js`):

```js
export default {
  build: {
    extend(config, { isClient, loaders: { vue } }) {
      // 仅扩展客户端中的webpack配置
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  }
}
```

## extractCSS

> 使用 Vue 服务器端渲染[指南](https://ssr.vuejs.org/en/css.html)启用常见 CSS 提取。

- 类型: `Boolean`
- 默认: `false`

使用[`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin)将主块中的 CSS 提取到一个单独的 CSS 文件中（自动注入模板），该文件允许单独缓存文件。当有很多共用 CSS 时建议使用此方法，异步组件中的 CSS 将保持内联为 JavaScript 字符串并由 vue-style-loader 处理。

## filenames

- 类型： `Object`

> 自定义打包文件名

- 默认值：

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

此示例将 chunk 名称更改为数字 id (`nuxt.config.js`):

```js
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    }
  }
}
```

要更多了解使用，可以移步[webpack documentation](https://webpack.js.org/guides/code-splitting-libraries/)

## friendlyErrors

- 类型: `Boolean`
- 默认: `true` (启用叠加)

[友好的错误 Webpack 插件](https://github.com/nuxt/friendly-errors-webpack-plugin)

## hardSource

- 类型: `Boolean`
- 默认: `false`
- ⚠️ 实验性的

开启 [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin)

## hotMiddleware

- 类型: `Object`

请查看 [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) 了解更多可用选项。

## html.minify

- 类型: `Object`
- 默认:

```js
{
  collapseBooleanAttributes: true,
  collapseWhitespace: false,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeAttributeQuotes: false,
  removeComments: false,
  removeEmptyAttributes: true,
  removeOptionalTags: false,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: false,
  removeStyleLinkTypeAttributes: false,
  removeTagWhitespace: false,
  sortClassName: false,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

用于压缩在构建打包过程中创建的 HTML 文件配置[html-minifier](https://github.com/kangax/html-minifier)的插件（将应用于**所有模式**）。

## loaders

- 类型： `Object`

> 自定义 webpack 加载器

- Default:

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

> 注意：除了在`nuxt.config.js`中指定配置外，它还可以通过[build.extend](#extend)修改。

### loaders.file

> 更多详情查看 [file-loader 配置](https://github.com/webpack-contrib/file-loader#options).

### loaders.fontUrl and loaders.imgUrl

> 更多详情查看 [url-loader 配置](https://github.com/webpack-contrib/url-loader#options).

### loaders.pugPlain

> 更多详情查看 [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) 或 [Pug compiler 配置](https://pugjs.org/api/reference.html#options).

### loaders.vue

> 更多详情查看 [vue-loader 配置](https://vue-loader.vuejs.org/options.html).

### loaders.css and loaders.cssModules

> 更多详情查看 [css-loader 配置](https://github.com/webpack-contrib/css-loader#options). 注意：cssModules 是使用的 loader 选项 [CSS Modules](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules)

### loaders.less

> 您可以通过`loaders.less`将任何 Less 特定选项传递给`less-loader`。 请查看 [Less 文档](http://lesscss.org/usage/#command-line-usage-options) 来获取更多配置信息。

### loaders.sass and loaders.scss

> 查看 [Sass 文档](https://github.com/sass/dart-sass#javascript-api) 来获取更多配置信息。 Note: `loaders.sass` is for [Sass Indented Syntax](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html)

> 注意：`loaders.sass`用于[Sass 缩进](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html)

### loaders.vueStyle

> 更多配置信息查看 [vue-style-loader 配置](https://github.com/vuejs/vue-style-loader#options)。

## optimization

- 类型: `Object`
- 默认:

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

在**开发**或**分析模式**下，`splitChunks.name`的默认值为`true`。 You can set `minimizer` to a customized Array of plugins or set `minimize` to `false` to disable all minimizers. 您可以将`minimizer`设置为自定义插件，或将`minim`设置为`false`以禁用所有`minimize`。(默认在**开发环境**情况下，`minimize`被禁用)。

查看 [Webpack Optimization](https://webpack.js.org/configuration/optimization)来了解更多配置信息。

## terser

- 类型: `Object` 或 `Boolean`
- 默认:

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

设置为`false`可以禁用此插件。

当 webpack 中 `config.devtool` 与`source-?map`匹配时，将启用`sourceMap`

查看 [webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)来了解更多配置信息。

## optimizeCSS

- 类型: `Object` 或 `Boolean`
- 默认:
  - `false`
  - `{}` when extractCSS is enabled

OptimizeCSSAssets 插件配置查看[NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin).

## parallel

- 类型: `Boolean`
- 默认: `false`

> 在 webpack 构建打包中开启 [thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader)。

## plugins

- 类型： `Array`
- 默认值： `[]`

> 配置 Webpack 插件

例如 (`nuxt.config.js`):

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

- 类型： `Array`, `Object`(推荐), `Function` 或 `Boolean`

> 注意：Nuxt.js 已应用[PostCSS Preset Env](https://github.com/csstools/postcss-preset-env)。默认情况下，它将启用`Stage 2`功能和`Autoprefixer`,你可以使用`build.postcss.preset`来配置它。

> 自定义 [postcss](https://github.com/postcss/postcss) 配置

默认值：

```js
{
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-preset-env': {},
    'cssnano': { preset: 'default' } // disabled in dev mode
  }
}
```

例如 (`nuxt.config.js`)：

```js
export default {
  build: {
    postcss: {
      plugins: {
        // Disable `postcss-url`
        'postcss-url': false,
        // Add some plugins
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

## profile

- 类型: `Boolean`
- 默认: 开启只需在命令行中加入： `--profile`

> 开启 profiler 请查看 [WebpackBar](https://github.com/nuxt/webpackbar#profile)

## publicPath

> Nuxt.js 允许您将`dist`文件上传到 CDN 来获得最快渲染性能，只需将`publicPath`设置为 CDN 即可。

- 类型: `String`
- 默认: `'/_nuxt/'`

例如 (`nuxt.config.js`):

```js
export default {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

然后，当启动`nuxt build`时， 将`.nuxt/dist/client`目录的内容上传到您的 CDN 即可！

## quiet

> 控制部分构建信息输出日志

- 类型: `Boolean`
- 默认: 检测到`CI`或`test`环境时启用 [std-env](https://github.com/blindmedia/std-env)

## splitChunks

- 类型: `Object`
- 默认:

  ```js
  {
    layouts: false,
    pages: true,
    commons: true
  }
  ```

如果代码分模块用于 `layout`, `pages` 和 `commons` (常用: vue|vue-loader|vue-router|vuex...).

## ssr

> 为服务器端渲染创建特殊的 webpack 包。

- 类型: `Boolean`
- 默认: `true` 为通用模式，`false` 为`spa`模式

如果未提供，则根据默认**模式**自动设置此选项。

## styleResources

- 类型: `Object`
- 默认: `{}`

当您需要在页面中注入一些变量和`mixin`而不必每次都导入它们时，这非常有用。

Nuxt.js 使用 https://github.com/nuxt-community/style-resources-module 来实现这种行为。

您需要为 css 预处理器指定要包含的 模式 / 路径 ： `less`, `sass`, `scss` 或 `stylus`

<div class="Alert Alert--orange">

您不能在此处使用**路径别名**(`~` 和 `@`)，

</div>

:warning: You cannot use path aliases here (`~` and `@`)，你需要使用相对或绝对路径。

安装 style-resources：

```bash
$ yarn add @nuxtjs/style-resources
```

根据需要安装：

- SASS: `$ yarn add sass sass-loader fibers`
- LESS: `$ yarn add less-loader less`
- Stylus: `$ yarn add stylus-loader stylus`

修改 `nuxt.config.js`:

```js
export default {
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: './assets/variables.scss',
    less: './assets/**/*.less'
    // sass: ...
  }
}
```

然后就可以随处直接使用定义过的变量或函数。

## templates

> Nuxt.js 允许您自定义自己的模板，这些模板将基于 Nuxt 配置进行渲染。 此功能特别适用于使用 [modules](/guide/modules)。

- 类型: `Array`

Example (`nuxt.config.js`):

```js
export default {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` 可以是绝对的或相对的路径
        dst: 'support.js', // `dst` 是相对于项目`.nuxt`目录
        options: {
          // 选项`options`选项可以将参数提供给模板
          live_chat: false
        }
      }
    ]
  }
}
```

使用[`lodash.template`](https://lodash.com/docs/#template)呈现模板，您可以了解有关使用它们的更多信息[here](https://github.com/learn-co-students/javascript-lodash-templates-lab-v-000)。

## transpile

- 类型: `Array<string | RegExp>`
- 默认: `[]`

如果要使用 Babel 与特定的依赖关系进行转换，你可以在`build.transpile`中添加它们，`transpile`中的选项可以是**字符串**或**正则表达式**对象，用于匹配依赖项文件名。

## vueLoader

>

<div class="Alert Alert--orange">

注意：此配置在 Nuxt 2.0+中已被删除，请使用 [`build.loaders.vue`](#loaders) 来替代

</div>

- 类型: `Object`
- 默认:

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

> 指定 [Vue Loader 配置](https://vue-loader.vuejs.org/options.html).

## ~~vendor~~ <Badge text="废弃的" type="error"/>

<div class="Alert Alert--orange">

注意：在 Nuxt.js 2.0+版本中，`vendor`由于 Webpack 4，将废弃该 API 但保留使用方法作为兼容低版本处理。查看：[Nuxt.js 2.0 更新文档](https://github.com/nuxt/nuxt.js/releases/tag/v2.0.0)

</div>

> Nuxt.js 允许你在自动生成的 `vendor.bundle.js` 文件中添加一些模块，以减少应用 bundle 的体积。这里说的是一些你所依赖的第三方模块 (比如 `axios`)

- 类型： `Array`
- 数组元素类型： `String`

想要把模块打包进 vendor bundle，你可以在 `nuxt.config.js` 的 `build.vendor` 字段中配置：

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

你也可以配置文件路径，比如一些自己写的库:

```js
module.exports = {
  build: {
    vendor: ['axios', '~plugins/my-lib.js']
  }
}
```

## watch

> 您可以使用`watch`来监听文件更改。此功能特别适用用在[modules](/guide/modules)中。

- 类型: `Array<String>`

```js
export default {
  build: {
    watch: ['~/.nuxt/support.js']
  }
}
```

## followSymlinks

> By default, the build process does not scan files inside symlinks. This boolean includes them, thus allowing usage of symlinks inside folders such as the "pages" folder, for example.

- Type: `Boolean`

```js
export default {
  build: {
    followSymlinks: true
  }
}
```
