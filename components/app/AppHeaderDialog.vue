<script setup lang="ts">
import ThemeSelect from './ThemeSelect.vue'

const { navigation } = useContent()
const docus = useDocus()

const filtered = computed(() => docus.value.header?.exclude || [])

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
            <AppSocialIcons />
            <ThemeSelect />
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
    '@mq.lg': {
      display: 'none'
    },
    color: '{colors.gray.500}',
    '@dark': {
      color: '{colors.gray.400}',
    },
    '&:hover': {
      color: '{colors.gray.700}',
      '@dark': {
        color: '{colors.gray.200}',
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
    '@mq.lg': {
      display: 'none'
    },
    // Dialog content
    '& > div': {
      maxWidth: '{size.xs}',
      width: '100%',
      minHeight: '100%',
      boxShadow: '{shadows.md}',
      px: '{space.4}',
      backgroundColor: '{colors.white}',
      '@dark': {
        backgroundColor: '{colors.black}',
      },
      '@mq.sm': {
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
