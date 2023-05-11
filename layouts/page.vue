<template>
  <div class="page-layout">
    <article>
      <slot />
    </article>
  </div>
</template>

<style lang="ts" scoped>
css({
  '.page-layout': {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  }
})
</style>
