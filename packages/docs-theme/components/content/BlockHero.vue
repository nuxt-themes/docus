<script setup lang="ts">
defineProps({
  cta: {
    type: Array,
    default: () => ['Get started', '/get-started'],
  },
  secondary: {
    type: Array,
    default: () => ['Open on GitHub', 'https://github.com'],
  },
  snippet: {
    type: [String],
    default: () => '',
  },
})
</script>

<template>
  <section class="py-20 sm:py-24 lg:py-32">
    <Container padded class="grid gap-8 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <p v-if="$slots.top" class="mb-2 text-center sm:text-left">
          <Markdown :use="$slots.top" unwrap="p" />
        </p>

        <h1 class="u-text-gray-900 text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-left lg:text-6xl">
          <Markdown :use="$slots.title" unwrap="p" />
        </h1>

        <p class="u-text-gray-500 mt-4 max-w-3xl text-center text-lg lg:text-left">
          <Markdown :use="$slots.description" unwrap="p" />
        </p>

        <div v-if="$slots.extra" class="mt-6">
          <Markdown :use="$slots.extra" unwrap="p" />
        </div>

        <div class="mt-6 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:gap-6">
          <ButtonLink v-if="cta" class="mx-auto !mb-0 md:mx-0" bold size="large" :href="(cta[1] as any)">
            {{ cta[0] }}
          </ButtonLink>

          <a v-if="secondary" :href="(secondary[1] as any)" class="u-text-gray-500 hover:u-text-gray-700 py-px font-medium">
            {{ secondary[0] }}
          </a>
        </div>
      </div>

      <slot name="right">
        <Terminal v-if="snippet" :content="snippet" />
      </slot>
    </Container>
  </section>
</template>
