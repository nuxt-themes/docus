<template>
  <div class="flex flex-col w-48 items-center pb-12">
    <NuxtImg :src="member.avatarUrl" class="h-24 w-24 rounded-full" />
    <span class="light:text-sky-darker dark:text-white font-semibold pt-4">{{ member.name }}</span>
    <span class="text-primary-green font-semibold">{{ member.role }}</span>
    <span class="text-gray-400">{{ member.location }}</span>
    <ul class="flex space-x-2">
      <li v-for="social in member.socials" :key="social" class="text-gray-300 hover:text-sky-darker">
        <div v-for="(href, value) in social" :key="value">
          <ALink :href="href">
            <Component :is="getSocialIcon(value)" class="h-5 w-5" />
          </ALink>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    member: {
      type: Object,
      required: true
    }
  },
  setup() {
    function getSocialIcon(social: String) {
      return `Icon${social.charAt(0).toUpperCase() + social.slice(1)}`
    }

    return { getSocialIcon }
  }
})
</script>
