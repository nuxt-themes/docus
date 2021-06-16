<template>
  <DocusContent :document="page" />
</template>

<script>
export default {
  props: {
    /**
     * The query you would pass to <code>$content</code> (the relative directory path and filename of the file you want to inject,
     *  without the final <code>.md</code>, e.g. <code>category/article</code>.)
     */
    query: {
      type: String,
      required: true
    }
  },
  data: () => ({
    page: {}
  }),
  async fetch() {
    this.page = await this.$docus.page(this.query)
  }
}
</script>
