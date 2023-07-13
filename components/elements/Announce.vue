<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig

defineProps({
  blank: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    required: false,
    default: ''
  }
})
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href"
    :target="blank ? '_blank' : undefined"
    :class="[
      tokens.announce.padding, 
      tokens.announce.backgroundColor, 
      tokens.announce.borderRadius,
      tokens.announce.borderWidth,
      tokens.announce.borderStyle,
      tokens.announce.borderColor,
      tokens.announce.fontSize,
      tokens.announce.fontWeight,
      tokens.announce.boxShadow
    ]"
    class="announce inline-flex items-center"
  >
    <span class="announce-content" :class="[tokens.announce.content.paddingX]">
      <ContentSlot
        :use="$slots.default"
        unwrap="p"
      />
    </span>
    <span class="announce-icon flex" :class="[tokens.announce.icon.padding, tokens.announce.icon.borderRadius, tokens.announce.icon.backgroundColor]">
      <Icon name="ic:round-arrow-forward" />
    </span>
  </component>
</template>
