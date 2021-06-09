<template>
  <HomeSection class="dark:bg-secondary-dark">
    <template #header-illustration>
      <img
        loading="lazy"
        :src="`/img/home/community/dark/landscape-community-t.svg`"
        class="w-full h-20 object-fill light:hidden"
        alt="A landscape image"
      />

      <img
        loading="lazy"
        :src="`/img/home/community/light/landscape-community-t.svg`"
        class="w-full h-20 object-fill dark:hidden"
        alt="A landscape image"
      />
    </template>

    <template #section-content>
      <SectionContent class="col-span-12 items-center pt-20 pb-60">
        <template #category>
          <CategoryLabel label="Community" />
        </template>

        <template #title>
          <SectionTitle class="text-center font-serif"
            >Developers <span class="text-primary italic">Love </span>it</SectionTitle
          >
        </template>

        <template #paragraph>
          <SectionDescription class="text-center"
            >Be part of the Nuxt.js community and help us Nuxtify the world.</SectionDescription
          >
        </template>

        <template #content>
          <ul class="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8 lg:gap-16">
            <li
              v-for="testimonial in testimonials"
              :key="testimonial.author"
              class="
                relative
                flex flex-col
                items-center
                border-2 border-gray-200
                dark:border-secondary-light
                rounded-lg
                p-6
              "
            >
              <img :src="`/img/home/community/${testimonial.icon_author}.png`" class="absolute h-12 bottom-0 -mb-9" />
              <img
                :src="`/img/home/community/${testimonial.icon_job}.svg`"
                class="md:hidden lg:block absolute h-7 bottom-0 right-0 mr-4 mb-4"
              />
              <p class="text-center mb-4">{{ testimonial.testimonial }}</p>
              <span class="font-bold text-center text-base">{{ testimonial.author }}</span>
              <span class="text-center text-sm dark:text-secondary-lightest">{{ testimonial.job }}</span>
            </li>
          </ul>
        </template>
      </SectionContent>
    </template>

    <template #footer-illustration>
      <img
        loading="lazy"
        :src="`/img/home/community/dark/landscape-community-b.svg`"
        class="absolute w-full h-40 object-fill -mt-32 light:hidden"
        alt="A landscape image"
      />
      <img
        loading="lazy"
        :src="`/img/home/community/${$colorMode.value}/landscape-community-b.svg`"
        class="absolute w-full h-40 object-fill -mt-32 dark:hidden"
        alt="A landscape image"
      />
    </template>
  </HomeSection>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const testimonials = [
      {
        testimonial:
          'Nuxt offers a compelling solution and a great ecosystem to help you ship fullstack Vue apps that are performant and SEO friendly. The flexibility to choose between SSR and SSG is icing on the cake.',
        author: 'Evan You',
        authorIcon: 'evan',
        authorUrl: 'https://twitter.com/youyuxi',
        job: 'Creator of Vue.js',
        jobIcon: 'vue',
        jobUrl: 'https://vuejs.org'
      },
      {
        testimonial:
          'Nuxt has outstanding developer productivity, experience, and performance right out of the gate!<br/>There’s so much attention to detail, ensuring teams have everything at their fingertips to productively build all manners of applications.',
        author: 'Sarah Drasner',
        authorIcon: 'sarah',
        authorUrl: 'https://twitter.com/sarah_edo',
        job: 'Core Team of Vue.js',
        jobIcon: 'vue',
        jobUrl: 'https://vuejs.org'
      },
      {
        testimonial:
          'Nuxt is a fantastic choice for teams building a production-grade product on the web. It aims to bake in performance best-practices while maintaining excellent Vue.js DX.',
        author: 'Addy Osmani',
        authorIcon: 'addy',
        authorUrl: 'https://twitter.com/addyosmani',
        job: 'Chief Engineer of Chrome',
        jobIcon: 'chrome',
        jobUrl: 'https://www.google.com/chrome/'
      },
      {
        testimonial:
          'Nuxt has been an incredible source of innovation and inspiration for developers and framework authors alike. It’s been amazing to see its growth in web projects of all sizes on the web.',
        author: 'Guillermo Rauch',
        authorIcon: 'guillermo',
        authorUrl: 'https://twitter.com/rauchg',
        job: 'CEO of Vercel',
        jobIcon: 'vercel-light',
        jobIconDark: 'vercel-dark',
        jobUrl: 'https://vercel.com'
      },
      {
        testimonial:
          'Nuxt has a unique approach of combining a great developer experience with reusable, fully integrated features that speed up the development and performance of your next website or application.',
        author: 'Dominik Angerer',
        authorIcon: 'dominik',
        authorUrl: 'https://twitter.com/domangerer',
        job: 'CEO of Storyblok',
        jobIcon: 'storyblok',
        jobUrl: 'https://www.storyblok.com'
      }
    ]

    return {
      testimonials
    }
  }
})
</script>
