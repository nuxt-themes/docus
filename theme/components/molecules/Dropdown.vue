<template>
  <div
    v-click-away="'close'"
    class="relative inline-block text-left"
    @mouseenter="open = true"
    @mouseleave="open = false"
    @keydown.escape="open = false"
  >
    <slot name="trigger" :toggle="toggle" :open="open" />

    <transition
      enter-class="transform scale-95 opacity-0"
      enter-active-class="transition duration-100 ease-out"
      enter-to-class="transform scale-100 opacity-100"
      leave-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="open"
        class="absolute bottom-0 right-0 z-50 w-auto mt-2 origin-top-right rounded-md shadow-lg"
      >
        <div class="bg-white rounded-md shadow-xs dark:bg-gray-800">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickAway from 'docus/theme/directives/click-away'

export default {
  name: 'Dropdown',
  directives: {
    'click-away': ClickAway
  },
  data () {
    return {
      open: false
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    },
    close () {
      this.open = false
    }
  }
}
</script>
