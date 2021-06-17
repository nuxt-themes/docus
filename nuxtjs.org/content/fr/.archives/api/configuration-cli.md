---
title: 'API: La propriété cli'
description: Nuxt.js vous permet de personnaliser la configuration CLI.
menu: cli
category: configuration
position: 103
---

> Nuxt.js vous permet de personnaliser la configuration CLI.

## bannerColor

- Type: `String`
- Par défaut: `green`

Modifiez la couleur du titre 'Nuxt.js' dans la bannière CLI.

Couleurs disponibles:

- `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

Exemple (`nuxt.config.js`):

```js
export default {
  cli: {
    bannerColor: 'yellow'
  }
}
```
