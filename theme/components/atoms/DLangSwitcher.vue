<template>
  <DDropdown v-if="$i18n.locales.length > 1" class="inline-flex">
    <template #trigger="{ open, toggle }">
      <button
        class="text-icon"
        :class="{
          'text-gray-700 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-400': open
        }"
        @touchstart.stop.prevent="toggle"
      >
        <IconTranslate class="w-6 h-6" />
      </button>
    </template>

    <ul class="py-1">
      <li v-for="locale in $i18n.locales" :key="locale.code">
        <NuxtLink
          :to="switchLocalePath(locale.code)"
          class="px-4 py-1 flex items-center whitespace-no-wrap"
          :class="[
            $i18n.locale === locale.code
              ? 'font-semibold cursor-default text-gray-800 dark:text-gray-200'
              : 'hover:text-primary'
          ]"
          >{{ locale.name }}</NuxtLink
        >
      </li>
    </ul>
  </DDropdown>
</template>
