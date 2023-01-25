<script setup lang="ts">
const docus = useDocus()
const { navigation } = useContent()
const { hasDocSearch } = useDocSearch()

const hasDialog = computed(() => navigation.value?.length > 1)

defineProps({
  ...variants
})
</script>

<template>
  <header :class="{ 'has-dialog': hasDialog, 'has-doc-search': hasDocSearch }">
    <Container :fluid="docus?.layout?.fluid || false">
      <div class="section left">
        <AppHeaderDialog v-if="hasDialog" />
        <AppHeaderLogo />
      </div>

      <div class="section center">
        <AppHeaderLogo v-if="hasDialog" />
        <AppHeaderNavigation />
      </div>

      <div class="section right">
        <AppSearch v-if="hasDocSearch" />
        <ThemeSelect />
        <div class="social-icons">
          <AppSocialIcons />
        </div>
      </div>
    </Container>
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
        '@lg': {
          display: 'block'
        }
      },
    },
    '.center &': {
      display: 'block',
      '@lg': {
        display: 'none'
      }
    }
  },

  header: {
    backdropFilter: '{elements.backdrop.filter}',
    top: 0,
    zIndex: 10,
    width: '100%',
    borderBottom: '1px solid {elements.border.primary.default}',
    backgroundColor: '{elements.backdrop.background}',
    height: '{docus.header.height}',

    '.container': {
      display: 'grid',
      height: '100%',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      gap: '{space.2}'
    },

    '.section': {
      display: 'flex',
      alignItems: 'center',
      flex: 'none',
      '&.left': {
        gridColumn: 'span 4 / span 4'
      },
      '&.center': {
        gridColumn: 'span 4 / span 4',
        justifyContent: 'center',
        flex: '1'
      },
      '&.right': {
        display: 'flex',
        gridColumn: 'span 4 / span 4',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 'none',
        marginRight: 'calc(0px - {space.4})',
        '.social-icons': {
          display: 'none',
          '@md': {
            display: 'flex',
            alignItems: 'center',
          }
        }
      }
    }
  },
  variants: {
    fixed: {
      true: { position: 'sticky' },
      false: {},
    }
  }
})
</style>
