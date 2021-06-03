<template>
  <a
    v-if="author.link"
    :href="author.link"
    target="_blank"
    rel="noopener"
    class="inline-flex items-center hover:text-nuxt-lightgreen transition ease-linear duration-150"
  >
    <img
      class="inline-block h-6 w-6 rounded-full"
      :src="author.avatarUrl"
      :alt="author.name"
    />
    <span class="mx-2 last:mr-0">{{ author.name }}</span>
  </a>
  <span
    v-else
    class="inline-flex items-center hover:text-nuxt-lightgreen transition ease-linear duration-150"
  >
    <img
      class="inline-block h-6 w-6 rounded-full"
      :src="author.avatarUrl"
      :alt="author.name"
    />
    <span class="mx-2 last:mr-0">{{ author.name }}</span>
  </span>
</template>

<script>
export default {
  name: 'BlogpostAuthor',
  props: {
    author: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
