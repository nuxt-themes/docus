<script setup lang="ts">
const docus = useDocus()

const socialIcons = ref(null)
const icons = computed(() => docus.value.footer?.icons || [])
const socialIconsCount = computed(() => Object.entries(docus.value.socials).filter(([_, v]) => v).length)
const nbSocialIcons = computed(() => (socialIcons.value ? socialIconsCount.value : 0))
</script>

<template>
  <footer>
    <AppContainer padded class="footer-container">
      <a v-if="docus.footer?.credits" :href="docus.footer.credits.href" rel="noopener" target="_blank" class="flex items-center u-text-gray-700 hover:u-text-gray-900">
        <Component :is="docus.footer.credits.icon" v-if="docus.footer.credits.icon" class="w-4 h-4 mr-2 fill-current" />
        <p class="text-xs font-semibold">{{ docus.footer.credits.text }}</p>
      </a>
      <div class="flex items-center gap-4">
        <a
          v-for="icon in icons.slice(0, 6 - nbSocialIcons)"
          :key="icon.label"
          rel="noopener"
          :aria-label="icon.label"
          :href="icon.href"
          target="_blank"
          class="flex items-center text-sm font-medium u-text-gray-700 hover:u-text-gray-900"
        >
          <Icon :name="icon.icon || icon.component" class="w-4 h-4" />
        </a>
        <SocialIcons ref="socialIcons" size="4" space="2" />
      </div>
    </AppContainer>
  </footer>
</template>

<style lang="ts" scoped>
css({
  footer: {
    height: '{docus.footer.height}',

    '@dark': {
      backgroundColor: '{colors.black}',
    },
    '@light': {
      backgroundColor: '{colors.white}'
    },

    '.footer-container': {
      // flex flex-col items-center h-full gap-4 py-4 sm:flex-row sm:justify-between sm:gap-x-16
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
