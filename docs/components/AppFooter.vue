<template>
  <footer class="py-6 bg-gray-50 dark:bg-gray-800 dark:bg-opacity-25">
    <div class="max-w-8xl px-4 mx-auto sm:px-6">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <a
          href="https://nuxtlabs.com"
          rel="noopener"
          target="_blank"
          class="
            flex
            items-end
            text-gray-900
            dark:text-gray-300
            dark:hover:text-gray-100
            hover:text-gray-600
            mb-3
            sm:mb-0
          "
        >
          <IconNuxtLabs class="mr-2" />
          <p class="font-semibold text-xs">Made by Nuxt Labs</p>
        </a>

        <div class="flex">
          <a
            rel="noopener"
            aria-label="NuxtJS"
            href="https://nuxtjs.org"
            target="_blank"
            class="
              text-sm
              flex
              items-center
              font-medium
              p-1
              text-gray-500
              transition-colors
              duration-200
              dark:text-gray-500
              hover:text-gray-700
              dark:hover:text-gray-400
            "
          >
            <IconNuxt class="w-5 h-5" />
          </a>
          <a
            rel="noopener"
            aria-label="Vue Telescope"
            href="https://vuetelescope.com"
            target="_blank"
            class="
              text-sm
              flex
              items-center
              font-medium
              p-1
              text-gray-500
              transition-colors
              duration-200
              dark:text-gray-500
              hover:text-gray-700
              dark:hover:text-gray-400
            "
          >
            <IconVueTelescope class="w-5 h-5" />
          </a>

          <SocialIcons size="w-5 h-5" padding="p-1" />
        </div>
      </div>
    </div>
  </footer>
</template>
