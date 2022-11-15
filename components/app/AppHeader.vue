<script setup lang="ts">
const { navigation } = useContent()
const { hasDocSearch } = useDocSearch()
const hasDialog = computed(() => navigation.value?.length > 1)
</script>

<template>
  <header :class="{ 'has-dialog': hasDialog, 'has-doc-search': hasDocSearch }">
    <AppContainer>
      <section class="left">
        <AppHeaderDialog v-if="hasDialog" />
        <AppHeaderLogo />
      </section>

      <section class="center">
        <AppHeaderLogo v-if="hasDialog" />
        <AppHeaderNavigation />
      </section>

      <section class="right">
        <AppSearch v-if="hasDocSearch" />
        <ThemeSelect />
        <AppSocialIcons />
      </section>
    </AppContainer>
  </header>
</template>

<style scoped lang="ts">
css({
  ':deep(.icon)': {
    width: '{space.4}',
    height: '{space.4}'
  },

  '.navbar-logo': {
    '.left &': {
      '.has-dialog &': {
        display: 'none',
        '@mq.lg': {
          display: 'block'
        }
      },
    },
    '.center &': {
      display: 'block',
      '@mq.lg': {
        display: 'none'
      }
    }
  },

  header: {
    backdropFilter: '{backdrop.filter}',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    width: '100%',
    borderBottom: '1px solid {colors.gray.100}',
    backgroundColor: '{backdrop.background}',
    height: '{docus.header.height}',

    '@dark': {
      borderBottom: '1px solid {colors.gray.900}',
    },

    '.container': {
      display: 'grid',
      height: '100%',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      gap: '2rem'
    },

    section: {
      display: 'flex',
      alignItems: 'center',
      flex: 'none',
      '&.left': {
        gridColumn: 'span 2 / span 2'
      },
      '&.center': {
        gridColumn: 'span 8 / span 8',
        justifyContent: 'center',
        flex: '1'
      },
      '&.right': {
        display: 'flex',
        gridColumn: 'span 2 / span 2',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 'none',
        gap: '{space.4}',
      }
    }
  }
})
</style>
