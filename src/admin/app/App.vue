<template>
  <AppHeader />

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <main class="flex items-stretch flex-grow h-full">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <Component :is="Component" />
      </KeepAlive>
    </RouterView>

    <iframe ref="iframe" :src="previewUrl" class="h-full flex-1" />
  </main>
</template>

<script lang="ts">
import { defineComponent, provide, ref, onBeforeMount } from 'vue3'
import AppHeader from './components/AppHeader.vue'
import { useApi } from './plugins/api'

export default defineComponent({
  components: {
    AppHeader
  },

  setup() {
    const api = useApi()

    const previewUrl = ref('http://localhost:3000')

    onBeforeMount(async () => {
      const { url } = (await api.get('/preview')) as any

      previewUrl.value = url
    })

    provide('previewUrl', previewUrl)

    return {
      previewUrl
    }
  }
})
</script>
