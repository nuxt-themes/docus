<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-screen">
      <div class="relative mx-auto" style="width: 1280px; height: 640px">
        <svg
          class="absolute top-0 left-0 z-0"
          width="1280"
          height="640"
          viewBox="0 0 1280 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1280" height="640" class="text-gray-800 fill-current" />
          <path d="M1237 0L855 522L1280 640V0H1237Z" class="text-gray-700 fill-current" />
          <path d="M728 640L1280 126V640H728Z" :fill="primaryColor" />
          <path d="M1280 640H728L1280 573V640Z" :fill="primaryLightColor" />
        </svg>

        <div class="relative z-10 flex flex-col justify-between w-3/4 h-full px-16 py-24 text-white">
          <div>
            <h1 class="mb-12 text-6xl font-semibold">{{ title }}</h1>
            <p class="mb-8 text-3xl">{{ description }}</p>
          </div>
          <div
            class="text-4xl font-medium"
            :style="{
              color: primaryLightColor
            }"
          >
            {{ brand }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Color from 'color'

export default {
  data() {
    return {
      title: this.$route.query.title,
      description: this.$route.query.description,

      primaryColor: this.$docus.settings.colors.primary,
      brand: this.$route.query.brand || 'docus.dev'
    }
  },
  computed: {
    primaryLightColor() {
      return Color(this.primaryColor).lighten(0.1).hex()
    }
  }
}
</script>
