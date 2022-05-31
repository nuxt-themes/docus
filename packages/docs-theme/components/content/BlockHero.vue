<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  cta: {
    type: Array as PropType<string[]>,
    required: false,
  },
  secondary: {
    type: Array as PropType<string[]>,
    required: false,
  },
  snippet: {
    type: String,
    required: false,
  },
  video: {
    type: Array as PropType<string[]>,
    required: false,
  },
})
</script>

<template>
  <section class="py-8 lg:py-16">
    <Container padded class="my-16 flex flex-col items-center lg:flex-row">
      <div class="flex flex-col items-center pr-0 lg:mb-0 lg:w-2/3 lg:items-start lg:pr-8">
        <!-- Title -->
        <h2 class="mb-8 text-center text-5xl font-semibold tracking-tighter text-gray-900 dark:text-gray-100 sm:text-6xl sm:leading-none lg:text-left lg:text-7xl">
          <Markdown :use="$slots.title" unwrap="p" />
        </h2>

        <!-- Description -->
        <p class="leading-base mb-8 text-center text-lg font-medium tracking-tight text-gray-700 dark:text-gray-300 sm:text-xl lg:text-left xl:text-xl">
          <Markdown :use="$slots.description" unwrap="p" />
        </p>

        <div class="flex flex-col items-center space-y-4 mb-8 lg:mb-0 sm:flex-row sm:space-y-0 sm:space-x-4 lg:space-x-6">
          <!-- CTA -->
          <ButtonLink v-if="cta" class="mx-auto md:mx-0 !mb-0" bold size="large" :href="cta[1]">
            {{ cta[0] }}
          </ButtonLink>

          <!-- Secondary CTA -->
          <ButtonLink v-if="secondary" type="primary" transparent bold :href="secondary[1]">
            {{ secondary[0] }}
          </ButtonLink>
        </div>
      </div>

      <div class="sm:w-580px flex lg:flex-col flex-col-reverse gap-4 mb-8 lg:mb-0 mx-auto w-full lg:w-1/3">
        <!-- Video -->
        <VideoPlayer v-if="video" class="border-2 shadow-lg surface-border" :src="video[0]" :poster="video[1]" />

        <!-- Snippet -->
        <Terminal v-if="snippet" :content="snippet" />
      </div>
    </Container>
  </section>
</template>
