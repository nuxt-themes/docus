<template>
  <div class="dark:bg-secondary-dark overflow-hidden">
    <HeroMain content-center height="60vh" min-height="560px" class="mx-auto max-w-8xl">
      <template #illustration>
        <HeroParallax />
      </template>

      <template #title>
        <HeroTitle class="mb-4">The Intuitive Vue <br />Framework</HeroTitle>
      </template>

      <template #description>
        <HeroDescription class="mb-8 px-8 sm:px-0">
          Build your next Vue.js application with confidence using NuxtJS.<br class="hidden sm:block" />An open source
          framework making web development simple and powerful.
        </HeroDescription>
      </template>

      <template #buttons>
        <SectionButton
          to="#"
          aria-label="Get started"
          size="sm"
          class="bg-primary-green text-gray-800 hover:bg-green-300 focus:bg-green-300"
          icon-left="IconPlay"
        >
          Get started
        </SectionButton>
        <SectionButton
          to="#"
          aria-label="GitHub Stars"
          size="sm"
          class="bg-white border rounded-md shadow-sm border-gray-700 text-gray-800 focus:bg-gray-200 hover:bg-gray-200"
          icon-left="IconGitHub"
        >
          GitHub Stars
        </SectionButton>
      </template>
    </HeroMain>
  </div>
</template>
