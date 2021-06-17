---
title: 'La Propriété cli'
description: Nuxt.js vous permet de personnaliser la configuration du CLI.
menu: cli
category: configuration-glossary
position: 3
---

> Nuxt.js vous permet de personnaliser la configuration du CLI.

## bannerColor

- Type: `String`
  - Default: `'green'`

Change la couleur du titre 'Nuxt.js' dans la bannière du CLI.

**Couleurs disponibles :**

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

```js{}[nuxt.config.js]
export default {
  cli: {
    bannerColor: 'yellow'
  }
}
```
