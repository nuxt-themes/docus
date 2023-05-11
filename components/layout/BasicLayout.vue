<template>
  <div class="basic-layout">
    <slot />
  </div>
</template>

<style lang="ts" scoped>
css({
  '.basic-layout': {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  }
})
</style>
