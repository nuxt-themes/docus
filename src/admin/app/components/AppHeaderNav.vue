<template>
  <div class="flex items-center ml-4 space-x-2 flex-auto">
    <!-- Editor -->
    <RouterLink to="/" class="relative flex-none px-4 py-1 text-sm font-medium leading-5 border rounded-md">
      Pages
    </RouterLink>

    <!-- :class used as this route is undefined in the router -->
    <RouterLink
      to="/static"
      class="relative flex-none px-4 py-1 text-sm font-medium leading-5 border rounded-md"
      :class="[$route.path.includes('static') ? 'router-link-active' : '']"
    >
      Static
    </RouterLink>
  </div>
</template>

<style lang="postcss">
.router-link-active {
  @apply border-blue-500 bg-blue-100;
}
</style>
