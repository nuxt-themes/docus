<template>
  <div class="flex flex-col w-48 items-center pb-12">
    <NuxtImg :src="member.avatarUrl" class="h-24 w-24 rounded-full" />
    <span class="light:text-sky-darker dark:text-white font-semibold pt-4">{{ member.name }}</span>
    <!-- <span class="text-primary-green font-semibold">{{ member.role }}</span> -->
    <span class="text-gray-500 dark:text-gray-400">{{ member.location }}</span>
    <ul class="flex space-x-2 mt-2">
      <li
        v-for="(social, index) in member.socials"
        :key="index"
        class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <div v-for="(href, value, i) in social" :key="i">
          <ALink :href="href" :aria-label="value">
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
