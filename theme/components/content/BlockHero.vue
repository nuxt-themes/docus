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
  <section class="py-12 lg:py-24">
    <Container class="flex flex-col lg:flex-row my-16">
      <div class="flex flex-col items-center pr-0 lg:items-start lg:pr-8 lg:w-2/3">
        <h2
          class="text-5xl font-semibold sm:leading-none tracking-tighter text-center text-gray-900 lg:text-left dark:text-gray-100 sm:text-6xl lg:text-7xl mb-8"
        >
          <Markdown use="title" unwrap="p" />
        </h2>

        <p
          class="mb-8 text-lg text-center text-gray-700 font-medium tracking-tight lg:text-left sm:text-xl xl:text-xl leading-base dark:text-gray-300"
        >
          <Markdown use="description" unwrap="p" />
        </p>

        <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-8 sm:mb-4">
          <ButtonLink v-if="cta" class="mx-auto md:mx-0" bold size="large" :href="(cta[1] as any)">
            {{ cta[0] }}
          </ButtonLink>

          <a
            v-if="secondary"
            :href="(secondary[1] as any)"
            class="py-px mt-px font-medium text-secondary-active border-b-1 border-transparent hover:border-primary-500 dark:hover:border-primary-400"
          >
            {{ secondary[0] }}
          </a>
        </div>
      </div>

      <div v-if="snippet" class="w-full mx-auto lg:w-1/3 sm:w-580px">
        <div class="md:pl-2 md:mx">
          <Terminal :content="snippet" />
        </div>
      </div>
    </Container>
  </section>
</template>
