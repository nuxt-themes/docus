<template>
  <div class="flex space-x-2 md:space-x-4">
    <a
      v-if="settings.twitter"
      :href="`https://twitter.com/${settings.twitter}`"
      target="_blank"
      rel="noopener noreferrer"
      title="Twitter"
      name="Twitter"
      class="text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
    >
      <IconTwitter class="w-4 h-4 md:w-5 md:h-5" />
    </a>

    <a
      v-if="settings.github.repo"
      :href="$docus.repoUrl"
      target="_blank"
      rel="noopener noreferrer"
      title="Github"
      name="Github"
      class="text-gray-400 transition-colors duration-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
    >
      <IconGithub class="w-4 h-4 md:w-5 md:h-5" />
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    settings() {
      return this.$docus.settings;
    }
  }
};
</script>
