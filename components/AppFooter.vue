<script setup lang="ts">
const docus = useDocus()
const socialIcons = ref(null)
const icons = computed(() => docus.value.footer?.iconLinks || [])
const socialIconsCount = computed(() => Object.entries(docus.value.socials).filter(([_, v]) => v).length)
const nbSocialIcons = computed(() => (socialIcons.value ? socialIconsCount.value : 0))
</script>

<template>
  <footer>
    <AppContainer padded class="footer-container">
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
          <Icon :name="icon.icon || icon.component" size="4" />
        </a>
        <SocialIcons ref="socialIcons" size="4" />
      </div>
    </AppContainer>
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
    borderTopColor: '{colors.gray.100}',

    a: {
      color: '{colors.gray.500}',
      '@dark': {
        color: '{colors.gray.400}'
      },
      '&:hover': {
        color: '{colors.gray.700}',
        '@dark': {
          color: '{colors.gray.200}',
        }
      },
    },

    '@dark': {
      borderTopColor: '{colors.gray.900}'
    },

    '.left': {
      display: 'flex',
      alignItems: 'center',

      p: {
        fontSize: '{fontSizes.xs}',
        fontWeight: '{fontWeights.bold}'
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
      '@mq.sm': {
        flexDirection: 'row',
        justifyContent: 'space-between',
      }
    }
  }
})
</style>
