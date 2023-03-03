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
  <teleport to="body">
    <transition name="nested" :duration="200">
      <div v-if="visible" class="dialog-wrapper" @click="close">
        <div class="scrim" />
        <nav class="nav" @click.stop>
          <div class="dialog-header">
            <button aria-label="Menu" @click="close">
              <Icon name="heroicons-outline:x" aria-hidden="”true”" />
            </button>

            <div class="icons">
              <AppSocialIcons />
            </div>
          </div>

          <DocsAsideTree :links="links" />
        </nav>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="ts">
css({
  button: {
    position: 'relative',
    zIndex: '10',
    display: 'flex',
    padding: '{space.4} {space.4} {space.4} 0',
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
  '.dialog-wrapper': {
    position: 'fixed',
    inset: '0 0 0 0',
    zIndex: '50',
    display: 'flex',
    alignItems: 'flex-start',
    overflowY: 'auto',
    '@lg': {
      display: 'none'
    },

    // Scrim
    '& .scrim': {
      position: 'fixed',
      inset: '0 0 0 0',
      zIndex: '-1',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'saturate(200%) blur(10px)',
      // transformOrigin: 'left',
      '@dark': {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
    },

    '.icons': {
      overflow: 'auto'
    },
    // Dialog content
    '& nav': {
      maxWidth: '{size.xs}',
      width: '100%',
      minHeight: '100%',
      borderRight: '1px solid {elements.border.primary.static}',
      px: '{space.4}',
      backgroundColor: '{color.white}',
      '@dark': {
        backgroundColor: '{color.black}',
      },
      '@sm': {
        px: '{space.6}',
      },
      // Dialog header
      '& .dialog-header': {
        height: '{docus.header.height}',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid transparent',
        gap: '{space.2}',
        '.icons': {
          display: 'flex',
          alignItems: 'center',
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

<style scoped>
@media (prefers-reduced-motion: reduce)  {
  .nav, .scrim {
    transition: all 0ms !important;
  }
}

.nested-enter-active .scrim,
.nested-leave-active .scrim {
  transition: transform 200ms ease-out, opacity 200ms linear;
}

.nested-enter-from .scrim,
.nested-leave-to .scrim {
  transform-origin: left;
  transform: scaleX(0);
  opacity: 0;
}

.nested-enter-active .nav,
.nested-leave-active .nav {
  transition: transform 200ms ease-out, opacity 200ms linear;
}

.nested-enter-from .nav,
.nested-leave-to .nav {
  opacity: 0;
  transform: translate3d(-50px, 0, 0);
}
</style>
