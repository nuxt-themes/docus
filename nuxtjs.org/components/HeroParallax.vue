<template>
  <div ref="containerImg" class="absolute top-0 left-0 w-full h-full select-none" @mousemove="parallax">
    <img
      ref="gem1"
      data-speed="2"
      loading="lazy"
      :src="`/img/home/hero/gem-1.svg`"
      class="hidden lg:block absolute left-0 top-0 ml-0 md:ml-12 ml-20 mt-0 md:mt-4 mt-8"
      alt="An image of a green gem from nuxt galaxy"
    />
    <img
      ref="gem2"
      data-speed="-5"
      loading="lazy"
      :src="`/img/home/hero/gem-2.svg`"
      class="absolute left-1/3 sm:left-auto mt-4 sm:ml-0 sm:right-0 top-0 sm:mr-20 lg:mr-60 lg:mt-20"
      alt="An image of a green gem from nuxt galaxy"
    />
    <img
      ref="gem3"
      data-speed="1"
      loading="lazy"
      :src="`/img/home/hero/gem-3.svg`"
      class="hidden lg:block absolute right-0 top-1/4"
      alt="An image of a green gem from nuxt galaxy"
    />
    <img
      ref="gem4"
      data-speed="-3"
      loading="lazy"
      :src="`/img/home/hero/gem-4.svg`"
      class="absolute right-0 bottom-0 mb-20 sm:mb-0 sm:bottom-1/4 mr-8 sm:mr-16 md:mr-28 lg:mr-40"
      alt="An image of a green gem from nuxt galaxy"
    />
    <img
      ref="gem5"
      data-speed="-5"
      loading="lazy"
      :src="`/img/home/hero/gem-5.svg`"
      class="absolute left-0 bottom-0 sm:bottom-1/4 mb-20 sm:mb-0 ml-0 md:ml-12 lg:ml-40"
      alt="An image of a green gem from nuxt galaxy"
    />
    <img
      ref="gem6"
      data-speed="-2"
      loading="lazy"
      :src="`/img/home/hero/gem-2.svg`"
      class="hidden sm:block absolute left-0 top-0 mt-20 lg:top-1/4 lg:mt-8 rotate-45"
      alt="An image of a green gem from nuxt galaxy"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const containerImg = ref(null)

    function parallax(e) {
      const images = Array.from(containerImg.value.children)

      for (const el of images) {
        const image = el
        const speed = parseInt(image.getAttribute('data-speed'))
        const x = (window.innerWidth - e.pageX * speed) / 100
        const y = (window.innerHeight - e.pageY * speed) / 100
        image.style.transform = `translateX(${x}px) translateY(${y}px)`
      }
    }

    return {
      containerImg,
      parallax
    }
  }
})
</script>
