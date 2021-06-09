<template>
  <HomeSection class="pt-20 dark:bg-secondary-dark">
    <template #section-content>
      <SectionContent class="col-span-12 items-center">
        <template #category>
          <span class="text-terciary font-bold text-lg">Discover</span>
        </template>

        <template #title>
          <SectionTitle class="text-center">Art in the <span class="text-terciary italic">making</span></SectionTitle>
        </template>

        <template #paragraph>
          <SectionDescription class="pb-16 text-center"
            >Be part of the Nuxt.js community and help us Nuxtify the world.</SectionDescription
          >
        </template>

        <template #banner>
          <MPartnersBanner class="pb-0" :partners-logo="partners" />
        </template>
      </SectionContent>
    </template>

    <template #footer-illustration>
      <img
        loading="lazy"
        :src="`/img/home/discover/partners/dark/landscape-discover-partners.svg`"
        class="w-full h-40 object-fill left-0 mt-10 -mb-2 light:hidden"
        alt="A landscape image"
      />
      <img
        loading="lazy"
        :src="`/img/home/discover/partners/light/landscape-discover-partners.svg`"
        class="w-full h-40 object-fill left-0 mt-10 -mb-2 dark:hidden"
        alt="A landscape image"
      />
    </template>
  </HomeSection>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const partners = [
      { component: 'IconMasteringNuxt', alt: 'Mastering Nuxt logo' },
      { component: 'IconNetlify', alt: 'Netlify logo' },
      { component: 'IconVercel', alt: 'Vercel logo' },
      { component: 'IconVueMastery', alt: 'Vue Mastery logo' },
      { component: 'IconVueSchool', alt: 'Vue School logo' }
    ]

    return {
      partners
    }
  }
})
</script>
