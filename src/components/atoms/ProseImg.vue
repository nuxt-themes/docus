<template>
  <img :src="src" :alt="alt" />
</template>

<script>
export default {
  props: {
    src: {
      type: String
    },
    alt: {
      type: String
    }
  }
}
</script>

<style lang="postcss" scoped>
img {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
