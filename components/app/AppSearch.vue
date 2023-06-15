<script setup lang="ts">
import { useFuse } from '@vueuse/integrations/useFuse'

const show = ref(false)

const { data: files } = await useLazyAsyncData('components', () => queryContent('components').where({ _type: 'markdown', navigation: { $ne: false } }).find(), { default: () => [] })

const { results } = useFuse('te', files)

console.log('files', files.value)
console.log('results', results.value)
</script>

<template>
  <div>
    <button @click="show = !show">
      search
    </button>

    <Modal v-model="show">
      <div class="search-content">
        <div
          class="search-window"
          @click.stop
        >
          <input type="text">
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="ts">
css({
  '.search-content': {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '.search-window': {
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
    }
  }
})
</style>


<style scoped>
@media (prefers-reduced-motion: reduce)  {
  .search-window {
    transition: all 0ms !important;
  }
}
.modal-enter-active .search-window,
.modal-leave-active .search-window {
  transition: transform 200ms $dt('ease.back.out'), opacity 200ms $dt('ease.back.out');
}
.modal-enter-from .search-window,
.modal-leave-to .search-window {
  opacity: 0;
  transform: translate3d(0, 25px, 0);
}
</style>
