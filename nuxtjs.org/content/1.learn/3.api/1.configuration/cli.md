---
title: 'The cli Property'
description: Nuxt.js lets you customize the CLI configuration.
category: api-configuration
---

> Nuxt.js lets you customize the CLI configuration.

## bannerColor

- Type: `String`
  - Default: `'green'`

Change the color of the 'Nuxt.js' title in the CLI banner.

**Available colors:**

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

```js{}[nuxt.config.js]
export default {
  cli: {
    bannerColor: 'yellow'
  }
}
```
