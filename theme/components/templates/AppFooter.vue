<template>
  <footer class="py-6">
    <div class="max-w-8xl px-4 mx-auto sm:px-6">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <a href="https://nuxtlabs.com" target="_blank" class="flex items-end text-gray-900 hover:text-gray-600 mb-3 sm:mb-0">
          <IconNuxtLabs class="mr-2" />
          <p class="font-bold text-xs">Made by Nuxt Labs</p>
        </a>

        <div class="flex">
          <a
            href="https://nuxtjs.org"
            target="_blank"
            class="text-sm flex items-center font-medium mr-2 text-gray-500 transition-colors duration-200 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
          >
            <IconNuxt class="w-5 h-5" />
          </a>
          <a
            href="https://vuetelescope.com"
            target="_blank"
            class="text-sm flex items-center font-medium text-gray-500 transition-colors duration-200 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 mr-2"
          >
            <IconVueTelescope class="w-5 h-5" />
          </a>
          <DSocialIcons size="w-5 h-5" space-between="space-x-2" />
        </div>
      </div>

    </div>
  </footer>
</template>
