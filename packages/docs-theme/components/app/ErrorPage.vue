<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: false,
    default: 'Page not found',
  },
  message: {
    type: String,
    required: false,
    default: "This is not the page you're looking for.",
  },
  statusCode: {
    type: Number,
    required: false,
    default: 404,
  },
})
</script>

<template>
  <div class="flex-1 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div class="mx-auto max-w-max">
      <main class="sm:flex">
        <p class="text-primary-500 text-4xl font-extrabold sm:text-5xl">
          {{ statusCode }}
        </p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6 sm:dark:border-gray-800">
            <h1 class="text-4xl font-extrabold tracking-tight u-text-gray-900 sm:text-5xl">
              {{ name || 'Not Found' }}
            </h1>
            <p class="mt-1 text-xl">
              {{ message }}
            </p>
          </div>
          <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <ButtonLink href="/" size="large" variant="primary"> Go back home </ButtonLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
