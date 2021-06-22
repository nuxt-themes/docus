<template>
  <div>
    <h5 class="py-2 text-base font-semibold text-gray-900 cursor-pointer dark:text-gray-100">Resources</h5>
    <ul>
      <li v-for="resource of resources" :key="resource.title">
        <!-- Href links via `url` -->
        <a
          v-if="!resource.to"
          :href="resource.url"
          :to="resource.to"
          target="_blank"
          rel="noopener nofollow"
          class="flex items-center py-1.5 group dark:hover:text-gray-100 hover:text-gray-900"
        >
          <Component :is="resource.icon" v-if="resource.icon" class="w-5 h-5 mr-2" :class="resource.iconClass" />
          <span>{{ resource.title }}</span>
          <IconExternalLink class="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100" />
        </a>

        <!-- Local links via `to` -->
        <NuxtLink
          v-else
          :to="resource.to"
          class="flex items-center py-1.5 group dark:hover:text-gray-100 hover:text-gray-900"
        >
          <Component :is="resource.icon" v-if="resource.icon" class="w-5 h-5 mr-2" :class="resource.iconClass" />
          <span>{{ resource.title }}</span>
          <IconExternalLink class="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100" />
        </NuxtLink>
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
          title: 'Releases',
          to: '/releases',
          icon: 'IconGit'
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
          title: 'Windi CSS',
          url: 'https://windicss.org',
          icon: 'IconWindi'
        },
        {
          title: 'CodeSandbox',
          url: 'https://codesandbox.io/embed/docus-starter-1xsm7?hidenavigation=1&theme=dark',
          icon: 'IconCodeSandbox'
        }
      ]
    }
  }
})
</script>
