<script setup lang="ts">
const { config } = useDocus()
const { navigation } = useContent()
const { hasDocSearch } = useDocSearch()
const { y } = useWindowScroll()
const route = useRoute()

const hasDrawer = computed(() => navigation.value?.length > 1 || navigation.value?.[0]?.children?.length)

defineProps({
  ...variants
})

const isIndex = computed(() => route.path === '/')

watch(isIndex, (value) => {
  updateAppConfig({
    docus: {
      header: {
        fluid: !value
      }
    }
  })
}, { immediate: true })
</script>

<template>
  <header :class="{ 'has-drawer': hasDrawer, 'has-doc-search': hasDocSearch, 'is-index': isIndex, 'on-top': y === 0 }">
    <Container :fluid="config?.header?.fluid ">
      <div class="header-layout">
        <div class="section left">
          <AppHeaderDrawer v-if="hasDrawer" />
          <AppHeaderLogo />
        </div>

        <div class="section center">
          <AppHeaderLogo v-if="hasDrawer" />
          <AppNavigation v-if="config.header.navigation" />
        </div>

        <div class="section right">
          <AppSearch v-if="hasDocSearch" />
          <AppTextDirection />
          <AppColorMode />
          <div class="social-icons">
            <AppSocialIcons />
          </div>
        </div>
      </div>
    </Container>
  </header>
</template>

<style scoped lang="ts">
css({
  ':deep(.icon)': {
    width: '{docus.app.header.icon.size}',
    height: '{docus.app.header.icon.size}'
  },

  '.header-logo': {
    '.left &': {
      '.has-drawer &': {
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
    backdropFilter: '{docus.app.header.backdropFilter}',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    width: '100%',
    borderBottomWidth: '{docus.app.header.borderBottomWidth}',
    borderBottomStyle: '{docus.app.header.borderBottomStyle}',
    borderBottomColor: '{docus.app.header.borderBottomColor}',
    backgroundColor: '{docus.app.header.backgroundColor}',
    height: '{docus.app.header.height}',

    '&.is-index.on-top': {
      background: 'transparent',
      borderColor: 'transparent',
      backdropFilter: 'none',
    },

    '.header-layout': {
      display: 'grid',
      height: '100%',
      gridTemplateColumns: '{docus.app.header.layout.gridTemplateColumns}',
      gap: '{docus.app.header.layout.gap}',
    },

    '.section': {
      display: 'flex',
      alignItems: 'center',
      flex: 'none',

      '&.left': {
        gridColumn: '{docus.app.header.layout.left.gridColumn}',
        '@lg': {
          marginInlineStart: 0
        },
      },

      '&.center': {
        gridColumn: '{docus.app.header.layout.center.gridColumn}',
        justifyContent: 'center',
        flex: '1',
        zIndex: '1'
      },

      '&.right': {
        display: 'flex',
        gridColumn: '{docus.app.header.layout.right.gridColumn}',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 'none',
        marginInlineEnd: 'calc(0px - {space.4})',

        '.social-icons': {
          display: 'none',
          '@md': {
            display: 'flex',
            alignItems: 'center',
          }
        }
      }
    }
  }
})
</style>
