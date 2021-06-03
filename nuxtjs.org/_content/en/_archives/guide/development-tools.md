---
title: Development Tools
description: Nuxt.js helps you to make your web development enjoyable.
category: getting-started
position: 114
---

> Testing your application is part of the web development. Nuxt.js helps you to make it as easy as possible.

## End-to-End Testing

[AVA](https://github.com/avajs/ava) is a powerful JavaScript testing framework, mixed with [jsdom](https://github.com/tmpvar/jsdom), we can use them to do end-to-end testing easily.

First, we need to add AVA and jsdom as development dependencies:

```bash
npm install --save-dev ava jsdom
```

Then add a test script to our `package.json` and configure AVA to compile files that we import into our tests.

```javascript
"scripts": {
  "test": "ava",
},
"ava": {
  "files": [
    "test/**/*"
  ]
}
```

We are going to write our tests in the `test` folder:

```bash
mkdir test
```

Let's say we have a page in `pages/index.vue`:

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
  export default {
    data() {
      return { name: 'world' }
    }
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

When we launch our app with `npm run dev` and open http://localhost:3000, we can see our red `Hello world!` title.

We add our test file `test/index.test.js`:

```js
import { resolve } from 'path'
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'

// Init Nuxt.js and start listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try {
    config = require(resolve(rootDir, 'nuxt.config.js'))
  } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  config.mode = 'universal' // Isomorphic application
  const nuxt = new Nuxt(config)
  t.context.nuxt = nuxt // We keep a reference to Nuxt so we can close the server at the end of the test
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// Example of testing only generated html
test('Route / exists and render HTML', async t => {
  const { nuxt } = t.context
  const context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Hello world!</h1>'))
})

// Example of testing via DOM checking
test('Route / exists and renders HTML with CSS applied', async t => {
  const { nuxt } = t.context
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello world!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// Close the Nuxt server
test.after('Closing server', t => {
  const { nuxt } = t.context
  nuxt.close()
})
```

We can now launch our tests:

```bash
npm test
```

jsdom has some limitations because it does not use a browser. However, it will cover most of our tests. If you want to use a browser to test your application, you might want to check out [Nightwatch.js](http://nightwatchjs.org).

## ESLint and Prettier

> [ESLint](http://eslint.org) is a great tool to keep your code clean.

> [Prettier](https://prettier.io) is a very popular code formatter.

You can add ESLint with Prettier pretty easily with Nuxt.js, first, you need to add the npm dependencies:

```bash
npm install --save-dev babel-eslint eslint eslint-config-prettier eslint-loader eslint-plugin-vue eslint-plugin-prettier prettier
```

Then, you can configure ESLint via a `.eslintrc.js` file in your root project directory:

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { semi: false }]
  }
}
```

Then, you can add `lint` and `lintfix` scripts to your `package.json`:

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
  "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
}
```

You can now launch `lint` to check for errors:

```bash
npm run lint
```

or `lintfix` to also fix those which are doable

```bash
npm run lintfix
```

ESLint will lint all of your JavaScript and Vue files while ignoring your ignored files defined in your `.gitignore`.

It is also recommended to enable ESLint hot reloading mode via webpack. This way ESLint will run on save during `npm run dev`. Just add the following to your `nuxt.config.js`:

```js
...
  /*
   ** Build configuration
  */
  build: {
   /*
    ** You can extend webpack config here
   */
   extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
```

<div class="Alert Alert--orange">

One best practice is to add also `"precommit": "npm run lint"` in your package.json to lint your code automatically before committing your code.

</div>
