import { defineComponent, useSlots } from 'vue'
import type { PropType } from 'vue'
import { useGithub } from '../composables/useGithub'
import type { GithubReleasesQuery } from '../../module'
import { useAsyncData } from '#imports'

export default defineComponent({
  props: {
    query: {
      type: Object as PropType<GithubReleasesQuery>,
      required: false,
    },
  },
  async setup(props) {
    const { fetchLastRelease } = useGithub()

    const { data: release, refresh } = await useAsyncData('github-last-releases-component', () => fetchLastRelease(props.query))

    return {
      release,
      refresh,
    }
  },
  render({ release, refresh }) {
    const slots = useSlots()

    return slots?.default?.({ release, refresh })
  },
})
