---
title: 'The cli Property'
description: Nuxt.js lets you customize the CLI configuration.
menu: cli
category: configuration
position: 103
---

> Nuxt.js lets you customize the CLI configuration.

## bannerColor

- Type: `String`
- Default: `green`

Change the color of the 'Nuxt.js' title in the CLI banner.

Available colors:

- `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

Example (`nuxt.config.js`):

```js
export default {
  cli: {
    bannerColor: 'yellow'
  }
}
```
