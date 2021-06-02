<template>
  <section class="py-12 lg:py-24 d-container-content">
    <div class="flex flex-col lg:flex-row my-8 md:my-16">
      <div class="flex flex-col items-center pr-0 lg:items-start lg:pr-8 lg:w-2/3">
        <h2
          class="
            mb-4
            text-4xl
            xs:text-5xl
            font-semibold
            sm:leading-none
            tracking-tighter
            text-center text-gray-900
            lg:text-left
            dark:text-gray-100
            sm:text-6xl
            lg:text-7xl
            sm:mb-8
          "
        >
          <Markdown slot="title" unwrap="p" />
        </h2>
        <p
          class="
            mb-8
            text-lg text-center text-gray-700
            font-medium
            tracking-tight
            lg:text-left
            sm:text-xl
            xl:text-xl
            leading-base
            sm:mb-12
            dark:text-gray-300
          "
        >
          <Markdown slot="description" unwrap="p" />
        </p>

        <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-8">
          <InjectComponent :component="cta">
            <ButtonLink class="mx-auto md:mx-0" size="large" :href="cta[1]">
              {{ cta[0] }}
            </ButtonLink>
          </InjectComponent>
          <InjectComponent v-if="secondary" :component="secondary">
            <a
              :href="secondary[1]"
              class="
                py-px
                mt-px
                font-medium
                text-primary-500
                border-b-1 border-transparent
                dark:text-primary-400
                hover:border-primary-500
                dark:hover:border-primary-400
              "
            >
              {{ secondary[0] }}
            </a>
          </InjectComponent>
        </div>
      </div>
      <div v-if="snippet" class="w-full mx-auto lg:w-1/3 sm:w-580px">
        <div class="md:pl-2 md:mx">
          <Terminal :snippet="snippet" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { Markdown } from '~docus/utils'

export default defineComponent({
  components: { Markdown },
  props: {
    title: {
      type: String,
      default: 'Hero title'
    },
    description: {
      type: String,
      default: 'I am the Hero description, with some text useful to go with the title.'
    },
    cta: {
      type: Array,
      default: () => ['Get started', '/get-started']
    },
    secondary: {
      type: Array,
      default: () => ['Open on GitHub', 'https://github.com']
    },
    snippet: {
      type: [String, Boolean],
      default: () => false
    }
  }
})
</script>
