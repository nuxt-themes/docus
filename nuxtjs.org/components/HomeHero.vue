<template>
  <div class="overflow-hidden">
    <div class="relative mx-auto max-w-8xl">
      <HeroParallax />

      <div class="flex flex-wrap justify-center py-0 section">
        <section class="flex flex-col justify-start w-full px-4 pt-36 pb-52 md:pt-44 lg:pb-56 lg:pt-52 text-center">
          <HeroTitle class="mb-4">The Intuitive Vue <br />Framework</HeroTitle>
          <HeroDescription class="mb-8 px-8 sm:px-0">
            Build your next Vue.js application with confidence using NuxtJS.<br class="hidden sm:block" />An open source
            framework making web development simple and powerful.
          </HeroDescription>

          <div class="flex flex-wrap justify-center space-x-3 xl:space-x-4">
            <SectionButton
              to="#"
              aria-label="Get started"
              size="md"
              class="bg-primary-green text-gray-800 hover:bg-green-300 focus:bg-green-300"
              icon-left="IconPlay"
            >
              Get started
            </SectionButton>
            <SectionButton
              to="#"
              aria-label="GitHub Stars"
              size="md"
              class="
                bg-white
                border
                rounded-md
                shadow-sm
                border-gray-700
                text-gray-800
                focus:bg-gray-200
                hover:bg-gray-200
              "
              icon-left="IconGitHub"
            >
              GitHub Stars
            </SectionButton>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
