<script setup lang="ts">
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
  <div class="section-header flex flex-col items-center xl:items-start mb-8">
    <span
      v-if="subtitle || $slots.subtitle"
      class="section-header-subtitle block text-lg font-normal tracking-wide mb-2"
      :class="[subtitleColor]"
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
      class="section-header-title text-3xl sm:text-4xl font-semibold tracking-tight mb-2"
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
      class="section-header-description text-secondary-static"
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

