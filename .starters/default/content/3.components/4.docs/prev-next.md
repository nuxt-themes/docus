# Prev Next

Component for rendering `PrevNext` navigation links.

## Design Tokens

```ts [tokens.config.ts]
import { defineTheme } from 'pinceau'

export default defineTheme({
  docus: {
    docs: {
      prevNext: {
        gap: '{space.8}',
        padding: '{space.6}',
        backgroundColor: {
          initial: '{color.gray.50}',
          dark: '{color.gray.900}'
        },
        borderRadius: '{radii.2xs}',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: {
          initial: '{color.gray.200}',
          dark: '{color.gray.800}'
        },
        boxShadow: {
          static: {
            initial: 'none',
            dark: 'inset 0.25px 0.5px 0px hsla(0,0%,100%,.1), inset -0.25px 0px 0px hsla(0,0%,100%,.1), {shadow.xs}'
          },
          hover: {
            initial: 'none',
            dark: 'inset 0.25px 0.5px 0px hsla(0,0%,100%,.1), inset -0.25px 0px 0px hsla(0,0%,100%,.1), {shadow.lg}'
          }
        },
        title: {
          color: {
            hover: '{color.primary.500}'
          },
          fontWeight: '{fontWeight.medium}',
          marginBottom: '{space.2}'
        },
        directory: {
          marginBottom: '{space.3}',
          fontSize: '{text.xs.fontSize}',
          lineHeight: '{text.xs.lineHeight}',
          fontWeight: '{fontWeight.medium}',
          color: '{color.gray.500}'
        },
        icon: {
          size: '{space.8}',
          marginBottom: '{space.4}'
        },
        description: {
          fontSize: '{text.sm.fontSize}',
          lineHeight: '{text.sm.lineHeight}',
          color: '{color.gray.500}'
        }
      }
    },
  }
})
```