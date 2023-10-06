<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'

const appFooterRef = ref(null) as Ref<HTMLElement | null>

const { height } = useElementBounding(appFooterRef)
const { config } = useDocus()
const socialIcons = ref(null)
const icons = computed(() => config.value?.footer?.iconLinks || [])
const textLinks = computed(() => config.value?.footer?.textLinks || [])
const socialIconsCount = computed(() => Object.entries(config.value?.socials || {}).filter(([, v]) => v).length)
const nbSocialIcons = computed(() => (socialIcons.value ? socialIconsCount.value : 0))

watch(height, (value) => {
  document.documentElement.style.setProperty('--app-footer-height', `${value}px`)
})
</script>

<template>
  <footer
    ref="appFooterRef"
    class="flex min-h-[145px] sm:min-h-[100px] border-t border-primary-static py-4"
  >
    <Container
      padded
      class="footer-layout grid grid-cols-12 justify-items-center sm:justify-items-stretch gap-2"
    >
      <div class="left flex col-span-12 sm:col-span-3 order-1 sm:order-none py-4">
        <a
          v-if="config?.footer?.credits"
          :href="config?.footer?.credits?.href || '#'"
          rel="noopener"
          target="_blank"
          class="footer-credits flex items-center text-xs font-medium text-secondary-static text-secondary-hover"
        >
          <Component
            :is="config?.footer?.credits?.icon"
            v-if="config?.footer?.credits?.icon"
            class="credits-icon w-4 h-4 me-2 shrink-0 text-current"
          />
          <span
            v-if="config?.footer?.credits?.text"
          >
            {{ config.footer.credits.text }}
          </span>
        </a>
      </div>

      <div class="center flex flex-col sm:flex-row items-center justify-start sm:justify-center col-span-12 sm:col-span-6">
        <NuxtLink
          v-for="link in textLinks"
          :key="link.href"
          class="text-link p-2 text-sm font-medium"
          :aria-label="link.text"
          :href="link.href"
          :target="link?.target || '_self'"
          :rel="link?.rel || 'noopener noreferrer'"
        >
          {{ link.text }}
        </NuxtLink>
      </div>

      <div class="right flex items-center justify-end col-span-12 sm:col-span-3 sm:-me-4">
        <a
          v-for="icon in icons.slice(0, 6 - nbSocialIcons)"
          :key="icon.label"
          class="icon-link [&_.icon]:w-4 [&_.icon]:h-4 flex p-4 text-secondary-static text-secondary-hover"
          :aria-label="icon.label"
          :href="icon.href"
          target="_blank"
          :rel="icon?.rel || 'noopener noreferrer'"
        >
          <Icon :name="icon.icon" />
        </a>
        <AppSocialIcons
          ref="socialIcons"
          class="[&_.icon]:w-4 [&_.icon]:h-4"
        />
      </div>
    </Container>
  </footer>
</template>
