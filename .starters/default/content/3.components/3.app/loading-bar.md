# Loading Bar

The loading bar is a component that is displayed at the top of the page when the user navigates between pages.

## Design Tokens

```ts [tokens.config.ts]
import { defineTheme } from 'pinceau'

export default defineTheme({
  docus: {
    app: {
      loadingBar: {
        height: '3px',
        gradientColorStop1: '{color.primary.600}',
        gradientColorStop2: '{color.primary.500}',
        gradientColorStop3: '{color.secondary.500}'
      },
    }
  }
})
```