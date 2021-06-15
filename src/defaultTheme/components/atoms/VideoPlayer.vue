<template>
  <div class="video-player relative my-4">
    <img
      class="video absolute top-0 left-0 w-full h-full object-cover"
      :src="provider ? provider.poster : poster"
      :width="670"
      :height="377"
    />
    <div v-if="loaded" class="video absolute top-0 left-0 w-full h-full">
      <!-- remote videos -->
      <video v-if="!provider" :poster="poster" controls autoplay>
        <source v-if="src" :src="src" />
        <source v-for="source in sources" :key="source.src || source" :src="source.src || source" :type="source.type" />
      </video>
      <!-- youtube -->
      <iframe
        v-else-if="provider.name === 'youtube'"
        width="560"
        height="377"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen=""
        class="w-full h-full"
        :src="provider.src"
      ></iframe>
    </div>
    <div v-if="!loaded" class="overlay absolute top-0 left-0 w-full h-full cursor-pointer" @click="loaded = true">
      <button class="play"></button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    poster: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    sources: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const provider = ref(null)
    const loaded = ref(false)

    if (!props.src && !props.sources.length) {
      throw new Error('VideoPlayer: you need to provide either `src` or `sources` props')
    }

    const src = props.src || props.sources[0].src

    if (src && src.includes('youtube.com/watch')) {
      const match = src.match(/\?v=([^&]*)/)
      provider.value = {
        name: 'youtube',
        src: `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1`,
        poster: props.poster || `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg`
      }
    }

    return {
      loaded,
      provider
    }
  }
})
</script>

<style scoped lang="postcss">
.video-player {
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==');
    background-position: top;
    background-repeat: repeat-x;
    height: 60px;
    padding-bottom: 50px;
    width: 100%;
    transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
    z-index: 1;
  }
  &:after {
    content: ' ';
    display: block;
    padding-bottom: 56.25%;
  }

  .play {
    width: 68px;
    height: 48px;
    position: absolute;
    cursor: pointer;
    transform: translate3d(-50%, -50%, 0);
    top: 50%;
    left: 50%;
    z-index: 1;
    background-color: transparent;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 68 48"><path fill="%23f00" fill-opacity="0.8" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path><path d="M 45,24 27,14 27,34" fill="%23fff"></path></svg>');
    filter: grayscale(100%);
    transition: filter 0.1s cubic-bezier(0, 0, 0.2, 1);
    border: none;
  }
  &:hover .play {
    filter: none;
  }
}
video {
  @apply w-full py-4;
}
</style>
