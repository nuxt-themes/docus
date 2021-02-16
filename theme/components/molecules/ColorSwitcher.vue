<template>
  <span class="inline-flex">
    <button
      class="text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
      aria-label="Color Mode"
      @click="$colorMode.value === 'dark' ? $colorMode.preference = 'light' : $colorMode.preference = 'dark'"
    >
      <transition name="fade">
        <client-only>
          <IconSun v-if="$colorMode.value === 'light'" class="w-6 h-6" />
          <IconMoon v-else class="w-6 h-6" />
        </client-only>
      </transition>
    </button>
  </span>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
