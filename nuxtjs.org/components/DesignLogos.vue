<template>
  <div>
    <div v-for="content in logosMd" :key="content.slug" class="grid grid-cols-3">
      <div v-for="logo in content.logos" :key="logo.slug" class="flex flex-wrap">
        <div class="w-full">{{ logo.type }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()
    const logosMd = ref()

    useFetch(async () => {
      logosMd.value = await $docus
        .search('/design-kit', { deep: true })
        .where({ slug: { $in: ['logos'] } })
        .sortBy('position', 'asc')
        .fetch()
    })
    console.log('logos', logosMd)
    return {
      logosMd
    }
  }
})
</script>
