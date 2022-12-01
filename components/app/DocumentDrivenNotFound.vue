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
    '@sm': {
      px: '{space.6}',
      py: '{space.24}',
    },

    '@md': {
      display: 'grid',
      placeItems: 'center',
    },

    '@lg': {
      px: '{space.8}',
    },

    main: {
      mx: 'auto',
      maxWidth: '{size.full}',

      '@sm': {
        display: 'flex',
        gap: '{space.6}'
      },

      // 404
      '& > p': {
        fontSize: '{fontSize.4xl}',
        fontWeight: '{fontWeight.bold}',
        lineHeight: '{lead.tight}',
        color: '{color.primary.500}',
        '@sm': {
          fontSize: '{fontSize.5xl}',
        }
      },

      '.content': {
        '.text-section': {
          borderColor: '{color.gray.200}',
          borderLeftStyle: 'solid',
          borderLeftWidth: '1px',
          border: 'none',

          '@dark': {
            borderColor: '{color.gray.800}',
          },

          '@sm': {
            borderColor: '{color.gray.200}',
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            paddingLeft: '{space.6}'
          },

          h1: {
            fontSize: '{fontSize.4xl}',
            fontWeight: '{fontWeight.extrabold}',
            letterSpacing: '{letterSpacing.tight}',
            color: '{color.gray.900}',
            '@dark': {
              color: '{color.gray.200}',
            },
            '@sm': {
              fontSize: '{fontSize.5xl}',
            },
          },

          p: {
            marginTop: '{space.1}',
            fontSize: '{fontSize.xl}',
            color: '{color.gray.700}',
            '@dark': {
              color: '{color.gray.400}',
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
