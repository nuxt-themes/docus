---
title: static
description: The `static` directory is directly mapped to the server root () and contains files that likely won't be changed. All included files will be automatically served by Nuxt and are accessible through your project root URL.
position: 12
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/13_static?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: In which directory should you put your files that likely won't be changed such as your favicon or robots.txt?
    answers:
      - assets
      - static
      - src
    correctAnswer: static
  - question: This directory can be easily renamed without any configuration
    answers:
      - true
      - false
    correctAnswer: false
  - question: Where should you put your images if you want webpack to bundle them?
    answers:
      - static
      - assets
      - src
    correctAnswer: assets
  - question: Anything in the static directory is relative to the root directory
    answers:
      - true
      - false
    correctAnswer: true
  - question: You can configure the behavior of the static directory in the nuxt.config.js
    answers:
      - true
      - false
    correctAnswer: true
---

The `static` directory is directly mapped to the server root and contains files that likely won't be changed. All included files will be automatically served by Nuxt and are accessible through your project root URL.

`/static/robots.txt` will be available at `http://localhost:3000/robots.txt`

`/static/favicon.ico` will be available at  `http://localhost:3000/favicon.ico`

This option is helpful for files like `robots.txt`, `sitemap.xml` or `CNAME` (which is important for GitHub Pages deployment).

<base-alert>

_This directory cannot be renamed without extra configuration._

</base-alert>

## Static Assets

If you don't want to use Webpack assets from the `assets` directory, you can add the images to the static directory.

In your code, you can then reference these files relative to the root (`/`):

```html
<!-- Static image from static directory -->
<img src="/my-image.png" />

<!-- webpacked image from assets directory -->
<img src="~/assets/my-image-2.png" />
```

<base-alert type="info">Nuxt doesn't change this path, so if you customize your `router.base` then you'll need to make sure to add that manually to your paths. For example:

```html
<img :src="`${yourPrefix}/my-image.png`" />
```

</base-alert>

## Static Directory Config

Should you need to you can configure the `static/` directory behavior in the `nuxt.config.js` file.

### Static asset Prefix

If you deploy Nuxt.js to a subfolder, e.g. `/blog/`, the router base will be added to the static asset path by default. If you want to disable this behavior, you can set `static.prefix` to false in the `nuxt.config.js`.

```js
export default {
  static: {
    prefix: false
  }
}
```

Default: `/blog/my-image.png`

With `static.prefix` disabled: `/my-image.png`

<quiz :questions="questions"></quiz>
