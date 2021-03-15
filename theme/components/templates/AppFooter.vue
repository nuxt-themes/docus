<template>
  <footer class="py-8 border-t border-gray-100">
    <div class="max-w-8xl px-4 mx-auto sm:px-6">
      <div class="flex justify-between items-center">
        <div>
          <span class="text-sm font-medium text-gray-800 flex">
            Our projects:
          </span>
          <div>
            <a
              href="https://nuxtjs.org"
              class="text-sm flex items-center font-medium hover:text-primary-500"
            >
              <span class="mr-1">NuxtJS</span>
              <IconNuxt class="w-4 h-4" />
            </a>
            <a
              href="https://vuetelescope.com"
              class="text-sm flex items-center font-medium hover:text-primary-500"
            >
              <span class="mr-1">Vue Telescope</span>
              <IconVueTelescope class="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <DSocialIcons />
        </div>
      </div>

      <p class="text-center text-gray-800 text-sm font-medium">
        Made by
        <a href="https://nuxtlabs.com" class="text-primary-500 hover:underline"
          >Nuxt Labs</a
        >
      </p>
    </div>
  </footer>
</template>
