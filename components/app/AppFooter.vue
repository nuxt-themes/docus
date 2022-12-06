<script setup lang="ts">
const docus = useDocus()
const socialIcons = ref(null)
const icons = computed(() => docus.value.footer?.iconLinks || [])
const socialIconsCount = computed(() => Object.entries(docus.value.socials).filter(([_, v]) => v).length)
const nbSocialIcons = computed(() => (socialIcons.value ? socialIconsCount.value : 0))
</script>

<template>
  <footer>
    <Container padded class="footer-container">
      <!-- Left -->
      <a v-if="docus.footer?.credits" :href="docus.footer.credits.href" rel="noopener" target="_blank" class="left">
        <Component :is="docus.footer.credits.icon" v-if="docus.footer.credits.icon" class="left-icon" />
        <p>{{ docus.footer.credits.text }}</p>
      </a>

      <!-- Right -->
      <div class="right">
        <a
          v-for="icon in icons.slice(0, 6 - nbSocialIcons)"
          :key="icon.label"
          rel="noopener"
          :aria-label="icon.label"
          :href="icon.href"
          target="_blank"
        >
          <Icon :name="icon.icon || icon.component" />
        </a>
        <AppSocialIcons ref="socialIcons" />
      </div>
    </Container>
  </footer>
</template>

<style lang="ts" scoped>
css({
  footer: {
    height: '{docus.footer.height}',
    display: 'flex',
    alignItems: 'center',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: '{color.gray.100}',

    ':deep(.icon)': {
      width: '{space.4}',
      height: '{space.4}'
    },

    a: {
      color: '{color.gray.500}',
      '@dark': {
        color: '{color.gray.400}'
      },
      '&:hover': {
        color: '{color.gray.700}',
        '@dark': {
          color: '{color.gray.200}',
        }
      },
    },

    '@dark': {
      borderTopColor: '{color.gray.900}'
    },

    '.left': {
      display: 'flex',
      alignItems: 'center',

      p: {
        fontSize: '{fontSize.xs}',
        fontWeight: '{fontWeight.bold}'
      },

      '&-icon': {
        width: '{space.4}',
        fill: 'currentcolor',
        marginRight: '{space.2}',
      }
    },

    '.right': {
      display: 'flex',
      alignItems: 'center',
      gap: '{space.4}'
    },

    '.footer-container': {
      display: 'flex',
      flexDirection: 'col',
      alignItems: 'center',
      height: '100%',
      gap: '{space.4}',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  }
})
</style>
