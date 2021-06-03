---
title: How to use external resources?
description: How to use external resources with Nuxt.js?
category: configuration
position: 1
---

## Global Settings

You can include your external resources in the head object or function. As described in the [head API docs](https://nuxtjs.org/api/pages-head/), the following examples shows the use of `head` as an object and as a function. If you want to use values from your Vue component like computed properties or data, you can use the `head()` function, returning the final head object. You can also pass each resource an optional `body: true` to include the resource before the closing `</body>` tag.

Include your resources in `nuxt.config.js` (here in the head object):

```js
export default {
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  }
}
```

## Local Settings

Include your resources in your `.vue` file inside the `pages/` directory (here in the head function):

```html
<template>
  <h1>About page with jQuery and Roboto font</h1>
</template>

<script>
  export default {
    head() {
      return {
        script: [
          {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
          }
        ],
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-family: Roboto, sans-serif;
  }
</style>
```
