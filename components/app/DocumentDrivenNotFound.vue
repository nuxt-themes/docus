<template>
  <div class="document-driven-not-found not-prose">
    <main>
      <p>
        404
      </p>
      <div class="content">
        <div class="text-section">
          <h1>
            Not Found
          </h1>
          <p>
            This is not the page you're looking for.
          </p>
        </div>

        <div class="button-section">
          <ButtonLink href="/" size="large" variant="primary">
            Go back home
          </ButtonLink>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="ts">
css({
  '.document-driven-not-found': {
    display: 'flex',
    flex: '1',
    px: '{space.4}',
    py: '{space.16}',
    '@mq.sm': {
      px: '{space.6}',
      py: '{space.24}',
    },

    '@mq.md': {
      display: 'grid',
      placeItems: 'center',
    },

    '@mq.lg': {
      px: '{space.8}',
    },

    main: {
      mx: 'auto',
      maxWidth: '{size.full}',

      '@mq.sm': {
        display: 'flex',
        gap: '{space.6}'
      },

      // 404
      '& > p': {
        fontSize: '{fontSizes.4xl}',
        fontWeight: '{fontWeights.bold}',
        lineHeight: '{leads.tight}',
        color: '{colors.primary.500}',
        '@mq.sm': {
          fontSize: '{fontSizes.5xl}',
        }
      },

      '.content': {
        '.text-section': {
          borderColor: '{colors.gray.200}',
          borderLeftStyle: 'solid',
          borderLeftWidth: '1px',
          border: 'none',


          '@dark': {
            borderColor: '{colors.gray.800}',
          },

          '@mq.sm': {
            borderColor: '{colors.gray.200}',
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            paddingLeft: '{space.6}'
          },

          h1: {
            fontSize: '{fontSizes.4xl}',
            fontWeight: '{fontWeights.extrabold}',
            letterSpacing: '{letterSpacings.tight}',
            color: '{colors.gray.900}',
            '@dark': {
              color: '{colors.gray.200}',
            },
            '@mq.sm': {
              fontSize: '{fontSizes.5xl}',
            },
          },

          p: {
            marginTop: '{space.1}',
            fontSize: '{fontSizes.xl}',
            color: '{colors.gray.700}',
            '@dark': {
              color: '{colors.gray.400}',
            },
          }
        },

        // Button section
        '.button-section': {
          marginTop: '{space.10}',
          flex: 'none',
          gap: '{space.3}'
        }
      }
    }
  }
})
</style>
