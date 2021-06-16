<template>
  <div class="overflow-hidden relative mx-auto max-w-8xl">
    <HeroParallax />
    <div class="flex flex-wrap justify-center py-0 section">
      <section class="flex flex-col justify-start w-full px-4 pt-36 pb-52 md:pt-44 lg:pb-56 lg:pt-52 text-center">
        <h1 class="font-normal font-serif text-display-5 xs:text-display-4 md:text-display-3 2xl:text-display-2 mb-4">
          <Markdown slot="title" unwrap="p" />
        </h1>
        <h2 class="font-normal text-body-base xs:text-body-lg md:text-body-xl 2xl:text-body-2xl mb-8 px-8 sm:px-0">
          <Markdown slot="description" unwrap="p" />
        </h2>
        <div class="flex flex-wrap justify-center space-x-3 xl:space-x-4">
          <SectionButton
            :to="primary.url"
            :aria-label="primary.text"
            size="md"
            class="bg-primary-green text-gray-800 hover:bg-green-300 focus:bg-green-300"
            :icon-left="primary.icon"
            >{{ primary.text }}</SectionButton
          >
          <SectionButton
            :to="secondary.url"
            :aria-label="secondary.text"
            size="md"
            class="
              bg-white
              border
              rounded-md
              shadow-sm
              border-gray-700
              text-gray-800
              focus:bg-gray-200
              hover:bg-gray-200
            "
            :icon-left="secondary.icon"
            >{{ secondary.text }}</SectionButton
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { Markdown } from '~docus/utils'

export default defineComponent({
  components: { Markdown },
  props: {
    primary: {
      type: Object,
      default: () => ({
        text: 'Get started',
        url: '/get-started',
        icon: 'IconPlay'
      })
    },
    secondary: {
      type: Object,
      default: () => ({
        text: 'Open on GitHub',
        url: '/https://github.com',
        icon: 'IconGitHub'
      })
    }
  }
})
</script>
