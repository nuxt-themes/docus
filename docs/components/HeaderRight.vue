<template>
  <NuxtLink v-if="$route.path === '/'" to="/get-started/installation" class="font-medium capitalize">{{ $t('documentation') }}</NuxtLink>
</template>
