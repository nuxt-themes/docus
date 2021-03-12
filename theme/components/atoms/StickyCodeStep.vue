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
.sticky-code-step:first-child > .prose > h2:first-child,
.sticky-code-step:first-child > .prose > h3:first-child,
.sticky-code-step:first-child > .prose > h4:first-child {
  @apply mt-0
}
</style>