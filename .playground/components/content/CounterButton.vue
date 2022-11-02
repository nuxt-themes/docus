<script setup>
const count = ref(0)
</script>

<template>
  <button @click="count++">
    {{ count }}
  </button>
</template>

<style scoped>
button {
  border: 1px #ddd solid;
  padding: 3px 10px;
  border-radius: 5px;
}
</style>
