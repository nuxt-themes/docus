---
title: Content
category: Docs Theme
position: 3
---

Once you've setup your documentation, you can directly start writing your content.

> Check out the documentation on [writing markdown content](/writing#markdown)

### Locales

The first level of directories in the `content/` folder are the locales used with [nuxt-i18n](https://github.com/nuxt-community/i18n-module) defined in your `nuxt.config.js`. By default there is only the default `en` locale defined, you have to create a `content/en/` directory to make it work.

You can override the locales in your `nuxt.config.js`:

```js[nuxt.config.js]
import theme from '@nuxt/content-theme-docs'

export default theme({
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
  }
})
```

<alert type="warning">

As explained in [nuxt.config.js](/themes/docs#nuxtconfigjs) section, we use `defu.arrayFn` to merge your config. You can override the `i18n.locales` array by using a function, or you can pass an array to concat with the default one (which has only the `en` locale).

</alert>

### Routing

Each markdown page in the `content/{locale}/` directory will become a page and will be listed in the left navigation.

> You can also put your markdown files in subdirectories to generate sub-routes. <badge>v0.4.0+</badge>

**Example**

```
content/
  en/
    examples/
      basic-usage.md
    setup.md
```

**Result**

```
/examples/basic-usage
/setup
```

> You can take a look at our [docs content folder](https://github.com/nuxt/content/tree/dev/docs/content/en) to have an example

### Front-matter

To make it work properly, make sure to include these properties in the front-matter section of your markdown files.

#### Required fields

- `title` (`String`)
  - The title of the page will be injected in metas
- `description` (`String`)
  - The description of the page will be injected in metas
- `position` (`Number`)
  - This will be used to sort the documents in the navigation

#### Optional fields

- `category` (`String`)
  - This will be used to group the documents in the navigation
- `version` (`Float`)
  - Alert users that the page is new with a badge. Once the page is seen, the version is stored in the local storage until you increment it
- `fullscreen` (`Boolean`)
  - Grows the page and hides the table of contents
- `menuTitle` (`String`) <badge>v0.4.0+</badge>
  - Overwrites the title of the page that will be displayed in the left menu (defaults to `title`)
- `subtitle` (`String`) <badge>v0.5.0+</badge>
  - Adds a subtitle under the page title
- `badge` (`String`) <badge>v0.5.0+</badge>
  - Adds a badge next to the page title

### Example

```bash[content/en/index.md]
---
title: 'Introduction'
description: 'Empower your NuxtJS application with this awesome module.'
position: 1
category: 'Getting started'
version: 1.4
fullscreen: false
menuTitle: 'Intro'
---

Introducing my awesome Nuxt module!
```
