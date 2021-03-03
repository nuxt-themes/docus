<template>
  <div class="mt-8">
    <h5 class="px-4 mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase lg:px-3 lg:mb-3 lg:text-xs dark:text-gray-100">Resources</h5>
    <ul class="mt-4">
      <li v-for="resource of resources" :key="resource.title">
        <a :href="resource.url" target="_blank" rel="noopener" class="flex items-center px-4 py-2 rounded group lg:px-3 dark:hover:text-gray-100 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 ">
          <component :is="resource.icon" v-if="resource.icon" class="w-5 h-5 mr-2" />
          <span class="flex-1">{{ resource.title }}</span>
          <IconExternalLink class="w-4 h-4 ml-2 transition-opacity opacity-0 group-hover:opacity-70" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      resources: [
        {
          title: 'Tailwind CSS',
          url: 'https://tailwindcss.com',
          icon: 'IconTailwind'
        },
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
          title: 'Nuxt Content',
          url: 'https://content.nuxtjs.org',
          icon: 'IconNuxtContent'
        }
      ]
    }
  }
}
</script>
