<script setup lang="ts">
const { config } = useDocus()
const logo = computed(() => config.value.header?.logo || false)
const title = computed(() => config.value.header?.title || config.value.title)
</script>

<template>
  <NuxtLink class="navbar-logo" to="/" :aria-label="title">
    <!-- Only Logo -->
    <span class="logo" v-if="logo">
      <component :is="logo" v-if="typeof logo === 'string'" />
      <template v-else-if="logo.light && logo.dark">
        <img :src="logo.light" alt="" class="light-img">
        <img :src="logo.dark" alt="" class="dark-img">
      </template>
      <Logo v-else-if="logo" />
    </span>

    <!-- Only title -->
    <span class="title" v-else>
      {{ title }}
    </span>
  </NuxtLink>
</template>

<style lang="ts" scoped>
css({
  a: {
    display: 'flex',
    alignItems: 'center',
    flex: 'none',

    '.logo': {
      height: '{docus.header.logo.height}',
      width: 'auto',
      'img, svg': {
        height: 'inherit',
      },
      '.light-img': {
        display: 'block',
        '@dark': {
          display: 'none'
        }
      },
      '.dark-img': {
        display: 'none',
        '@dark': {
          display: 'block'
        }
      },
    },

    '.title': {
      fontSize: '{docus.header.title.fontSize}',
      fontWeight: '{docus.header.title.fontWeight}',
      color: '{docus.header.title.color.static}',
      '&:hover': {
        color: '{docus.header.title.color.hover}',
      }
    }
  }
})
</style>
