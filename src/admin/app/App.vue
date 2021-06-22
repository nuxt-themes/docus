<template>
  <AppHeader />

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <main class="flex items-stretch flex-grow h-full">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <Component :is="Component" />
      </KeepAlive>
    </RouterView>

    <Preview />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue3'
import AppHeader from './components/AppHeader.vue'
import Preview from './components/Preview.vue'

export default defineComponent({
  components: {
    AppHeader,
    Preview
  }
})
</script>
