# Navigation

Component for rendering main navigation. Could be a vertical or horizontal list of links, with or without icons.

Navigation links list comes from Nuxt Content module [`useContent`](https://content.nuxtjs.org/api/composables/use-document-driven/) composable.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `vertical` | `Boolean` | `false` | List direction: vertical or horizontal |

## Design Tokens

```ts [tokens.config.ts]
import { defineTheme } from 'pinceau'

export default defineTheme({
  docus: {
    app: {
      navigation: {
        gap: '{space.2}',
        vertical: {
          marginBottom: '{space.4}',
          gap: '{space.0}',
          link: {
            padding: '{space.2} 0'
          }
        },
        link: {
          padding: '{space.1} {space.2}',
          fontWeight: '{fontWeight.semibold}',
          gap: '{space.2}',
          fontSize: '{fontSize.sm}',
          icon: {
            size: '{space.4}'
          }
        }
      },
    }
  }
})
```