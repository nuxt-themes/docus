---
title: Writing content for the docs
menuTitle: Content
category: Usage
position: 3
---

Once you've setup your documentation, you can directly start writing your content.

<alert type="info">

Checkout Nuxt Content documentation on [writing markdown content](https://content.nuxtjs.org/writing#markdown).

</alert>

## Front-matter

Every markdown file should define properties in the front-matter in order to work properly.

| Key | Type | Required | Description |
|---------|------|--------| -----|
| `title` | `String` | **yes** | Title of the page will be injected in metas |
| `description` | `String` | **yes** | Description of the page, will be injected into the metas |
| `position` | `Number` | **yes** | Sort the documents in the sidebar navigation |
| `category` | `String` |  | This will be used to group the documents in the navigation |
| `version` | `Float` |  | Alert users that the page is new with a badge. Once the page is seen, the version is stored in the local storage until you increment it |
| `fullscreen` | `Boolean` |  | Grows the page and hides the table of contents |
| `menuTitle` | `String` |  | Overwrites the title of the page that will be displayed in the left menu (defaults to `title`) |
| `subtitle` | `String` |  | Adds a subtitle under the page title |
| `badge` | `String` |  | Adds a badge next to the page title |

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

## Locales

The first level of directories in the `content/` folder are the locales used with [nuxt-i18n](https://github.com/nuxt-community/i18n-module) defined in your `nuxt.config.js`.

By default, only the default `en` locale is defined, **you have to create a `content/en/` directory** to make it work.

You can override the locales in your `nuxt.config.js`:

```js [nuxt.config.js]
import withDocus from 'docus'

export default withDocus({
  i18n: {
    defaultLocale: 'en',
    locales: () => [{
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
    }, {
      code: 'fr',
      iso: 'fr-FR',
      file: 'fr-FR.js',
      name: 'Français'
    }]
  }
})
```

<alert type="info">

As explained in the [Nuxt config](/configuration#nuxt) section, we use `defu.arrayFn` to merge your config. You can override the `i18n.locales` array by using a function, or you can pass an array to concat with the default one (which has only the `en` locale).

</alert>

## Routing

Each markdown page in the `content/{locale}/` directory will become a page and will be listed in the left navigation.

> You can also put your markdown files in subdirectories to generate sub-routes.

**Example**

<code-group>
  <code-block label="Directory structure" active>

```
content/
  en/
    examples/
      basic-usage.md
    setup.md
```

  </code-block>
  <code-block label="Generated routes">

```
/examples/basic-usage
/setup
```

  </code-block>
</code-group>

> You can take a look at our [docs content folder](https://github.com/nuxt/content/tree/dev/docs/content/en) to have an example
