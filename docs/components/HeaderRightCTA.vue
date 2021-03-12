<template>
  <NuxtLink v-show="$route.path === '/'" to="/get-started/installation" class="inline-flex items-center flex-none px-3 py-2 text-base font-semibold leading-4 text-white transition-colors duration-200 border border-transparent rounded bg-primary-500 hover:bg-primary-600">
    Get started
  </NuxtLink>
</template>

<script>
// TODO: $route.path === '/' becomes $page.slug === 'index' becomes $docus.isPage('index')
</script>
