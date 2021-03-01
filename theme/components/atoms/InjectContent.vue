<template>
  <nuxt-content :document="page" />
</template>

<script>
export default {
  props: {
    query: { type: String, required: true }
  },
  data: () => ({
    page: {}
  }),
  async fetch () {
    this.page = await this.$content(this.query).fetch()
  }
}
</script>
