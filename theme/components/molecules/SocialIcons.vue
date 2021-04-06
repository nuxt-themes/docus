<template>
  <div class="flex" :class="spaceBetween">
    <a
      v-if="settings.twitter"
      :href="`https://twitter.com/${settings.twitter}`"
      target="_blank"
      rel="noopener noreferrer"
      title="Twitter"
      name="Twitter"
      class="d-icon"
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
      class="d-icon"
    >
      <IconGitHub :class="size" />
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
    spaceBetween: {
      type: String,
      default: 'space-x-3'
    }
  },
  computed: {
    settings () {
      return this.$docus.settings
    }
  }
}
</script>
