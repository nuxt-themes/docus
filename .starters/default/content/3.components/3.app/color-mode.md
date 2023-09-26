# Color Mode

A toggle between light and dark mode, using [`@nuxtjs/color-mode`](https://color-mode.nuxtjs.org/) under the hood.

## Design Tokens

```ts [tokens.config.ts]
import { defineTheme } from 'pinceau'

export default defineTheme({
  docus: {
    app: {
      colorMode: {
        padding: '{space.4}',
        color: {
          static: '{elements.text.secondary.color.static}',
          hover: '{elements.text.secondary.color.hover}'
        }
      },
    }
  }
})
```