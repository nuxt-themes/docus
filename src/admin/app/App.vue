<template>
  <AppHeader />

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <main class="flex-auto relative">
    <div class="flex overflow-hidden h-full">
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <Component :is="Component" />
        </KeepAlive>
      </RouterView>
      <div class="flex flex-col flex-1 overflow-hidden">
        <!-- <div><input v-model="previewUrl" type="text" /></div> -->
        <iframe ref="iframe" :src="previewUrl" class="flex flex-1" />
      </div>
    </div>
  </main>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  components: {
    AppHeader
  },

  // mounted () {
  //   this.$nextTick(() => console.log('iframe', this.$refs.iframe.contentWindow.location.href))
  // },

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
