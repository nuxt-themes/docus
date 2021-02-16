<template>
  <button
    class="fixed z-50 bottom-0 right-0 p-4 bg-primary-500 rounded-full mb-4 mr-4 shadow lg:hidden focus:outline-none text-white"
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
        return this.$store.state.menu.open
      },
      set (val) {
        this.$store.commit('menu/toggle', val)
      }
    }
  }
}
</script>
