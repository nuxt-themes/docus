<script setup lang="ts">
import type { PropType } from 'vue'
import { useElementBounding } from '@vueuse/core'

defineProps({
  cta: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => []
  },
  secondary: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => []
  },
  video: {
    type: String,
    required: false,
    default: ''
  },
  snippet: {
    type: [Array, String] as PropType<string[] | string>,
    required: false,
    default: ''
  }
})

const heroRef = ref(null) as Ref<HTMLElement | null>
const { height } = useElementBounding(heroRef)

watch(height, (value) => {
  document.documentElement.style.setProperty('--hero-height', `${value}px`)
})

</script>

<template>
  <div ref="heroRef" class="hero">
    <span v-if="$slots.root" class="root">
      <slot name="root" />
    </span>
    <div class="layout">
      <span v-if="$slots.background" class="background">
        <slot name="background" />
      </span>
      <div class="content">
        <p v-if="$slots.announce" class="announce">
          <ContentSlot :use="$slots.announce" unwrap="p" />
        </p>

        <h1 class="title">
          <ContentSlot :use="$slots.title" unwrap="p">
            Hero Title
          </ContentSlot>
        </h1>

        <p class="description">
          <ContentSlot :use="$slots.description" unwrap="p">
            Hero default description.
          </ContentSlot>
        </p>

        <div v-if="$slots.extra" class="extra">
          <ContentSlot :use="$slots.extra" unwrap="p" />
        </div>

        <div class="actions">
          <ContentSlot v-if="$slots.actions" :use="$slots.actions" unwrap="p" />
          <template v-else>
            <ButtonLink v-if="cta" class="cta" size="medium" :href="(cta[1] as any)">
              {{ cta[0] }}
            </ButtonLink>
            <ButtonLink
              v-if="secondary"
              class="cta"
              size="medium"
              color="gray"
              ghost
              :href="(secondary[1] as any)"
              blank
            >
              {{ secondary[0] }}
            </ButtonLink>
          </template>
        </div>
      </div>

      <div class="support">
        <slot name="support">
          <Terminal v-if="snippet" :content="snippet" />
          <VideoPlayer v-else-if="video" :src="video" />
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
  '.hero': {
    position: 'relative',
    padding: '{docus.landing.hero.padding}',
    // '.root': {
    //   position: 'absolute',
    //   top: '0px',
    //   left: '0px',
    //   width: '100vw',
    //   height: '100%',
    //   zIndex: '-1',
    //   background: 'red',
    // },
    '.layout': {
      position: 'relative',
      display: 'grid',
      gap: '{docus.landing.hero.layout.gap}',
      gridTemplateColumns: '{docus.landing.hero.layout.gridTemplateColumns}',
    },
    '.background': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      zIndex: '-1',
    },
    '.content': {
      gridColumn: '{docus.landing.hero.content.gridColumn}',
      '.announce': {
        marginBottom: '{docus.landing.hero.content.announce.marginBottom}',
        textAlign: '{docus.landing.hero.content.announce.textAlign}',
      },
      '.title': {
        color: '{docus.landing.hero.content.title.color}',
        fontWeight: '{docus.landing.hero.content.title.fontWeight}',
        letterSpacing: '{docus.landing.hero.content.title.letterSpacing}',
        textAlign: '{docus.landing.hero.content.title.textAlign}',
        fontSize: '{docus.landing.hero.content.title.fontSize}',
        lineHeight: '{docus.landing.hero.content.title.lineHeight}',
        marginBottom: '{docus.landing.hero.content.title.marginBottom}',
        px: '{docus.landing.hero.content.title.paddingX}',
        gradientText: '{docus.landing.hero.content.title.gradientText}',
        mixBlendMode: '{docus.landing.hero.content.title.mixBlendMode}'
      },
      '.description': {
        marginBottom: '{docus.landing.hero.content.description.marginBottom}',
        fontSize: '{docus.landing.hero.content.description.fontSize}',
        lineHeight: '{docus.landing.hero.content.description.lineHeight}',
        textAlign: '{docus.landing.hero.content.description.textAlign}',
        color: '{docus.landing.hero.content.description.color}',
        px: '{docus.landing.hero.content.description.paddingX}',
        mixBlendMode: '{docus.landing.hero.content.description.mixBlendMode}',
      },
      '.extra': {
        marginBottom: '{docus.landing.hero.content.extra.marginBottom}',
        display: 'flex',
        justifyContent: '{docus.landing.hero.content.extra.justifyContent}',
      },
      '.actions': {
        display: 'flex',
        flexDirection: '{docus.landing.hero.content.actions.flexDirection}',
        alignItems: 'center',
        justifyContent: '{docus.landing.hero.content.actions.justifyContent}',
        gap: '{docus.landing.hero.content.actions.gap}',
        '.cta': {
          marginBottom: '{docus.landing.hero.content.actions.cta.marginBottom}'
        },
      }
    },
    '.support': {
      gridColumn: '{docus.landing.hero.support.gridColumn}',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
  }
})
</style>
