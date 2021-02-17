<template>
  <button
    class="fixed bottom-0 right-0 z-50 p-4 mb-4 mr-4 text-white rounded-full shadow bg-primary-500 lg:hidden focus:outline-none"
    aria-label="Menu"
    @click.stop="menu = !menu"
  >
    <IconX v-if="menu" class="w-6 h-6" />
    <IconMenuAlt v-else class="w-6 h-6" />
  </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'settings'
    ]),
    menu: {
      get () {
        return this.$menu.open
      },
      set (val) {
        this.$menu.open = val
      }
    }
  }
}
</script>
