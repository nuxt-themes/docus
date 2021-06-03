<template>
  <div>
    <p
      class="
        pb-3
        text-sm
        font-bold
        tracking-wide
        text-gray-500
        uppercase
        border-b border-dashed
        lg:mb-2
        dark:text-gray-600
        lg:text-xs
      "
    >
      Partners
    </p>
    <a
      v-for="sponsor in sponsors"
      :key="sponsor.name"
      :href="sponsor.url"
      class="
        block
        py-2
        border-b border-dashed
        opacity-75
        hover:opacity-100
        lg:inline-block
        lg:w-full
      "
      rel="noopener sponsored"
      target="_blank"
    >
      <img
        :src="`/img/sponsors/${$colorMode.value}/${sponsor.img}`"
        :alt="sponsor.name"
        :class="sponsor.class"
      />
    </a>
    <AppButton
      :to="localePath({ name: 'sponsor-nuxtjs' })"
      class="justify-center mt-2 mb-8"
    >
      Support Us
    </AppButton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sponsors: [
        {
          name: 'Netlify',
          url: 'https://www.netlify.com/?ref=nuxt',
          img: 'netlify-logo.svg',
          class: 'w-32'
        },
        {
          name: 'Google Chrome',
          img: 'google-chrome.svg',
          url: 'https://www.google.com/chrome/?ref=nuxt',
          class: 'w-32'
        },
        {
          name: 'Strapi',
          url: 'https://strapi.io/?ref=nuxt',
          img: 'strapi-logo.svg',
          class: 'w-32'
        },
        {
          name: 'Ship Shape',
          url: 'https://shipshape.io/?ref=nuxt',
          img: 'shipshape-logo.svg',
          class: 'w-32'
        },
        {
          name: 'Layer0',
          url: 'https://www.layer0.co/?ref=nuxt',
          img: 'layer0-logo.svg',
          class: 'w-32'
        },
        {
          name: 'Swell',
          url: 'https://swell.is/?ref=nuxt',
          img: 'swell-logo.svg',
          class: 'h-8'
        }
      ]
    }
  }
}
</script>
