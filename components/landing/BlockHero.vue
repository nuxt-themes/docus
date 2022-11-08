<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  cta: {
    type: Array as PropType<string[]>,
    required: false
  },
  secondary: {
    type: Array as PropType<string[]>,
    required: false
  },
  snippet: {
    type: String,
    required: false
  },
  video: {
    type: Array as PropType<string[]>,
    required: false
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

        <h1 v-if="$slots.title" class="title">
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h1>

        <p v-if="$slots.description" class="description">
          <ContentSlot :use="$slots.description" unwrap="p" />
        </p>

        <div v-if="$slots.extra" class="extra">
          <ContentSlot :use="$slots.extra" unwrap="p" />
        </div>

        <div class="actions">
          <template v-if="!$slots.actions">
            <ButtonLink v-if="cta" class="cta" bold size="large" :href="(cta[1] as any)">
              {{ cta[0] }}
            </ButtonLink>

            <a v-if="secondary" :href="(secondary[1] as any)" class="secondary">
              {{ secondary[0] }}
            </a>
          </template>
          <ContentSlot v-else :use="$slots.actions" unwrap="p" />
        </div>
      </div>

      <div class="support">
        <slot name="support">
          <Terminal v-if="snippet" :content="snippet"  />
        </slot>
      </div>
      
    </div>
  </section>
</template>

<style scoped lang="ts">
css({
  '.block-hero': {
    padding: '{space.20} 0',
    '@mq.sm': {
      padding: '{space.24} 0',
    },
    '@mq.lg': {
      padding: '{space.32} 0',
    },
    '.layout': {
      display: 'grid',
      gap: '{space.8}',
      '@mq.lg': {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
      }
    },
    '.content': {
      '@mq.lg': {
        gridColumn: 'span 2 / span 2'
      },
      '.announce': {
        marginBottom: '{space.2}',
        textAlign: 'center',
        '@mq.lg': {
          textAlign: 'left'
        }
      },
      '.title': {
        color: '{docus.text.color.primary}',
        fontWeight: '{fontWeights.extrabold}',
        letterSpacing: '{letterSpacings.tight}',
        textAlign: 'center',
        fontSize: '{text.4xl.fontSize}',
        lineHeight: '{text.4xl.lineHeight}',
        '@mq.sm': {
          fontSize: '{text.5xl.fontSize}',
          lineHeight: '{text.5xl.lineHeight}',
        },
        '@mq.lg': {
          fontSize: '{text.6xl.fontSize}',
          lineHeight: '{text.6xl.lineHeight}',
          textAlign: 'left'
        }
      },
      '.description': {
        marginTop: '{space.4}',
        fontSize: '{text.lg.fontSize}',
        lineHeight: '{text.lg.lineHeight}',
        textAlign: 'center',
        color: '{docus.text.color.secondary}',
        '@mq.lg': {
          textAlign: 'left'
        }
      },
      '.extra': {
        marginTop: '{space.6}'
      },
      '.actions': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '{space.4}',
        marginTop: '{space.6}',
        '@mq.sm': {
          marginTop: '{space.10}',
          flexDirection: 'row',
          gap: '{space.6}'
        },
        '@mq.lg': {
          justifyContent: 'flex-start'
        },
        '.cta': {
          marginBottom: 0
        },
        '.secondary': {
          fontWeight: '{fontWeights.medium}',
          color: '{docus.text.color.secondary}',
          '&:hover': {
            color: '{docus.text.color.secondaryHover}'
          }
        }
      }
    }
  }
})
</style>