<template>
  <div class="sticky-code-step">
    <slot />
  </div>
</template>

<style scoped>
.sticky-code-step /deep/ .preview-box,
.sticky-code-step /deep/ .code-group,
.sticky-code-step /deep/ .nuxt-content-highlight {
  @apply lg:hidden mx-auto
}
</style>