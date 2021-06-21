<template>
  <div class="mt-8 mb-8 b-16 sm:mt-12 sm:pb-20 lg:pb-28">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
        <div class="flex-1 px-6 py-8 lg:p-12 light:bg-white dark:bg-secondary-darkest">
          <h3 class="text-2xl font-extrabold text-secondary-darker dark:text-white sm:text-3xl">
            <Markdown slot="title" unwrap="p" />
          </h3>

          <p class="mt-6 text-base text-gray-500 dark:text-white">
            <Markdown slot="description" unwrap="p" />
          </p>

          <div class="mt-6">
            <div class="flex items-center">
              <div class="flex-1 border-t-2 border-gray-200"></div>
            </div>
            <p class="mt-6 text-secondary-darker dark:text-white">
              <Markdown slot="subdescription" unwrap="p" />
            </p>
          </div>
        </div>

        <div
          class="
            py-8
            px-6
            text-center
            bg-gray-100
            dark:bg-secondary-darker
            lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12
          "
        >
          <div
            class="mt-4 flex items-center justify-center text-5xl font-extrabold text-secondary-darker dark:text-white"
          >
            <Markdown slot="price" unwrap="span" />
            <span class="ml-3 text-xl font-medium text-gray-500 dark:text-gray-200">
              <Markdown slot="currency" unwrap="span" />
            </span>
          </div>

          <div class="mt-6">
            <SectionButton
              to="#"
              size="md"
              class="bg-primary text-gray-800 hover:bg-green-300 focus:bg-green-300"
              aria-label="test"
            >
              <Markdown :node="$scopedSlots.cta" unwrap="span" />
            </SectionButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
