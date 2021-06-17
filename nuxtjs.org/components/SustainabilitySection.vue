<template>
  <div class="py-4 d-container-content">
    <div class="flex flex-col light:text-secondary-dark dark:text-white py-8">
      <div v-for="sponsors in sustainability" :key="sponsors.slug">
        <h2>
          {{ sponsors.sustainabilitySectionTitle }}
        </h2>
        <p>
          {{ sponsors.sustainabilitySectionDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useFetch } from '@nuxtjs/composition-api'
import { Markdown } from '~docus/utils'

export default defineComponent({
  setup() {
    const { $docus } = useContext()
    const sustainability = ref()
    useFetch(async () => {
      sustainability.value = await $docus.search('/sustainability', { deep: true }).fetch()
    })
    return {
      sustainability
    }
  }
})
</script>
