<template>
  <AppContainer fluid>
    <div>
      <div class="max-w-2xl mx-auto py-24 relative">
        <NuxtLink
          :to="$contentLocalePath('/blog')"
          class="absolute top-0 left-0 px-4 mt-12 leading-none text-gray-400 dark:text-gray-600 hover:text-gray-500 hover:dark:text-gray-400 font-medium transition-color duration-100"
        >
          <span class="">← Back</span>
        </NuxtLink>
        <div class="mb-6 px-4">
          <h1 class="text-4xl font-bold mb-6">{{ page.title }}</h1>
          <p class="mb-4 text-gray-500 dark:text-gray-400 font-medium">
            {{ page.description }}
          </p>

          <div class="flex sm:flex-row items-center">
            <div class="font-medium mr-2 text-sm text-gray-400 dark:text-gray-600">
              {{ formatDateByLocale($i18n.locale, page.date) }}
            </div>
            <div class="text-sm text-gray-400 dark:text-gray-700">|</div>
            <div class="flex ml-4">
              <span
                v-for="(author, index) in page.authors"
                :key="index"
                class="flex items-center justify-end -ml-2 rounded-full border border-gray-300 dark:border-gray-500"
              >
                <img class="inline-block h-6 w-6 rounded-full" :src="author.avatarUrl" alt />
              </span>
            </div>
          </div>
        </div>

        <div class="md:-mx-18 lg:-mx-24 aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800 mb-8">
          <img :src="page.imgUrl" alt="" class="object-cover" />
        </div>

        <BlogpostToc :toc="page.toc" class="mb-8" />

        <NuxtContent :document="page" class="px-4" />
      </div>
    </div>
  </AppContainer>
</template>

<script>
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { scrollToHeading } from '../utils'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  setup() {
    onMounted(() => {
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '')
        // do not remove setTimeout (wrong scroll pos)
        setTimeout(() => {
          scrollToHeading(hash, '--blogpost-scroll-margin-block')
        }, 300)
      }

      setTimeout(() => {
        const headings = [
          ...document.querySelectorAll('.nuxt-content h2'),
          ...document.querySelectorAll('.nuxt-content h3')
        ]
        headings.forEach(heading => {
          heading.addEventListener('click', e => {
            e.preventDefault()
            const hash = e.target.href.split('#').pop()
            scrollToHeading(hash, '--blogpost-scroll-margin-block')
          })
        })
      }, 100)
    })

    const formatDateByLocale = (locale, d) => {
      const currentLocale = locale || 'en'
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(d).toLocaleDateString(currentLocale, options)
    }

    return {
      formatDateByLocale
    }
  }
})
</script>
