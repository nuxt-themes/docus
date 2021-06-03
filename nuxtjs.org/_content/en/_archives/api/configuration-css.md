---
title: 'The css Property'
description: Nuxt.js lets you define the CSS files/modules/libraries you want to set globally (included in every page).
menu: css
category: configuration
position: 104
---

> Nuxt.js lets you define the CSS files/modules/libraries you want to set globally (included in every page).

In case you want to use `sass` make sure that you have installed `sass` and `sass-loader` packages. If you didn't just

```sh
npm install --save-dev sass sass-loader fibers
```

- Type: `Array`
- Items: `string`

In `nuxt.config.js`, add the CSS resources:

```js
export default {
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    'bulma',
    // CSS file in the project
    '@/assets/css/main.css',
    // SCSS file in the project
    '@/assets/css/main.scss'
  ]
}
```

Nuxt.js will automatically guess the file type by its extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.
