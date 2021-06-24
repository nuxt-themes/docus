<template>
  <button
    class="flex items-center transition-colors duration-200 justify-center lg:hidden d-icon"
    @click.stop="$menu.toggle"
  >
    <IconMenuAlt class="h-6 w-6" />
  </button>
</template>
