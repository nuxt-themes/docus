<template>
  <div>
    <BlogpostCard v-for="post in posts" :key="post.slug" :post="post" />
  </div>
</template>

<script>
import { defineComponent, ref, useContext, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()
    const posts = ref()

    useFetch(async () => {
      const documents = await $docus
        .search('/templates/blog', { deep: true })
        .where({ slug: { $ne: '' } })
        .sortBy('date', 'desc')
        .fetch()

      posts.value = documents
    })

    return {
      posts
    }
  }
})
</script>
