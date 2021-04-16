<template>
  <div>
    <h5 class="py-2 text-base font-semibold text-gray-900 transition duration-200 cursor-pointer dark:text-gray-100">
      Resources
    </h5>
    <ul>
      <li v-for="resource of resources" :key="resource.title">
        <a
          :href="resource.url"
          target="_blank"
          rel="noopener nofollow"
          class="flex items-center py-1.5 group dark:hover:text-gray-100 hover:text-gray-900"
        >
          <Component :is="resource.icon" v-if="resource.icon" class="w-5 h-5 mr-2" :class="resource.iconClass" />
          <span>{{ resource.title }}</span>
          <IconExternalLink class="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      resources: [
        {
          title: 'NuxtJS',
          url: 'https://nuxtjs.org',
          icon: 'IconNuxt'
        },
        {
          title: 'Vue',
          url: 'https://vuejs.org',
          icon: 'IconVue'
        },
        {
          title: 'Windi CSS',
          url: 'https://windicss.org',
          icon: 'IconWindi'
        },
        {
          title: 'Nuxt Content',
          url: 'https://content.nuxtjs.org',
          icon: 'IconNuxtContent'
        }
      ]
    }
  }
})
</script>
