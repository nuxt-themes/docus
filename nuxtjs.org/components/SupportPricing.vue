<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
<div class="mt-8 mb-8 b-16 sm:mt-12 sm:pb-20 lg:pb-28">
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
      <div class="flex-1 px-6 py-8 lg:p-12 light:bg-white dark:bg-secondary-darkest">
        <h3 class="text-2xl font-extrabold text-secondary-darker dark:text-white sm:text-3xl">
          Technical support
        </h3>
        <p class="mt-6 text-base text-gray-500 dark:text-white">
          Get project audits, app deployments, custom development and technical support from the NuxtJS team.
        </p>
        <div class="mt-6">
          <div class="flex items-center">
            <div class="flex-1 border-t-2 border-gray-200"></div>
          </div>
          <p class="mt-6 text-secondary-darker dark:text-white">We partnered with <img class="inline-block px-1 -mt-1 dark:hidden" src="~/static/img/support/light/otechie.svg" /> <img class="inline-block px-1 -mt-1 light:hidden" src="~/static/img/support/dark/otechie.svg" />to offer these services so we can focus on helping you as fast as possible.</p>
        </div>
      </div>
      <div class="py-8 px-6 text-center bg-gray-100 dark:bg-secondary-darker lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
        <div class="mt-4 flex items-center justify-center text-5xl font-extrabold text-secondary-darker dark:text-white">
          <span>
            $250
          </span>
          <span class="ml-3 text-xl font-medium text-gray-500 dark:text-gray-200">
            USD
          </span>
        </div>
        <div class="mt-6">
          <SectionButton to="#" size="md" class="bg-primary text-gray-800 hover:bg-green-300 focus:bg-green-300">
            Start chat
          </SectionButton>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
})
</script>
