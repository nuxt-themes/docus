<template>
  <HomeSection class="py-20 light:bg-gray-50 dark:bg-secondary-darkest">
    <template #section-content>
      <SectionContent class="col-span-12 items-center">
        <template #category>
          <CategoryLabel label="Learn" />
        </template>

        <template #title>
          <SectionTitle class="text-center"
            ><span class="text-primary italic">Easy </span>to learn. <span class="text-primary italic">Easy</span> to
            master</SectionTitle
          >
        </template>

        <template #paragraph>
          <SectionDescription class="text-center"
            >Be part of the Nuxt.js community and help us Nuxtify the world.</SectionDescription
          >
        </template>

        <template #content>
          <OCodeBlockAnimation class="w-full text-gray-50" />
        </template>

        <template #button>
          <div class="w-full self-start">
            <SectionButton
              to="/docs/get-started/installation"
              aria-label="Learn everything"
              size="sm"
              class="bg-primary text-gray-800 font-semibold hover:bg-green-300 focus:bg-green-300"
            >
              Learn everything
            </SectionButton>
          </div>
        </template>
      </SectionContent>
    </template>
  </HomeSection>
</template>
