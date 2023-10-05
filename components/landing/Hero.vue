<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'

const heroRef = ref(null) as Ref<HTMLElement | null>
const { height } = useElementBounding(heroRef)

watch(height, (value) => {
  document.documentElement.style.setProperty('--hero-height', `${value}px`)
})

</script>

<template>
  <div ref="heroRef" class="hero relative w-full py-20 sm:py-24 lg:py-24">
    <span v-if="$slots.root" class="root">
      <slot name="root" />
    </span>
    <div class="layout relative grid gap-16 xl:gap-4 xl:grid-cols-12">
      <div class="content flex flex-col xl:col-span-7 items-center xl:items-start">
        <p v-if="$slots.announce" class="announce mb-8">
          <ContentSlot :use="$slots.announce" unwrap="p" />
        </p>

        <h1 class="title text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-center xl:text-start mb-8 px-8 md:px-12 lg:px-14 xl:px-0 text-transparent dark:text-transparent bg-clip-text bg-gradient-to-r from-gray-100 dark:from-gray-200 from-10% via-gray-300 dark:via-gray-400 via-54% to-gray-600 dark:to-gray-700 mix-blend-exclusion text-primary-static">
          <ContentSlot :use="$slots.title" unwrap="p">
            Hero Title
          </ContentSlot>
        </h1>

        <p class="description text-secondary-static text-lg lg:text-xl text-center xl:text-start mb-12 px-2 md:px-6 xl:px-0 mix-blend-normal">
          <ContentSlot :use="$slots.description" unwrap="p">
            Hero default description.
          </ContentSlot>
        </p>

        <div v-if="$slots.extra" class="extra flex justify-center xl:justify-start mb-16">
          <ContentSlot :use="$slots.extra" unwrap="p" />
        </div>

        <div v-if="$slots.actions" class="actions flex items-center flex-col sm:flex-row gap-2 sm:gap-3 justify-center xl:justify-start">
          <ContentSlot :use="$slots.actions" unwrap="p" />
        </div>
      </div>

      <div class="support relative flex items-center xl:col-span-5">
        <slot name="support" />
      </div>
    </div>
  </div>
</template>
