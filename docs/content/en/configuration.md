---
title: Configuration
category: Usage
position: 3
---

## Theme

You can create a `content/settings.json` file to configure the theme.

### Properties

| Key | Type | Description |
|---------|------|-------------|
| `title` | `String` | Documentation title |
| `url` | `String` | Url of your deployed documentation. |
| `logo` | `String` `Object` | Logo of the project, can be an `Object` to set a logo per [color mode](https://github.com/nuxt-community/color-mode-module). |
| `github` | `String` | GitHub repository of the project `owner/name` to display the last version, the releases page, the link at the top and the `Edit this page on GitHub link` on each page Example: `nuxt/content`. |
| `githubApi` | `String` | For GitHub Enterprise, in addition to `github`, you have to assign a API full url of your project without a trailing slash. Example: `https://hostname/api/v3/repos/owner/name`. Releases are fetched from `${githubApi}/releases`. |
| `twitter` | `String` | Twitter username `@username` you want to link. Example: `@nuxt_js`. |
| `defaultBranch` | `String` | The default branch for the GitHub repository of your project, used in the `Edit this page on GitHub link` on each page (defaults to `main` if it cannot be detected). |
| `defaultDir` | `String` | The default dir of your project, used in the `Edit this page on GitHub link` on each page (defaults to `docs`). Can be an empty string eg. `""` |
| `layout` | `String` | The layout of your documentation (defaults to `default`). Can be changed to `single` to have a one-page doc. |
| `algolia` | `Object` | This option allows you to use [Algolia DocSearch](https://docsearch.algolia.com) to replace the simple built-in search. In order to enable it, you need to provide at least the `apiKey` and the `indexName`, see example below. |

### Algolia Search

This option allows you to use [Algolia DocSearch](https://docsearch.algolia.com) to replace the simple built-in search. In order to enable it, you need to provide at least the `apiKey` and the `indexName`:

```json [settings.json]
"algolia": {
  "apiKey": "<API_KEY>",
  "indexName": "<INDEX_NAME>",
  "langAttribute": "language"
}
```

If you use `i18n`, make sure the `<langAttribute>` is the same as the html lang selector in the config (defaults to `language`).

Take a look at the [@nuxt/content](https://github.com/algolia/docsearch-configs/blob/master/configs/nuxtjs_content.json) docsearch config for an example.

### Example

```json [content/settings.json]
{
  "title": "Nuxt Content",
  "url": "https://content.nuxtjs.org",
  "logo": {
    "light": "/logo-light.svg",
    "dark": "/logo-dark.svg"
  },
  "github": "nuxt/content",
  "twitter": "@nuxt_js"
}
```

## Nuxt

`docus` exports a function to setup the `nuxt.config.js` and allows you to add / override the [Nuxt config](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build).

You can checkout the [default nuxt.config.js](https://github.com/nuxt/docus/blob/main/theme/nuxt.config.js) from docus. We use [defu.arrayFn](https://github.com/nuxt-contrib/defu#array-function-merger) to merge the default configuration with the one provided.

The theme design is based on a `primary` color to make it easy to override, you can specify it using `docus.colors.primary` in your `nuxt.config.js`, the color palette (50 to 900) is generated using [theme-colors](https://github.com/nuxt-contrib/theme-colors). Also the codeblocks color can be overriden in the same way with `docus.colors.code`.

Example with custom configuration:

```js [nuxt.config.js]
import withDocus from 'docus'

export default withDocus({
  docus: {
    colors: {
      primary: '#E24F55',
      code: '#8B5CF6'
    }
  },
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

## TailwindCSS

You can override the [default Tailwind config](https://github.com/nuxt/docus/blob/main/theme/tailwind.config.js) by creating your own `tailwind.config.js`.

```js [tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      // ...
    }
  }
}
```

Like the [Nuxt config](#nuxt), we use [defu.arrayFn](https://github.com/nuxt-contrib/defu#array-function-merger) to merge both configurations.
