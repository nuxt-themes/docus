<template>
  <div class="flex">
    <a
      v-if="settings.twitter"
      :href="`https://twitter.com/${settings.twitter}`"
      target="_blank"
      rel="noopener noreferrer"
      title="Twitter"
      name="Twitter"
      class="d-icon"
      :class="[padding]"
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
      :class="[padding]"
    >
      <IconGitHub :class="size" />
    </a>
  </div>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
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
  setup() {
    const { $docus } = useContext()

    const settings = computed(() => $docus.settings.value)

    return {
      settings
    }
  }
})
</script>
