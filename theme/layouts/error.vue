<template>
  <div class="pt-10 pb-24 lg:pb-16 w-full flex">
    <div class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8">
      <h1 class="text-3xl font-black mb-4 leading-none">{{ error.message }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  head () {
    return {
      title: this.error.message
    }
  }
}
</script>
