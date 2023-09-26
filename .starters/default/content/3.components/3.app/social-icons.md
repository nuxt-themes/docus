# Social Icons

A list of social icons links.

Currently supported social websites are: Twitter, Facebook, Instagram, Youtube, GitHub and Medium.

## Configuration

```ts [app.config.ts]
export default defineAppConfig({
  docus: {
    socials: {
      twitter: 'nuxtstudio',
      github: 'nuxt-themes/docus'
    },
  }
})
```

## Design Tokens

```ts [tokens.config.ts]
import { defineTheme } from 'pinceau'

export default defineTheme({
  docus: {
    app: {
      socialIcons: {
        padding: '{space.4}',
        color: {
          static: '{elements.text.secondary.color.static}',
          hover: '{elements.text.secondary.color.hover}'
        }
      }
    }
  }
})
```