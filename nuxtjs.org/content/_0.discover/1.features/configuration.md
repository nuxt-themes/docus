---
title: Configuration
description: By default, Nuxt.js is configured to cover most use cases. This default configuration can be overwritten with the nuxt.config.js file.
csb_link_host_port: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_host_port?fontsize=14&hidenavigation=1&theme=dark
csb_link_pre-processors: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_pre-processors?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: You can use the axios-module in the nuxt.config.js?
    answers:
      - true
      - false
    correctAnswer: false
  - question: What is the default Nuxt.js development server host?
    answers:
      - localhost
      - 3000
      - '0'
    correctAnswer: localhost
  - question: Which attribute do you use in your style tag to use SCSS?
    answers:
      - lang="scss"
      - language="scss"
      - style="scss"
    correctAnswer: lang="scss"
  - question: What is the default Nuxt.js development server port?
    answers:
      - 8000
      - 3000
      - localhost
    correctAnswer: 3000
  - question: In the nuxt.config.js what property do you use to add global CSS files?
    answers:
      - styles
      - css
      - globalCss
    correctAnswer: css
  - question: You can use JSX in your Nuxt.js application?
    answers:
      - True
      - False
    correctAnswer: True
  - question: In the nuxt.config.js what property do you use to add global CSS files?
    answers:
      - styles
      - css
      - global-css
    correctAnswer: css
  - question: In the nuxt.config.js what property do you use to extend the webpack config?
    answers:
      - webpack.extend
      - build.extend
      - extend.build
    correctAnswer: build.extend
  - question: What is the file called for ignoring files in your Nuxt.js app?
    answers:
      - .ignore
      - .nuxtignore
      - .ignorenuxt
    correctAnswer: .nuxtignore
  - question: If you want to ignore the about file of your Nuxt.js app what prefix would you use?
    answers:
      - _about.vue
      - -about.vue
      - __about.vue
    correctAnswer: -about.vue
---

By default, Nuxt.js is configured to cover most use cases. This default configuration can be overwritten with the nuxt.config.js file.

## The css Property

Nuxt.js lets you define the CSS files/modules/libraries you want to set globally (included in every page).

<alert>

In case you want to use `sass` make sure that you have installed the `sass` and `sass-loader` packages.

</alert>

In `nuxt.config.js`, add the CSS resources:

```js{}[nuxt.config.js]
export default {
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    'bulma',
    // CSS file in the project
    '~/assets/css/main.css',
    // SCSS file in the project
    '~/assets/css/main.scss'
  ]
}
```

<alert>

Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.

</alert>

### Style Extensions

You can omit the file extension for CSS/SCSS/Postcss/Less/Stylus/... files listed in the css array in your nuxt config file.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

<alert>

If you have two files with the same name eg. `main.scss` and `main.css`, and don't specify an extension in the css array entry, eg. `css: ['~/assets/css/main']`, then only one file will be loaded depending on the order of `styleExtensions`. In this case only the `css` file will be loaded and the `scss` file will be ignored because `css` comes first in the default `styleExtension` array.

</alert>

Default order: `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`

<app-modal>
  <code-sandbox  :src="csb_link_pre-processors"></code-sandbox>
</app-modal>

## Pre-processors

Thanks to [Vue Loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), you can use any kind of pre-processor for your  `<template>` or `<style>`: use the `lang` attribute.

