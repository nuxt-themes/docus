<template>
  <div>
    <NuxtLink
      v-if="$route.path.startsWith('/docs')"
      to="/docs/release-notes"
      class="
        flex
        items-center
        py-1.5
        group
        dark:hover:text-gray-100
        hover:text-gray-900
        bg-white bg-opacity-10
        hover:bg-opacity-9
        p-4
        mt-4
        rounded-md
      "
    >
      <IconNuxt class="w-5 h-5 mr-2" />
      <span>Version: {{ $docus.lastRelease.value }}</span>
    </NuxtLink>
  </div>
</template>
