<script setup lang="ts">
import type { PropType } from 'vue'

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
</script>

<template>
  <section class="block-hero">
    <div class="layout">
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
            <ButtonLink v-if="secondary" class="cta" size="medium" color="gray" ghost :href="(secondary[1] as any)" blank>
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
    padding: '{elements.blockHero.padding}',
    '.layout': {
      display: 'grid',
      gap: '{elements.blockHero.layout.gap}', 
      gridTemplateColumns: '{elements.blockHero.layout.gridTemplateColumns}', 
    },
    '.content': {
      gridColumn: '{elements.blockHero.content.gridColumn}', 
      '.announce': {
        marginBottom: '{elements.blockHero.content.announce.marginBottom}', 
        textAlign: '{elements.blockHero.content.announce.textAlign}', 
      },
      '.title': {
        color: '{elements.blockHero.content.title.color}', 
        fontWeight: '{elements.blockHero.content.title.fontWeight}', 
        letterSpacing: '{elements.blockHero.content.title.letterSpacing}', 
        textAlign: '{elements.blockHero.content.title.textAlign}', 
        fontSize: '{elements.blockHero.content.title.fontSize}', 
        lineHeight: '{elements.blockHero.content.title.lineHeight}', 
        marginBottom: '{elements.blockHero.content.title.marginBottom}', 
        px: '{elements.blockHero.content.title.paddingX}', 
      },
      '.description': {
        marginBottom: '{elements.blockHero.content.description.marginBottom}', 
        fontSize: '{elements.blockHero.content.description.fontSize}', 
        lineHeight: '{elements.blockHero.content.description.lineHeight}', 
        textAlign: '{elements.blockHero.content.description.textAlign}', 
        color: '{elements.blockHero.content.description.color}', 
        px: '{elements.blockHero.content.description.paddingX}', 
      },
      '.extra': {
        marginBottom: '{elements.blockHero.content.extra.marginBottom}', 
        display: 'flex',
        justifyContent: '{elements.blockHero.content.extra.justifyContent}', 
      },
      '.actions': {
        display: 'flex',
        flexDirection: '{elements.blockHero.content.actions.flexDirection}', 
        alignItems: 'center',
        justifyContent: '{elements.blockHero.content.actions.justifyContent}', 
        gap: '{elements.blockHero.content.actions.gap}', 
        '.cta': {
          marginBottom: '{elements.blockHero.content.actions.cta.marginBottom}'
        },
      }
    }
  }
})
</style>
