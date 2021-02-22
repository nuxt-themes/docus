<template>
  <div v-if="showPlaceholder" class="flex items-center justify-center bg-gray-400 h-24">
    AppTocBottom
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPlaceholder: this.$route.query.slots
    }
  }
}
</script>
