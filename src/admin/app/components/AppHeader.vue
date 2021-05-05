<template>
  <header class="relative z-10 flex items-center flex-none border-b">
    <div class="flex items-center h-12 px-4 border-r">
      <h1>
        Docus
        <span class="px-2 py-1 ml-1 text-xs font-medium bg-gray-200 rounded">ADMIN</span>
      </h1>
    </div>

    <div class="flex items-center flex-auto">
      <div class="flex items-center ml-4 space-x-2">
        <RouterLink to="/" class="relative flex-none px-4 py-1 text-sm font-medium leading-5 border rounded-md">
          Pages
        </RouterLink>

        <RouterLink to="/static" class="relative flex-none px-4 py-1 text-sm font-medium leading-5 border rounded-md">
          Static
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply border-blue-500 bg-blue-100;
}
</style>
