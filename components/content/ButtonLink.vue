<script setup lang="ts">
import { computedStyle } from 'pinceau/runtime'

defineProps({
  blank: {
    type: Boolean,
    required: false,
    default: false
  },
  color: computedStyle('color', 'primary', false),
  href: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  ...variants
})
</script>

<template>
  <NuxtLink class="button-link" :to="href" :target="blank ? '_blank' : undefined">
    <Icon v-if="icon" :name="icon" />
    <ContentSlot :use="$slots.default" unwrap="p ul li" />
  </NuxtLink>
</template>

<style lang="ts" scoped>
css({
  '.button-link': {
    display: 'inline-flex',
    flex: 'none',
    alignItems: 'center',
    borderRadius: '{radii.lg}',
    transition: 'all 100ms ease-in-out',
    fontWeight: '{fontWeights.bold}',
    color: '{colors.white}',
    backgroundColor: (props, utils) => utils.scale('colors', props.color, '600'),
    '&:hover': {
      backgroundColor: (props, utils) => utils.scale('colors', props.color, '500')
    },
    '&:focus': {
      border: (props, utils) => `1px solid ${utils.scale('colors', props.color, '600')}`
    }
  },
  variants: {
    size: {
      small: {
        padding: `{space.1-5} {space.1-5}`,
        lineHeight: '{leads.3}',
      },
      medium: {
        padding: `{space.1-5} {space.2}`,
        lineHeight: '{leads.4}',
      },
      large: {
        padding: `{space.3} {space.2-5}`,
        lineHeight: '{leads.6}',
      },
      giant: {
        padding: `{space.8} {space.4}`,
        fontWeight: `{fontWeights.medium}`
      },
      options: {
        default: 'medium'
      }
    },
    transparent: {
      true: {
        backgroundColor: `transparent`,
      }
    }
  }
})
</style>
