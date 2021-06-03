<template>
  <div
    v-if="langFallback"
    class="p-4 mb-6 rounded bg-orange-200 dark:text-light-onSurfacePrimary"
  >
    ⚠️ You are looking at the english version of the page. Help us translate it
    <a :href="docLink" class="text-orange-600" target="_blank">here</a>.
  </div>
</template>

<script>
export default {
  props: {
    docLink: {
      type: String,
      default: ''
    },
    langFallback: {
      type: Boolean
    }
  }
}
</script>
