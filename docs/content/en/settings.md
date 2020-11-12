---
title: Settings
category: Docs Theme
position: 3
---

You can create a `content/settings.json` file to configure the theme.

### Properties

- `title` (`String`)
  - The title of your documentation
- `url` (`String`)
  - The url where your documentation will be deployed
- `logo` (`String` | `Object`)
  - The logo of your project, can be an `Object` to set a logo per [color mode](https://github.com/nuxt-community/color-mode-module)
- `github` (`String`)
  - The GitHub repository of your project `owner/name` to display the last version, the releases page, the link at the top and the `Edit this page on GitHub link` on each page Example: `nuxt/content`.
  - For GitHub Enterprise, you have to assign a full url of your project without a trailing slash. Example: `https://hostname/repos/owner/name`. <badge>v0.6.0+</badge>
- `githubApi` (`String`) <badge>v0.6.0+</badge>
  - For GitHub Enterprise, in addition to `github`, you have to assign a API full url of your project without a trailing slash. Example: `https://hostname/api/v3/repos/owner/name`.
  - Releases are fetched from `${githubApi}/releases`.
- `twitter` (`String`)
  - The Twitter username `@username` you want to link. Example: `@nuxt_js`
- `defaultBranch` (`String`) <badge>v0.2.0+</badge>
  - The default branch for the GitHub repository of your project, used in the `Edit this page on GitHub link` on each page (defaults to `main` if it cannot be detected).
- `defaultDir` (`String`) <badge>v0.6.0+</badge>
  - The default dir of your project, used in the `Edit this page on GitHub link` on each page (defaults to `docs`. Can be an empty string eg. `""`).
- `layout` (`String`) <badge>v0.4.0+</badge>
  - The layout of your documentation (defaults to `default`). Can be changed to `single` to have a one-page doc.
- `algolia` (`Object`) <badge>v0.7.0+</badge>
  - This option allows you to use [Algolia DocSearch](https://docsearch.algolia.com) to replace the simple built-in search. In order to enable it, you need to provide at least the `apiKey` and the `indexName`:
    ```json
    "algolia": {
        "apiKey": "<API_KEY>",
        "indexName": "<INDEX_NAME>",
        "langAttribute": "language"
    }
    ```
  - If you use `i18n`, make sure the `<langAttribute>` is the same as the html lang selector in the config (defaults to `language`).
  - Take a look at the [@nuxt/content](https://github.com/algolia/docsearch-configs/blob/master/configs/nuxtjs_content.json) docsearch config for an example.

### Example

```json[content/settings.json]
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
