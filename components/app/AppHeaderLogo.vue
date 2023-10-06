<script setup lang="ts">
const { config } = useDocus()
const logo = computed(() => config.value.header?.logo || false)
const title = computed(() => config.value.header?.title || config.value.title)
</script>

<template>
  <NuxtLink
    class="header-logo flex items-center flex-none"
    to="/"
    :aria-label="title"
  >
    <!-- Only Logo -->
    <span
      v-if="logo"
      class="logo h-6 sm:h-7 w-auto"
    >
      <component
        :is="logo"
        v-if="typeof logo === 'string'"
      />
      <template v-else-if="logo.light && logo.dark">
        <img
          :src="logo.light"
          alt=""
          class="light-img block dark:hidden"
        >
        <img
          :src="logo.dark"
          alt=""
          class="dark-img hidden dark:block"
        >
      </template>
      <Logo v-else-if="logo" />
    </span>

    <!-- Only title -->
    <span
      v-else
      class="title text-2xl font-bold text-color-900 dark:text-color-100 hover:text-primary-500"
    >
      {{ title }}
    </span>
  </NuxtLink>
</template>