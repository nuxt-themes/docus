<script setup lang="ts">
const docus = useDocus()

const socialIcons = ref(null)
const icons = computed(() => docus.value.footer?.iconLinks || [])
const textLinks = computed(() => docus.value.footer?.textLinks || [])
const socialIconsCount = computed(() => Object.entries(docus.value.socials).filter(([_, v]) => v).length)
const nbSocialIcons = computed(() => (socialIcons.value ? socialIconsCount.value : 0))
</script>

<template>
  <footer>
    <Container :fluid="docus.layout.fluid" padded class="footer-container">
      <!-- Left -->
      <div class="left">
        <a v-if="docus.footer?.credits" :href="docus.footer.credits.href" rel="noopener" target="_blank">
          <Component :is="docus.footer.credits.icon" v-if="docus.footer.credits.icon" class="left-icon" />
          <p>{{ docus.footer.credits.text }}</p>
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
          :target="link.target || '_self'"
        >
          {{ link.text }}
        </NuxtLink>
      </div>

      <div class="right">
        <a
          v-for="icon in icons.slice(0, 6 - nbSocialIcons)"
          :key="icon.label"
          class="icon-link"
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
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: '{elements.border.primary.default}',
    padding: '{docus.footer.padding}',

    '.footer-container': {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      justifyItems: 'center',
      gap: '{space.2}',
      '@sm': {
        justifyItems: 'legacy',

      },

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

      '.left': {
        gridColumn: 'span 12 / span 12',
        display: 'flex',
        py: '{space.4}',
        order: 1,

        '@sm': {
          gridColumn: 'span 3 / span 3',
          order: 0,
        },

        a: {
          display: 'flex',
          alignItems: 'center',
        },

        p: {
          fontSize: '{text.xs.fontSize}',
          lineHeight: '{text.xs.lineHeight}',
          fontWeight: '{fontWeight.medium}'
        },

        '&-icon': {
          flexShrink: 0,
          width: '{space.4}',
          height: '{space.4}',
          fill: 'currentcolor',
          marginRight: '{space.2}',
        },
      },

      '.center': {
        gridColumn: 'span 12 / span 12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '@sm': {
          gridColumn: 'span 6 / span 6',
          flexDirection: 'row',
          justifyContent: 'center',
        },

        '.text-link': {
          padding: '{space.2}',
          fontSize: '{text.sm.fontSize}',
          lineHeight: '{text.sm.lineHeight}',
          fontWeight: '{fontWeight.medium}'
        }

      },

      '.right': {
        gridColumn: 'span 12 / span 12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // marginLeft: 'calc(0px - {space.4})',

        '@sm': {
          gridColumn: 'span 3 / span 3',
          marginRight: 'calc(0px - {space.4})',
        },

        '.icon-link': {
          display: 'flex',
          padding: '{space.4}'
        }
      },
    },
  }
})
</style>
