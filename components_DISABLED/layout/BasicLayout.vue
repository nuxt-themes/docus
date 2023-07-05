<template>
  <div class="basic-layout">
    <slot />
  </div>
</template>

<style scoped>
.basic-layout {
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
