<template>
  <div class="flex space-x-3">
    <a
      v-if="settings.twitter"
      :href="`https://twitter.com/${settings.twitter}`"
      target="_blank"
      rel="noopener noreferrer"
      title="Twitter"
      name="Twitter"
      class="text-gray-500 transition-colors duration-200 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
    >
      <IconTwitter class="w-6 h-6" />
    </a>
    <a
      v-if="settings.github.repo"
      :href="$docus.repoUrl"
      target="_blank"
      rel="noopener noreferrer"
      title="GitHub"
      name="GitHub"
      class="text-gray-500 transition-colors duration-200 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
    >
      <IconGitHub class="w-6 h-6" />
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    settings () {
      return this.$docus.settings
    }
  }
}
</script>
