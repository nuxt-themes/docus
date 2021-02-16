<template>
  <span class="inline-flex">
    <button
      class="text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
      aria-label="Color Mode"
      @click="$colorMode.value === 'dark' ? $colorMode.preference = 'light' : $colorMode.preference = 'dark'"
    >
      <transition :name="mounted ? 'none' : 'fade'" mode="out-in">
        <client-only>
          <IconSun v-if="$colorMode.value === 'light'" class="w-6 h-6" />
          <IconMoon v-else class="w-6 h-6" />
        </client-only>
      </transition>
    </button>
  </span>
</template>

<script>
export default {
  data () {
    return { mounted: false }
  },
  mounted () {
    setTimeout(() => {
      this.mounted = true
    }, 400)
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
