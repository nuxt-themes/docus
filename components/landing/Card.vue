<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import appConfig from '#build/app.config'

const { tokens } = appConfig

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
    class="card relative col-span-12 sm:col-span-6 lg:col-span-4"
    :class="[lights && Object.values(tokens.card.lights), Object.values(tokens.card.root)]"
  >
    <div
      class="wrapper w-full h-full relative overflow-hidden"
      :class="[Object.values(tokens.card.wrapper)]"
    >
      <div
        v-if="noise"
        class="noise"
        :class="[Object.values(tokens.card.noise)]"
      />
      <div
        class="content"
        :class="[Object.values(tokens.card.content)]"
      >
        <ContentSlot v-if="$slots.default" :use="$slots.default" unwrap="p"/>
        <span
          v-if="icon"
          class="icon-wrapper"
          :class="[Object.values(tokens.card.icon)]"
        >
          <Icon :name="icon" />
        </span>
        <h3
          v-if="$slots.title"
          class="title"
          :class="[Object.values(tokens.card.title)]"
        >
          <ContentSlot :use="$slots.title" unwrap="p">
            Card title
          </ContentSlot>
        </h3>
        <p
          v-if="$slots.description"
          class="description"
          :class="[Object.values(tokens.card.description)]"
        >
          <ContentSlot :use="$slots.description" unwrap="p">
            Card description
          </ContentSlot>
        </p>
      </div>
    </div>
  </div>
</template>
