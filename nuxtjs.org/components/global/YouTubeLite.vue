<template>
  <lite-youtube :key="video" :videoid="video" :playlabel="title">
  </lite-youtube>
</template>

<script>
export default {
  props: {
    video: {
      type: String,
      default: 'video'
    },
    title: {
      type: String,
      default: 'title'
    }
  }
}
</script>
