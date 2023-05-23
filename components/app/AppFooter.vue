<script setup lang="ts">
const { config } = useDocus()
const route = useRoute()
const socialIcons = ref(null)
const icons = computed(() => config.value?.footer?.iconLinks || [])
const textLinks = computed(() => config.value?.footer?.textLinks || [])
const socialIconsCount = computed(() => Object.entries(config.value?.socials || {}).filter(([, v]) => v).length)
const nbSocialIcons = computed(() => (socialIcons.value ? socialIconsCount.value : 0))

const isIndex = computed(() => route.path === '/')

watch(isIndex, (value) => {
  updateAppConfig({
    docus: {
      footer: {
        fluid: !value
      }
    }
  })
}, { immediate: true })
</script>

<template>
  <footer>
    <Container :fluid="config?.footer?.fluid" padded class="footer-layout">
      <!-- Left -->
      <div class="left">
        <a v-if="config?.footer?.credits" :href="config?.footer?.credits?.href || '#'" rel="noopener" target="_blank" class="footer-credits">
          <Component :is="config?.footer?.credits?.icon" v-if="config?.footer?.credits?.icon" class="credits-icon" />
          <p v-if="config?.footer?.credits?.text">{{ config.footer.credits.text }}</p>
        </a>
      </div>

      <!-- Center -->
      <div class="center">
        <NuxtLink
          v-for="link in textLinks"
          :key="link.href"
          class="text-link"
          :aria-label="link.text"
          :href="link.href"
          :target="link?.target || '_self'"
          :rel="link?.rel || 'noopener noreferrer'"
        >
          {{ link.text }}
        </NuxtLink>
      </div>

      <!-- Right -->
      <div class="right">
        <a
          v-for="icon in icons.slice(0, 6 - nbSocialIcons)"
          :key="icon.label"
          class="icon-link"
          :aria-label="icon.label"
          :href="icon.href"
          target="_blank"
          :rel="icon?.rel || 'noopener noreferrer'"
        >
          <Icon :name="icon.icon" />
        </a>
        <AppSocialIcons ref="socialIcons" />
      </div>
    </Container>
  </footer>
</template>

<style lang="ts" scoped>
css({
  footer: {
    display: 'flex',
    minHeight: '{docus.app.footer.height}',
    borderTopWidth: '{docus.app.footer.borderTopWidth}',
    borderTopStyle: '{docus.app.footer.borderTopStyle}',
    borderTopColor: '{docus.app.footer.borderTopColor}',
    padding: '{docus.app.footer.padding}',

    '.footer-layout': {
      display: 'grid',
      gridTemplateColumns: '{docus.app.footer.layout.gridTemplateColumns}',
      justifyItems: '{docus.app.footer.layout.justifyItems}',
      gap: '{docus.app.footer.layout.gap}',

      ':deep(.icon)': {
        width: '{docus.app.footer.icon.size}',
        height: '{docus.app.footer.icon.size}'
      },

      a: {
        color: '{elements.text.secondary.color.static}',
        '&:hover': {
          color: '{elements.text.secondary.color.hover}'
        },
      },

      '.left': {
        gridColumn: '{docus.app.footer.layout.left.gridColumn}',
        display: 'flex',
        py: '{docus.app.footer.layout.left.paddingY}',
        order: '{docus.app.footer.layout.left.order}',

        '.footer-credits': {
          display: 'flex',
          alignItems: 'center',
          p: {
            fontSize: '{docus.app.footer.credits.fontSize}',
            lineHeight: '{docus.app.footer.credits.lineHeight}',
            fontWeight: '{docus.app.footer.credits.fontWeight}'
          },
          '.credits-icon': {
            flexShrink: 0,
            width: '{docus.app.footer.credits.icon.size}',
            height: '{docus.app.footer.credits.icon.size}',
            color: '{docus.app.footer.credits.icon.color}',
            marginInlineEnd: '{docus.app.footer.credits.icon.marginInlineEnd}',
          },
        },

      },

      '.center': {
        gridColumn: '{docus.app.footer.layout.center.gridColumn}',
        display: 'flex',
        flexDirection: '{docus.app.footer.layout.center.flexDirection}',
        alignItems: '{docus.app.footer.layout.center.alignItems}',
        justifyContent: '{docus.app.footer.layout.center.justifyContent}',

        '.text-link': {
          padding: '{docus.app.footer.textLink.padding}',
          fontSize: '{docus.app.footer.textLink.fontSize}',
          lineHeight: '{docus.app.footer.textLink.lineHeight}',
          fontWeight: '{docus.app.footer.textLink.fontWeight}'
        }

      },

      '.right': {
        gridColumn: '{docus.app.footer.layout.right.gridColumn}',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginInlineEnd: '{docus.app.footer.layout.right.marginInlineEnd}',

        '.icon-link': {
          display: 'flex',
          padding: '{docus.app.footer.iconLink.padding}',
        }
      },
    },
  }
})
</style>