Example of our `pages/index.vue` using [Pug](https://github.com/pugjs/pug) and [Sass](http://sass-lang.com/):

```html{}[pages/index.vue]
<template lang="pug"> h1.red Hello {{ name }}! </template>

<style lang="scss">
  .red {
    color: red;
  }
</style>
```

To use these pre-processors, we need to install their webpack loaders:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D pug pug-plain-loader
yarn add -D sass sass-loader fibers
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save-dev pug pug-plain-loader
npm install --save-dev sass sass-loader fibers
```

  </code-block>
</code-group>

## JSX

Nuxt.js uses [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app), which is based on the official [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) for babel default configuration, so you can use JSX in your components.

You can also use JSX in the `render` method of your components:

```js
<script>
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```

Aliasing `createElement` to `h` is a common convention you’ll see in the Vue ecosystem but is actually optional for JSX since it [automatically injects](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) `const h = this.$createElement` in any method and getter (not functions or arrow functions) declared in ES2015 syntax that has JSX so you can drop the (h) parameter.

You can learn more about how to use it in the [JSX section](https://vuejs.org/v2/guide/render-function.html#JSX) of the Vue.js documentation.

## Ignoring files

### .nuxtignore

You can use a `.nuxtignore` file to let Nuxt.js ignore  `layout`, `page`, `store` and `middleware`  files in your project’s root directory (`rootDir`) during the build phase. The `.nuxtignore` file is subject to the same specification as  `.gitignore`  and  `.eslintignore` files, in which each line is a glob pattern indicating which files should be ignored.

```markdown{}[.nuxtignore]
# ignore layout foo.vue

layouts/foo.vue

# ignore layout files whose name ends with -ignore.vue

layouts/\*-ignore.vue

# ignore page bar.vue

pages/bar.vue

# ignore page inside ignore folder

pages/ignore/\*.vue

# ignore store baz.js

store/baz.js

# ignore store files match _.test._

store/ignore/_.test._

# ignore middleware files under foo folder except foo/bar.js

middleware/foo/\*.js !middleware/foo/bar.js
```

### The ignorePrefix Property

Any file in pages/, layout/, middleware/ or store/ will be ignored during the build if its filename starts with the prefix specified by ignorePrefix.

By default all files which start with `-` will be ignored, such as `store/-foo.js` and `pages/-bar.vue`. This allows for co-locating tests, utilities, and components with their callers without themselves being converted into routes, stores, etc.

### The ignore Property

More customizable than ignorePrefix: all files matching glob patterns specified inside ignore will be ignored in building.

```js{}[nuxt.config.js]
export default {
  ignore: 'pages/bar.vue'
}
```

### ignoreOptions

`nuxtignore` is using `node-ignore` under the hood, `ignoreOptions` can be configured as `options` of `node-ignore`.

```js{}[nuxt.config.js]
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```

## Extend webpack config

You can extend nuxt's webpack configuration via the `extend` option in your `nuxt.config.js`. The `extend` option of the `build` property is a method that accepts two arguments. The first argument is the webpack `config` object exported from nuxt's webpack config. The second parameter is a context object with the following boolean properties: `{ isDev, isClient, isServer, loaders }`.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
```

The `extend` method gets called twice - Once for the client bundle and the other for the server bundle.

### Customize chunks configuration

You may want to tweak the [optimization configuration](/docs/2.x/configuration-glossary/configuration-build#optimization) a bit, avoiding a rewrite of the default object.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
      }
    }
  }
}
```

### Execute ESLint on every webpack build in dev environment

In order to be aware of code style errors, you may want to run [ESLint](https://github.com/webpack-contrib/eslint-loader) on every build in the dev environment.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
```

## Edit host and port

By default, the Nuxt.js development server host is `localhost`  which is only accessible from within the host machine. In order to view your app on another device you need to modify the host. You can modify the host in your nuxt.config.js file.

Host `'0.0.0.0'`  is designated to tell Nuxt.js to resolve a host address, which is accessible to connections *outside* of the host machine (e.g. LAN). If the host is assigned the string value of `'0'` (not 0, which is falsy), or `'0.0.0.0'` your local IP address will be assigned to your Nuxt.js application.

```js{}[nuxt.config.js]
export default {
  server: {
    host: '0' // default: localhost
  }
}
```

You can also change the port number from the default port of 3000.

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000 // default: 3000
  }
}
```

<alert type="info">

If the port is assigned the string value of `'0'` (not 0, which is falsy) a random port number will be assigned to your Nuxt.js application.

</alert>

Although you can modify this in the nuxt.config.js file it is not advised to as it might cause you issues when hosting your site. It is much better to modify the host and port direct in the dev command.

```bash
HOST=0 PORT=8000 npm run dev
```

or create a script in your package.json

```json
"scripts": {
  "dev:host": "nuxt --hostname '0' --port 8000"
}
```

<app-modal>
  <code-sandbox  :src="csb_link_host_port"></code-sandbox>
</app-modal>

## Asynchronous Configuration

Although it is better to use the normal configuration `export default {}` you can have an async configuration by exporting an async function that return the config object.

```js{}[nuxt.config.js]
import axios from 'axios'

export default async () => {
  const data = await axios.get('https://api.nuxtjs.dev/posts')
  return {
    head: {
      title: data.title
      //... rest of config
    }
  }
}
```

<alert>

The axios-module cannot be used in `nuxt.config.js`. You will need to import axios and configure it again.

</alert>

## Further configuration

<alert type="next">

The `nuxt.config.js` has way more customization and configuration options! Check out all its keys in the [configuration glossary](/docs/2.x/configuration-glossary/configuration-build).

</alert>

<quiz :questions="questions"></quiz>
