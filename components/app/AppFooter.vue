<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import appConfig from '#build/app.config'

const appFooterRef = ref(null) as Ref<HTMLElement | null>

const { height } = useElementBounding(appFooterRef)
const { tokens } = appConfig
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
    :class="[Object.values(tokens.appFooter.root)]"
  >
    <Container
      padded
      class="footer-layout"
      :class="[Object.values(tokens.appFooter.layout.root)]"
    >
      <div
        class="left"
        :class="[Object.values(tokens.appFooter.layout.left)]"
      >
        <a
          v-if="config?.footer?.credits"
          :href="config?.footer?.credits?.href || '#'"
          rel="noopener"
          target="_blank"
          class="footer-credits flex items-center"
          :class="[Object.values(tokens.appFooter.credits.text)]"
        >
          <Component
            :is="config?.footer?.credits?.icon"
            v-if="config?.footer?.credits?.icon"
            class="credits-icon"
            :class="[Object.values(tokens.appFooter.credits.icon)]"
          />
          <span
            v-if="config?.footer?.credits?.text"
          >
            {{ config.footer.credits.text }}
          </span>
        </a>
      </div>

      <div
        class="center"
        :class="[Object.values(tokens.appFooter.layout.center)]"
      >
        <NuxtLink
          v-for="link in textLinks"
          :key="link.href"
          class="text-link"
          :class="[Object.values(tokens.appFooter.textLink)]"
          :aria-label="link.text"
          :href="link.href"
          :target="link?.target || '_self'"
          :rel="link?.rel || 'noopener noreferrer'"
        >
          {{ link.text }}
        </NuxtLink>
      </div>

      <div
        class="right"
        :class="[Object.values(tokens.appFooter.layout.right)]"
      >
        <a
          v-for="icon in icons.slice(0, 6 - nbSocialIcons)"
          :key="icon.label"
          class="icon-link"
          :class="[Object.values(tokens.appFooter.iconLink)]"
          :aria-label="icon.label"
          :href="icon.href"
          target="_blank"
          :rel="icon?.rel || 'noopener noreferrer'"
        >
          <Icon :name="icon.icon" />
        </a>
        <AppSocialIcons
          ref="socialIcons"
          :class="[tokens.appFooter.iconLink.width, tokens.appFooter.iconLink.height]"
        />
      </div>
    </Container>
  </footer>
</template>
