<script setup lang="ts">
const { page } = useContent()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppContainer :fluid="page.fluid" :constrained-class="page.constrainedClass" :padded="page.padded">
      <slot />
    </AppContainer>
  </div>
</template>
