<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'

defineProps({
  icon: {
    type: String,
    default: ''
  },
  noise: {
    type: Boolean,
    default: false
  },
  lights: {
    type: Boolean,
    default: false
  }
})

const cardRef = ref<HTMLElement | null>(null)
const { elementX, elementY } = useMouseInElement(cardRef)

watch([elementX, elementY], () => {
  cardRef.value?.style.setProperty('--x', `${elementX.value}px`)
  cardRef.value?.style.setProperty('--y', `${elementY.value}px`)
})
</script>

<template>
  <div
    ref="cardRef"
    class="card relative col-span-12 sm:col-span-6 lg:col-span-4 flex text-center p-[2px] rounded-sm border-0 backdrop-filter"
    :class="[lights && 'before:absolute before:rounded-[inherit] before:inset-0 before:z-0 before:bg-[radial-gradient(500px_at_var(--x)_var(--y),rgba(var(--color-gray-400)/0.3),transparent_60%)] after:[&_.wrapper]:bg-red-500']"
  >
    <div class="wrapper w-full h-full relative overflow-hidden rounded-xs bg-[linear-gradient(135deg,rgba(var(--color-gray-100)/0.5),rgba(var(--color-gray-200)/0.5))] dark:bg-[linear-gradient(135deg,rgba(var(--color-gray-800)/0.4),rgba(var(--color-gray-800)/0.7))]">
      <div
        v-if="noise"
        class="noise absolute inset-0 z-[-1] [filter:url(#noise-filter)] opacity-20"
      />
      <div class="content relative z-[2] p-8">
        <ContentSlot v-if="$slots.default" :use="$slots.default" unwrap="p"/>
        <span
          v-if="icon"
          class="icon-wrapper inline-flex mb-4 p-3 rounded-xs bg-gray-300 dark:bg-gray-900 bg-opacity-20 dark:bg-opacity-20 [&_.icon]:w-6 [&_.icon]:h-6 shadow-light-up"
        >
          <Icon :name="icon" />
        </span>
        <h3
          v-if="$slots.title"
          class="title mb-2 text-2xl font-medium tracking-tight text-primary-static"
        >
          <ContentSlot :use="$slots.title" unwrap="p">
            Card title
          </ContentSlot>
        </h3>
        <p
          v-if="$slots.description"
          class="description text-sm font-medium text-secondary-static"
        >
          <ContentSlot :use="$slots.description" unwrap="p">
            Card description
          </ContentSlot>
        </p>
      </div>
    </div>
  </div>
</template>
