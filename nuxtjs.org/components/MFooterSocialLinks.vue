<template>
  <ul class="flex items-center space-x-4 xl:space-x-5">
    <li v-for="(social, key) in socials" :key="key">
      <ALink :href="social.href">
        <Component :is="social.icon" class="h-6 w-6 text-gray-400 dark:text-cloud-lighter hover:text-primary" />
      </ALink>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const socials = [
      {
        href: 'https://www.youtube.com/channel/UCJ9jj5YMzo-HsyM6WG9Q_Lg',
        icon: 'IconYoutube'
      },
      {
        href: 'https://discord.com/invite/ps2h6QT',
        icon: 'IconDiscord'
      },
      {
        href: 'https://twitter.com/nuxt_js?lang=fr',
        icon: 'IconTwitter'
      },
      {
        href: 'https://github.com/nuxt',
        icon: 'IconGitHub'
      }
    ]

    return {
      socials
    }
  }
})
</script>
