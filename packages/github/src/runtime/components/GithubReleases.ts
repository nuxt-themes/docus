import { defineComponent, useSlots } from 'vue'
import type { PropType } from 'vue'
import { useGithub } from '../composables/useGithub'
import type { GithubReleasesQuery } from '../../module'
import { onMounted, useAsyncData } from '#imports'

export default defineComponent({
  props: {
    query: {
      type: Object as PropType<GithubReleasesQuery>,
      required: false,
    },
  },
  async setup(props) {
    const { fetchReleases } = useGithub()

    const { data: releases, refresh } = await useAsyncData('github-releases-component', () => fetchReleases(props.query))

    // TODO: This is a hotfix for https://github.com/vuejs/core/issues/5513
    onMounted(() => refresh())

    return {
      releases,
      refresh,
    }
  },
  render({ releases, refresh }) {
    const slots = useSlots()

    return slots?.default?.({ releases, refresh })
  },
})
