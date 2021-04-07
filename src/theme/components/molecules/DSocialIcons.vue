<template>
  <div class="flex">
    <a
      v-if="settings.twitter"
      :href="`https://twitter.com/${settings.twitter}`"
      target="_blank"
      rel="noopener noreferrer"
      title="Twitter"
      name="Twitter"
      :class="[padding]"
      class="text-gray-500 transition-colors duration-200 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
    >
      <IconTwitter :class="size" />
    </a>
    <a
      v-if="settings.github.repo"
      :href="$docus.repoUrl"
      target="_blank"
      rel="noopener noreferrer"
      title="GitHub"
      name="GitHub"
      :class="[padding]"
      class="text-gray-500 transition-colors duration-200 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
    >
      <IconGithub :class="size" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'w-6 h-6'
    },
    padding: {
      type: String,
      default: 'p-0'
    }
  },
  computed: {
    settings () {
      return this.$docus.settings
    }
  }
}
</script>
