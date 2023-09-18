<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig

defineProps({
  subtitle: {
    type: String,
    default: 'Section subtitle'
  },
  subtitleColor: {
    type: String,
    default: 'text-primary-500'
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    class="section-header"
    :class="[tokens.sectionHeader.root]"
  >
    <span
      v-if="subtitle || $slots.subtitle"
      class="section-header-subtitle"
      :class="[subtitleColor, Object.values(tokens.sectionHeader.subtitle)]"
    >
      <ContentSlot
        :use="$slots.subtitle"
        unwrap="p"
      >
        {{ subtitle }}
      </ContentSlot>
    </span>

    <h2
      v-if="title || $slots.title"
      class="section-header-title"
      :class="[Object.values(tokens.sectionHeader.title)]"
    >
      <ContentSlot
        :use="$slots.title"
        unwrap="p"
      >
        {{ title }}
      </ContentSlot>
    </h2>

    <p
      v-if="description || $slots.description"
      class="section-header-description"
      :class="[Object.values(tokens.sectionHeader.description)]"
    >
      <ContentSlot
        :use="$slots.description"
        unwrap="p"
      >
        {{ description }}
      </ContentSlot>
    </p>
  </div>
</template>

