<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig

const props = defineProps({
  blank: {
    type: Boolean,
    required: false,
    default: false
  },
  color: {
    type: String,
    default: 'primary'
  },
  href: {
    type: String,
    required: true,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  ghost: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})
</script>

<template>
  <NuxtLink
    :class="[tokens.buttonLink.variants.ghost[props.ghost][props.color], tokens.buttonLink.variants.size[props.size], props.ghost ? 'hover:shadow-light-up-sm' : 'shadow-light-up-sm', tokens.buttonLink.fontWeight, tokens.buttonLink.borderRadius, tokens.buttonLink.borderWidth, tokens.buttonLink.borderStyle, tokens.buttonLink.borderColor]"
    class="button-link inline-flex items-center flex-none w-fit select-none focus:outline-none focus:shadow-outline-current"
    :to="href"
    :target="blank ? '_blank' : undefined"
  >
    <Icon
      v-if="icon"
      :name="icon"
      :class="[tokens.buttonLink.icon.marginInlineEnd]"
    />
    <ContentSlot
      :use="$slots.default"
      unwrap="p ul li"
    />
  </NuxtLink>
</template>
