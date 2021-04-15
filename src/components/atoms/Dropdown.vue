<template>
  <div
    class="relative inline-block text-left"
    @mouseenter="open = true"
    @mouseleave="open = false"
    @keydown.escape="open = false"
  >
    <slot name="trigger" :toggle="toggle" :open="open" />

    <Transition
      enter-class="transform scale-95 opacity-0"
      enter-active-class="transition duration-100 ease-out"
      enter-to-class="transform scale-100 opacity-100"
      leave-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="open"
        class="absolute top-6 z-50 w-auto origin-top-right rounded-md shadow-lg ring-1 ring-gray-200 dark:ring-gray-800"
      >
        <div class="bg-white rounded-md dark:bg-gray-800">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    close() {
      this.open = false
    }
  }
}
</script>
