<template>
  <button
    class="flex items-center transition-colors text-gray-500 duration-200 justify-center lg:hidden dark:text-gray-500 hover:text-gray-700 focus:outline-none dark:hover:text-gray-400"
    @click.stop="$menu.open = !$menu.open"
  >
    <IconMenuAlt class="h-6 w-6" />
  </button>
</template>
