<script setup lang="ts">
import ThemeSelect from './ThemeSelect.vue'

const { navigation } = useContent()
const docus = useDocus()

const filtered = computed(() => docus.value.aside?.exclude || [])

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
  <teleport to="body">
    <nav v-if="visible" class="dialog" @click="close">
      <div @click.stop>
        <div>
          <button aria-label="Menu" @click="close">
            <Icon name="heroicons-outline:x" aria-hidden="”true”" />
          </button>

          <div class="icons">
            <ThemeSelect />
            <AppSocialIcons />
          </div>
        </div>

        <DocsAsideTree :links="links" />
      </div>
    </nav>
  </teleport>
</template>

<style scoped lang="ts">
css({
  button: {
    position: 'relative',
    zIndex: '10',
    borderRadius: '{radii.xl}',
    '@lg': {
      display: 'none'
    },
    color: '{color.gray.500}',
    '@dark': {
      color: '{color.gray.400}',
    },
    '&:hover': {
      color: '{color.gray.700}',
      '@dark': {
        color: '{color.gray.200}',
      }
    },
  },
  '.dialog': {
    position: 'fixed',
    inset: '0 0 0 0',
    zIndex: '50',
    display: 'flex',
    alignItems: 'flex-start',
    overflowY: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: '{backdrop.filter}',
    '@dark': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    '@lg': {
      display: 'none'
    },
    // Dialog content
    '& > div': {
      maxWidth: '{size.xs}',
      width: '100%',
      minHeight: '100%',
      boxShadow: '{shadow.md}',
      px: '{space.4}',
      backgroundColor: '{color.white}',
      '@dark': {
        backgroundColor: '{color.black}',
      },
      '@sm': {
        px: '{space.6}',
      },
      // Dialog header
      '& > div': {
        height: '{docus.header.height}',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid transparent',
        gap: '{space.2}',
        '.icons': {
          display: 'flex',
          alignItems: 'center',
          gap: '{space.4}'
        }
      }
    }
  },
  ':deep(.icon)': {
    width: '{space.4}',
    height: '{space.4}'
  }
})
</style>
