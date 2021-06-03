---
title: How to add PostCSS plugins?
description: How to add PostCSS plugins in Nuxt?
category: configuration
position: 4
---

### Recommended Method

If present, rename or delete the `postcss.config.js` in your project directory. Then, in your `nuxt.config.js` file add the following:

```js
export default {
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```

### Legacy Method

**⚠️ Warning: This is deprecated.**

Use `postcss.config.js`, for example:

```js
const join = require('path').join
const tailwindJS = join(__dirname, 'tailwind.js')

module.exports = {
  plugins: [require('tailwindcss')(tailwindJS), require('autoprefixer')]
}
```
