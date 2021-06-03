---
title: Comment utiliser des ressources externes ?
description: Comment utiliser des ressources externes avec Nuxt.js ?
category: configuration
position: 1
---

## Paramètres globaux

Ajoutez vos ressources dans le fichier `nuxt.config.js` :

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
        href: 'https://fonts.googleapis.com/css?family=Roboto'
      }
    ]
  }
}
```

## Paramètres locaux

Ajoutez vos ressources dans votre fichier `.vue` dans votre répertoire `pages/` :

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
            href: 'https://fonts.googleapis.com/css?family=Roboto'
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
