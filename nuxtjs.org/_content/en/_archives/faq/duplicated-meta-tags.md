---
title: Duplicated Meta Tags?
description: Duplicated Meta tags with Nuxt.js?
category: development
position: 104
---

This is a "feature" of [vue-meta](https://github.com/nuxt/vue-meta), please take a look at the [documentation of head elements](/docs/2.x/concepts/views#html-head).

<div class="Alert">

To avoid any duplication when used in child component, please give a unique identifier with the <code>hid</code> key. [Learn more](https://vue-meta.nuxtjs.org/api/#tagidkeyname).

</div>

For the meta description, you need to add the unique identifier `hid` so vue-meta will know that it has to overwrite the default tag.

Your `nuxt.config.js`:

```js
...head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'keyword 1, keyword 2'},
      { hid: 'description', name: 'description', content: 'This is the generic description.'}
    ],
  },
...
```

And then in your individual page:

```js
export default {
  head() {
    return {
      title: `Page 1 (${this.name}-side)`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Page 1 description'
        }
      ]
    }
  }
}
```

To learn how to use the `head` property in your pages, please see the [HTML head documentation](/docs/2.x/concepts/views#html-head).
