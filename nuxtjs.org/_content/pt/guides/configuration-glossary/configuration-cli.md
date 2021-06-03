---
title: 'A propriedade cli'
description: O Nuxt.js permite que você personalize a configuração do CLI.
menu: cli
category: configuration-glossary
position: 3
---

> O Nuxt.js permite que você personalize a configuração do CLI.

## bannerColor

- Tipo: `String`
  - Padrão: `'green'`

Mude a cor do título 'Nuxt.js' no banner CLI.

**Cores disponiveis:**

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

```js{}[nuxt.config.js]
export default {
  cli: {
    bannerColor: 'yellow'
  }
}
```
