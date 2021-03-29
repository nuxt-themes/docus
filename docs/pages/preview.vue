<template>
  <div class="flex flex-col items-center justify-center">
    <div class="mb-12 w-96">
      <div class="flex items-center mb-1">
        <label for="primary" class="mr-2 text-sm font-medium">Primary color</label>
        <input id="primary" v-model="primaryColor" type="color">
      </div>
      <div class="flex items-center mb-1">
        <label for="secondary" class="mr-2 text-sm font-medium">Secondary color</label>
        <input id="secondary" v-model="secondaryColor" type="color">
      </div>
      <div class="flex items-center mb-1">
        <label for="text-color" class="mr-2 text-sm font-medium">Text color</label>
        <input id="text-color" v-model="textColor" type="color">
      </div>
      <div class="flex flex-col">
        <label for="title" class="mb-1 text-sm font-medium">Title</label>
        <input id="title" v-model="title" type="text" class="p-2 border">
      </div>
    </div>

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
          <rect width="1280" height="640" :fill="secondaryColor" />
          <path d="M1237 0L855 522L1280 640V0H1237Z" :fill="secondaryLightColor" />
          <path d="M728 640L1280 126V640H728Z" :fill="primaryColor" />
          <path d="M1280 640H728L1280 573V640Z" :fill="primaryLightColor" />
        </svg>

        <div
          class="relative z-10 flex flex-col justify-between w-3/4 h-full px-16 py-24"
          :style="{
            color: textColor
          }"
        >
          <div>
            <h1 class="mb-12 text-6xl font-semibold">{{ title }}</h1>
            <p class="mb-8 text-3xl">{{ description }}</p>
          </div>
          <div
            class="text-4xl font-medium"
            :style="{
              color: primaryLightColor
            }"
          >{{ brand }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Color from 'color'

export default {
  async asyncData ({ $content, $docus, app, query, error }) {
    const to = '/' + query.path
    const [data] = await $content({ deep: true }).where({ to }).only(['title', 'description']).fetch()
    return {
      title: data.title,
      description: data.description
    }
  },
  data () {
    return {
      primaryColor: '#3073F1',
      secondaryColor: '#1C1917',
      textColor: '#ffffff',
      brand: 'docus.dev'
      // title: 'Documentation generator based on Nuxt and Tailwind.',
      // description: 'Write in markdown, use Vue components, add style with TailwindCSS and enjoy the power of Nuxt.'
    }
  },
  computed: {
    primaryLightColor () {
      return Color(this.primaryColor)
        .lighten(0.10)
        .hex()
    },
    secondaryLightColor () {
      return Color(this.secondaryColor)
        .lighten(0.35)
        .hex()
    }
  }
}
</script>
