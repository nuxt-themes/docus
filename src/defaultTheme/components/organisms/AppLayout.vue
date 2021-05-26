<template>
  <div class="w-full">
    <AppHeader />

    <slot />

    <AppFooter />

    <PoweredByDocus v-if="$docus.settings.credits" />
  </div>
</template>
