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

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  components: {
    AppHeader
  },

  provide() {
    return {
      previewUrl: this.previewUrl
    }
  },

  data() {
    return {
      previewUrl: 'http://localhost:3000'
    }
  },

  async beforeMount() {
    const { url } = await this.$api.get('/preview')

    this.previewUrl = url
  }
}
</script>
