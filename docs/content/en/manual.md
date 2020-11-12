---
title: Manual Setup
category: Docs Theme
position: 2
---

Let's say we're creating the documentation of an open-source project in the `docs/` directory.

The theme is a classic NuxtJS app, you need:

### `package.json`

> This file can be created with `npm init`.

Install `nuxt` and `@nuxt/content-theme-docs`:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add nuxt @nuxt/content-theme-docs
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install nuxt @nuxt/content-theme-docs
  ```

  </code-block>
</code-group>

**Example**

```json[package.json]
{
  "name": "docs",
  "version": "1.0.0",
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate"
  },
  "dependencies": {
    "@nuxt/content-theme-docs": "^0.1.3",
    "nuxt": "^2.14.0"
  }
}
```

### `nuxt.config.js`

Import the theme function from `@nuxt/content-theme-docs`:

```js[nuxt.config.js]
import theme from '@nuxt/content-theme-docs'

export default theme({
  // [additional nuxt configuration]
})
```

The theme exports a function to setup the `nuxt.config.js` and allows you to add / override the default config.

> Check out the documentation of [defu.arrayFn](https://github.com/nuxt-contrib/defu#array-function-merger) to see how the config is merged.

**Example**

```js[nuxt.config.js]
import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#E24F55'
  },
  loading: { color: '#00CD81' },
  i18n: {
    locales: () => [{
      code: 'fr',
      iso: 'fr-FR',
      file: 'fr-FR.js',
      name: 'Français'
    }, {
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
    }],
    defaultLocale: 'en'
  },
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-12301-2'
    }]
  ]
})
```

<alert type="warning">

Don't forget to install the dependencies of the modules you add in your `nuxt.config.js`

</alert>

### `tailwind.config.js`

<badge>v0.4.0+</badge>

You can override the [default theme config](https://github.com/nuxt/content/blob/dev/packages/theme-docs/src/tailwind.config.js) by creating your own `tailwind.config.js`.

The theme design is based on a `primary` color to make it easy to override.

> Default colors are generated using [theme-colors](https://github.com/nuxt-contrib/theme-colors) with `docs.primaryColor` as base. <badge>v0.7.0+</badge>

**Example**

```js[tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // ...
        }
      }
    }
  }
}
```

### `content/`

This is where you put your markdown content files. You can learn more in the following section.

### `static/`

This is where you put your static assets like the logo.

<alert type="info">

You can add a `static/icon.png` file to enable [nuxt-pwa](https://pwa.nuxtjs.org/) and generate a favicon automatically.

*Icon should be a square of at least 512x512*

</alert>

<alert type="info">

You can add a `static/preview.png` file to have a social preview image in your metas.

*Image should be at least 640×320px (1280×640px for best display).*

</alert>

**Example**

```bash
content/
  en/
    index.md
static/
  icon.png
nuxt.config.js
package.json
```





