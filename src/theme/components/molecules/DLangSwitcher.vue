<template>
  <DDropdown v-if="availableLocales.length" class="inline-flex">
    <template #trigger="{ open, toggle }">
      <button
        class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none"
        :class="{ 'text-primary-500 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-400': open }"
        @touchstart.stop.prevent="toggle"
      >
        <IconTranslate class="w-6 h-6" />
      </button>
    </template>

    <ul class="py-1">
      <li v-for="locale in availableLocales" :key="locale.code">
        <NuxtLink
          v-if="$i18n.locale !== locale.code"
          :to="switchLocalePath(locale.code)"
          class="px-4 py-1 flex items-center hover:text-primary-500 dark:hover:text-primary-400 whitespace-no-wrap"
        >{{ locale.name }}</NuxtLink>
      </li>
    </ul>
  </DDropdown>
</template>

<script>
export default {
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>
