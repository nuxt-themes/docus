<template>
  <client-only>
    <div v-if="showPlaceholder" class="flex items-center justify-center bg-gray-200 dark:bg-gray-700 h-24">
      AppAsideBottom
    </div>
  </client-only>
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
