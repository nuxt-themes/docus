<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig

const { config } = useDocus()
const logo = computed(() => config.value.header?.logo || false)
const title = computed(() => config.value.header?.title || config.value.title)
</script>

<template>
  <NuxtLink class="header-logo flex items-center flex-none" to="/" :aria-label="title">
    <!-- Only Logo -->
    <span v-if="logo" class="logo" :class="Object.values(tokens.appHeaderLogo.logo)">
      <component :is="logo" v-if="typeof logo === 'string'" />
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
    <span v-else class="title" :class="Object.values(tokens.appHeaderLogo.title)">
      {{ title }}
    </span>
  </NuxtLink>
</template>

<style lang="ts" scoped>

</style>
