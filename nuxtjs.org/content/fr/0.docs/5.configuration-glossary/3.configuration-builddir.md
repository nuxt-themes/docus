---
title: 'La Propriété buildDir'
description: Définie le répertoire dist pour notre application Nuxt.js
menu: buildDir
category: configuration-glossary
position: 2
---

- Type : `String`
- Par défaut : `.nuxt`

> Définie le répertoire dist pour notre application Nuxt.js

```js{}[nuxt.config.js]
export default {
  buildDir: 'nuxt-dist'
}
```

Par défaut, de nombreux outils supposent que `.nuxt` est un répertoire caché, car son nom commence par un point. Vous pouvez utiliser cette option pour éviter cela.
