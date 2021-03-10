<template>
  <div class="code-preview w-full flex items-center flex-col" :class="{ 'lg:flex-row': layout === 'horizontal' }">
    <template v-if="preview">
      <div class="mb-4 mx-2 max-w-full">
        <slot />
      </div>
      <PreviewBox ref="preview" class="mx-2 flex-1" :title="title" />
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined
    },
    preview: {
      type: Boolean,
      default: true
    },
    layout: {
      type: String,
      default: 'horizontal'
    }
  },
  updated () {
    this.$refs.preview?.update()
  }
}
</script>

<style scoped>
.code-preview /deep/ .code-group, .code-preview /deep/ .nuxt-content-highlight {
  width: 400px;
  height: 370px;
  max-width: 100%;
  @apply bg-gray-800 rounded-md overflow-scroll;
}
.code-preview /deep/ .code-group .nuxt-content-highlight {
  @apply w-auto h-auto
}
.code-preview /deep/ .nuxt-content-highlight {
  @apply text-sm;
}
/* .code-preview /deep/ .nuxt-content-highlight > .filename {
  display: none;
}
.code-preview /deep/ .nuxt-content-highlight pre[class*="language-"] {
  @apply pt-4
} */
</style>
