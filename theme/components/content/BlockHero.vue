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
  <section class="py-20 sm:py-24 lg:py-32">
    <div class="grid gap-8 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <p v-if="$slots.top" class="mb-2 text-center lg:text-left">
          <ContentSlot :use="$slots.top" unwrap="p" />
        </p>

        <h1 class="text-4xl font-extrabold tracking-tight text-center u-text-gray-900 sm:text-5xl lg:text-left lg:text-6xl">
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h1>

        <p class="max-w-3xl mt-4 text-lg text-center u-text-gray-500 lg:text-left">
          <ContentSlot :use="$slots.description" unwrap="p" />
        </p>

        <div v-if="$slots.extra" class="mt-6">
          <ContentSlot :use="$slots.extra" unwrap="p" />
        </div>

        <div class="flex flex-col items-center justify-center gap-4 mt-6 sm:mt-10 sm:flex-row sm:gap-6 lg:justify-start">
          <template v-if="!$slots.actions">
            <ButtonLink v-if="cta" class="!mb-0" bold size="large" :href="(cta[1] as any)">
              {{ cta[0] }}
            </ButtonLink>

            <a v-if="secondary" :href="(secondary[1] as any)" class="py-px font-medium u-text-gray-500 hover:u-text-gray-700">
              {{ secondary[0] }}
            </a>
          </template>
          <ContentSlot v-else :use="$slots.actions" unwrap="p" />
        </div>
      </div>

      <slot name="right">
        <Terminal v-if="snippet" :content="snippet" />
      </slot>
    </div>
  </section>
</template>
