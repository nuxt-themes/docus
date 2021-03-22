<template>
  <section class="px-4 mx-auto my-24 max-w-8xl">
    <div class="flex flex-col lg:flex-row">
      <div class="flex flex-col items-center pr-0 mb-8 lg:items-start lg:pr-8 lg:w-2/3">
        <h2
          class="my-8 text-4xl font-semibold leading-none tracking-tight text-center text-gray-900 lg:text-left dark:text-gray-100 sm:text-6xl lg:text-7xl sm:my-12"
        >
          {{ hero.title }}
        </h2>
        <h3 class="mb-4 text-lg text-center text-gray-700 lg:text-left sm:text-xl lg:text-2xl sm:leading-tight sm:mb-8 dark:text-gray-300">
          {{ hero.description }}
        </h3>
        <div class="flex items-center space-x-6">
          <DComponent :component="hero.cta">
            <DButtonLink class="mx-auto md:mx-0" size="large" :href="hero.cta[1]">
              {{ hero.cta[0] }}
            </DButtonLink>
          </DComponent>
          <DComponent v-if="hero.secondary" :component="hero.secondary">
            <a :href="hero.secondary[1]" class="pt-px mt-px font-medium text-gray-800 border-b-2 border-transparent dark:text-gray-100 hover:border-gray-800 dark:hover:border-gray-100">
              {{ hero.secondary[0] }}
            </a>
          </DComponent>
        </div>
      </div>
      <div class="w-full m-auto lg:w-1/3 sm:w-580px ">
        <div class="md:pl-2">
          <Terminal snippet="npx degit nuxtlabs/docus-starter#main docs" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const defaults = $docus => ({
  title: $docus.page.title,
  description: $docus.page.description || 'I am the Hero description, with some text useful to go with the title.',
  cta: ['Get started', '/get-started'],
  secondary: ['Open on GitHub', $docus.repoUrl]
})

export default {
  props: {
    title: {
      type: String,
      default: 'Hero Title'
    },
    description: {
      type: String,
      default: 'I am the Hero description, with some text useful to go with the title.'
    },
    cta: {
      type: [String, Array],
      default: () => ['Get started', '/get-started']
    },
    secondary: {
      type: [String, Array],
      default: () => ['Open on GitHub', 'https://github.com']
    }
  },
  computed: {
    hero () {
      return Object.assign(defaults(this.$docus), this.$docus.page.hero, this.$props)
    }
  }
}
</script>
