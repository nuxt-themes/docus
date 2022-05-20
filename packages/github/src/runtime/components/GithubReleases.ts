import { defineComponent, useSlots } from 'vue'
import type { PropType } from 'vue'
import { useGithub } from '../composables/useGithub'
import type { GithubReleasesQuery } from '../../module'
import { onMounted, useAsyncData, useState } from '#imports'

export default defineComponent({
  props: {
    query: {
      type: Object as PropType<GithubReleasesQuery>,
      required: false,
    },
  },
  async setup(props) {
    const { fetchReleases } = useGithub()

    const { data: _releases, refresh } = await useAsyncData('github-releases-component', () => fetchReleases(props.query))
    // TODO: remove this painful workaround
    const releases = useState('github-releases', () => _releases.value)

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
