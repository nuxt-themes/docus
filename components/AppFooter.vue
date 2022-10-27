<script setup lang="ts">
const docus = useDocus()

const socialIcons = ref(null)
const icons = computed(() => docus.value.footer?.iconLinks || [])
const socialIconsCount = computed(() => Object.entries(docus.value.socials).filter(([_, v]) => v).length)
const nbSocialIcons = computed(() => (socialIcons.value ? socialIconsCount.value : 0))
const showOverrideAlert = computed(() => process.dev && (nbSocialIcons.value + icons.value.length) > 6)
</script>

<template>
  <footer class="border u-bg-white u-border-gray-100">
    <AppContainer>
      <div class="flex flex-col items-center h-full gap-4 py-4 sm:flex-row sm:justify-between sm:gap-x-16">
        <a v-if="docus.footer?.credits" href="https://nuxt.studio/themes/docus" rel="noopener" target="_blank" class="flex items-center u-text-gray-700 hover:u-text-gray-900">
          <Icon name="IconDocus" class="w-4 h-4 mr-2 " />
          <p class="text-xs font-semibold">Powered by Docus</p>
        </a>
        <div class="flex items-center gap-3">
          <a
            v-for="icon in icons.slice(0, 6 - nbSocialIcons)"
            :key="icon.label"
            rel="noopener"
            :aria-label="icon.label"
            :href="icon.href"
            target="_blank"
            class="flex items-center text-sm font-medium u-text-gray-700 hover:u-text-gray-900"
          >
            <Icon :name="icon.icon" class="w-5 h-5" />
          </a>
          <SocialIcons ref="socialIcons" size="w-4 h-4" />
        </div>
      </div>
      <Alert v-if="showOverrideAlert" type="info">
        <div>
          <p>Please consider to override <code>AppFooter.vue</code> if you want to add more icons</p>
        </div>
      </Alert>
    </AppContainer>
  </footer>
</template>
