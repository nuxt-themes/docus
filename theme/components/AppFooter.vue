<script setup lang="ts">
const docus = useDocus()

const socialIcons = ref(null)
const icons = computed(() => docus.value.footer?.icons || [])
const nbSocialIcons = computed(() => (socialIcons.value ? Object.keys(docus.value.socials).length : 0))
const nbIcons = computed(() => nbSocialIcons.value + icons.value.length)
</script>

<template>
  <footer class="border u-bg-white u-border-gray-100">
    <AppContainer>
      <div class="flex flex-col items-center h-full gap-4 py-4 sm:flex-row sm:justify-between sm:gap-x-16">
        <a v-if="docus.footer?.credits" :href="docus.footer.credits.href" rel="noopener" target="_blank" class="flex items-center u-text-gray-700 hover:u-text-gray-900">
          <Component :is="docus.footer.credits.icon" v-if="docus.footer.credits.icon" class="w-4 h-4 mr-2 fill-current" />
          <p class="text-xs font-semibold">{{ docus.footer.credits.text }}</p>
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
            <Icon :name="icon.icon || icon.component" class="w-4 h-4" />
          </a>
          <SocialIcons ref="socialIcons" size="w-4 h-4" />
        </div>
      </div>
      <Alert v-if="nbIcons > 6" type="info">
        <div>
          <p>Please consider to override Footer.vue if you want to add more icons</p>
        </div>
      </Alert>
    </AppContainer>
  </footer>
</template>
