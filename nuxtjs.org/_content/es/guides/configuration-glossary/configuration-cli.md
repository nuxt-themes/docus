---
title: 'La propiedad cli'
description: Nuxt.js le permite personalizar la configuración de CLI.
menu: cli
category: configuration-glossary
position: 3
---

> Nuxt.js le permite personalizar la configuración de CLI.

## bannerColor

- Tipo: `String`
  - Por defecto: `'green'`

Cambie el color del título 'Nuxt.js' en el banner de la CLI.

**Colores disponibles:**

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

```js{}[nuxt.config.js]
export default {
  cli: {
    bannerColor: 'yellow'
  }
}
```
