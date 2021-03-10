<template>
  <Container aside fluid>
    <template #header>
      <Header>
        <template #desktop-right>
          <ButtonLink href="/get-started/installation">Get started</ButtonLink>
        </template>
      </Header>
    </template>
    <template #aside>
      <Aside class="block lg:hidden" />
    </template>
    <section class="px-4 mx-auto my-24 max-w-8xl">
      <h1
        class="my-8 text-4xl font-semibold leading-none tracking-tight text-center text-gray-900 md:text-left dark:text-gray-100 sm:text-6xl lg:text-8xl sm:my-14"
      >
        Documentation generator<br />based on Nuxt and Tailwind.
      </h1>
      <div class="flex flex-col md:flex-row">
        <div class="flex flex-col items-start pr-0 mb-8 md:pr-2 lg:pr-8 md:w-1/2">
          <h3
            class="mb-4 text-lg text-center text-gray-700 md:text-left sm:text-xl md:text-2xl sm:leading-tight sm:mb-8 dark:text-gray-200"
          >
            Write in markdown, use Vue components, add style with TailwindCSS
            and enjoy the power of Nuxt.
          </h3>
          <ButtonLink
            class="mx-auto md:mx-0"
            size="large"
            href="/get-started/installation"
          >
            Get started
          </ButtonLink>
          <!-- TODO: GitHub stars Button -->
        </div>
        <div class="w-full m-auto md:w-1/2 sm:w-580px ">
          <div class="md:pl-2">
            <Terminal snippet="npx degit nuxtlabs/docus-starter" />
          </div>
        </div>
      </div>
    </section>
    <section class="py-24 bg-gray-50 dark:bg-gray-800">
      <div class="px-4 mx-auto max-w-8xl">
        <h2
          class="mb-8 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
        >
          What’s included?
        </h2>
        <ul
          class="grid gap-4 font-semibold text-left text-gray-900 dark:text-gray-100 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-8"
        >
          <li v-for="feature of features" :key="feature.title" class="flex">
            <div class="relative w-full px-6 py-8 bg-white rounded shadow dark:bg-gray-900 hover:shadow-lg">
              <component
                :is="feature.icon"
                v-if="feature.icon"
                class="h-16 max-w-full mb-3"
              />
              <h2 class="mb-2 text-xl">{{ feature.title }}</h2>
              <p class="font-normal">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum voluptatibus veritatis maxime est qui blanditiis aut libero quod. Doloremque obcaecati voluptate tenetur quia fuga veniam incidunt rerum voluptatibus iusto earum.</p>
              <!-- TODO: feature.description -->
            </div>
          </li>
        </ul>
      </div>
    </section>
  </Container>
</template>

<script>
export default {
  data () {
    return {
      features: [
        {
          icon: 'IconMarkdown',
          title: 'Write Markdown'
        },
        {
          icon: 'IconVue',
          title: 'Vue Components'
        },
        {
          icon: 'IconNuxt',
          title: 'Nuxt Architecture'
        },
        {
          icon: 'IconTailwind',
          title: 'Tailwind CSS'
        },
        {
          icon: 'IconSSG',
          title: 'Static Generation'
        },
        {
          icon: 'IconLighthouse',
          title: 'Lighthouse Optimised'
        },
        {
          icon: 'IconZap',
          title: 'Smart Generation'
        },
        {
          icon: 'IconPuzzle',
          title: 'Extensible'
        }
      ]
    }
  },
  head () {
    return {
      title: 'Docus - Documentation generator based on Nuxt and Tailwind.'
    }
  }
}
</script>
