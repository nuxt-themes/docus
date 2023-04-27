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

const blockHeroRef = ref(null) as Ref<HTMLElement | null>
const { height } = useElementBounding(blockHeroRef)

watch(height, (value) => {
  document.documentElement.style.setProperty('--block-hero-height', `${value}px`)
})

</script>

<template>
  <section ref="blockHeroRef" class="block-hero">
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
  </section>
</template>

<style scoped lang="ts">
css({
  '.block-hero': {
    // position: 'relative',
    padding: '{docus.landing.blockHero.padding}',
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
      gap: '{docus.landing.blockHero.layout.gap}',
      gridTemplateColumns: '{docus.landing.blockHero.layout.gridTemplateColumns}',
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
      gridColumn: '{docus.landing.blockHero.content.gridColumn}',
      '.announce': {
        marginBottom: '{docus.landing.blockHero.content.announce.marginBottom}',
        textAlign: '{docus.landing.blockHero.content.announce.textAlign}',
      },
      '.title': {
        color: '{docus.landing.blockHero.content.title.color}',
        fontWeight: '{docus.landing.blockHero.content.title.fontWeight}',
        letterSpacing: '{docus.landing.blockHero.content.title.letterSpacing}',
        textAlign: '{docus.landing.blockHero.content.title.textAlign}',
        fontSize: '{docus.landing.blockHero.content.title.fontSize}',
        lineHeight: '{docus.landing.blockHero.content.title.lineHeight}',
        marginBottom: '{docus.landing.blockHero.content.title.marginBottom}',
        px: '{docus.landing.blockHero.content.title.paddingX}',
        gradientText: '{docus.landing.blockHero.content.title.gradientText}',
        mixBlendMode: '{docus.landing.blockHero.content.title.mixBlendMode}'
      },
      '.description': {
        marginBottom: '{docus.landing.blockHero.content.description.marginBottom}',
        fontSize: '{docus.landing.blockHero.content.description.fontSize}',
        lineHeight: '{docus.landing.blockHero.content.description.lineHeight}',
        textAlign: '{docus.landing.blockHero.content.description.textAlign}',
        color: '{docus.landing.blockHero.content.description.color}',
        px: '{docus.landing.blockHero.content.description.paddingX}',
        mixBlendMode: '{docus.landing.blockHero.content.description.mixBlendMode}',
      },
      '.extra': {
        marginBottom: '{docus.landing.blockHero.content.extra.marginBottom}',
        display: 'flex',
        justifyContent: '{docus.landing.blockHero.content.extra.justifyContent}',
      },
      '.actions': {
        display: 'flex',
        flexDirection: '{docus.landing.blockHero.content.actions.flexDirection}',
        alignItems: 'center',
        justifyContent: '{docus.landing.blockHero.content.actions.justifyContent}',
        gap: '{docus.landing.blockHero.content.actions.gap}',
        '.cta': {
          marginBottom: '{docus.landing.blockHero.content.actions.cta.marginBottom}'
        },
      }
    },
    '.support': {
      gridColumn: '{docus.landing.blockHero.support.gridColumn}',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
  }
})
</style>
