<template>
  <div class="preview-code w-full flex items-center flex-col" :class="{ 'lg:flex-row': layout === 'horizontal' }">
    <template v-if="preview">
      <div class="mb-4 mx-2">
        <slot />
      </div>
      <PreviewBox ref="preview" :title="title" />
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
.preview-code /deep/ .code-group, .preview-code /deep/ .nuxt-content-highlight {
  width: 400px;
  height: 370px;
  overflow: scroll;
  @apply bg-gray-800 rounded-md;
}
.preview-code /deep/ .code-group .nuxt-content-highlight {
  @apply w-auto h-auto
}
.preview-code /deep/ .nuxt-content-highlight {
  @apply text-sm;
}
/* .preview-code /deep/ .nuxt-content-highlight > .filename {
  display: none;
}
.preview-code /deep/ .nuxt-content-highlight pre[class*="language-"] {
  @apply pt-4
} */
</style>
