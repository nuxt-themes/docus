<script setup lang="ts">
const { navigation } = useContent()
const { config } = useDocus()

const filtered = computed(() => config.value.aside?.exclude || [])

const links = computed(() => {
  return (navigation.value || []).filter((item: any) => {
    if (filtered.value.includes(item._path)) { return false }
    return true
  })
})

const { visible, open, close } = useMenu()

watch(visible, v => (v ? open() : close()))
</script>

<template>
  <button aria-label="Menu" @click="open">
    <Icon name="heroicons-outline:menu" aria-hidden="”true”" />
  </button>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <Drawer v-model="visible">
    <nav class="nav" @click.stop>
      <div class="drawer-header">
        <button aria-label="Menu" @click="close">
          <Icon name="heroicons-outline:x" aria-hidden="”true”" />
        </button>

        <div class="icons">
          <AppSocialIcons />
        </div>
      </div>

      <DocsAsideTree :links="links" class="links" />
    </nav>
  </Drawer>
</template>

<style scoped lang="ts">
css({
  button: {
    position: 'relative',
    zIndex: '{docus.app.header.drawer.button.zIndex}',
    display: 'flex',
    padding: '{docus.app.header.drawer.button.padding}',
    paddingInlineStart: '{docus.app.header.drawer.button.paddingInlineStart}',
    '@lg': {
      display: 'none'
    },
    color: '{docus.app.header.drawer.button.color.static}',
    '&:hover': {
      color: '{docus.app.header.drawer.button.color.hover}',
    },
  },

  // Drawer content
  nav: {
    width: '100%',
    borderRightWidth: '{docus.app.header.drawer.menu.borderRightWidth}',
    borderRightStyle: '{docus.app.header.drawer.menu.borderRightStyle}',
    borderRightColor: '{docus.app.header.drawer.menu.borderRightColor}',
    backgroundColor: '{docus.app.header.drawer.menu.backgroundColor}',

    // Drawer header
    '& .drawer-header': {
      height: '{docus.app.header.drawer.menu.header.height}',
      display: 'flex',
      alignItems: '{docus.app.header.drawer.menu.header.alignItems}',
      justifyContent: '{docus.app.header.drawer.menu.header.justifyContent}',
      borderBottomWidth: '{docus.app.header.drawer.menu.header.borderBottomWidth}',
      borderBottomStyle: '{docus.app.header.drawer.menu.header.borderBottomStyle}',
      borderBottomColor: '{docus.app.header.drawer.menu.header.borderBottomColor}',
      gap: '{docus.app.header.drawer.menu.header.gap}',
      px: '{docus.app.header.drawer.menu.paddingX}',

      '.icons': {
        display: 'flex',
        alignItems: 'center',
        overflow: 'auto',
        ':deep(.icon)': {
          width: '{docus.app.header.drawer.menu.header.icon.size}',
          height: '{docus.app.header.drawer.menu.header.icon.size}'
        }
      }
    },

    '& .links': {
      height: 'calc(100vh - {docus.app.header.height})',
      overflowY: 'auto',
      px: '{docus.app.header.drawer.menu.paddingX}',
      paddingTop: '{docus.app.header.drawer.menu.links.paddingTop}',
    }
  }

})
</style>
