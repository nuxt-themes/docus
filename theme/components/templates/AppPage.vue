<template>
  <div class="flex w-full pt-10 ">
    <article class="flex-auto min-w-0 px-4 mb-8 sm:px-6" :class="prose ? 'prose dark:prose-dark' : ''"><slot /></article>
    <slot name="toc" />
  </div>
</template>

<script>
export default {
  props: {
    prose: {
      type: Boolean,
      default: false
    }
  }
}
</script>
