---
title: La propriété layout
description: Chaque fichier (du premier niveau) dans le répertoire des `layouts` créera un layout customisé accessible depuis la propriété `layout` dans le composant page.
menu: La propriété layout
category: components-glossary
position: 4
---

> Chaque fichier (du premier niveau) dans le répertoire des `layouts` créera un layout customisé accessible depuis la propriété `layout` dans le composant page.

- **Type:** `String` ou `Function` (par défaut: `'default'`)

Utilisez la clé `layout` dans vos composants pages pour définir un layout à utiliser:

```js
export default {
  layout: 'blog',
  // OU
  layout(context) {
    return 'blog'
  }
}
```
