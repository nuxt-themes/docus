import { defineComponent, useSlots } from 'vue'
import { useGithub } from '../composables/useGithub'
import { useAsyncData } from '#imports'

export default defineComponent({
  async setup(props) {
    const { fetchLastRelease } = useGithub()

    const { data: release, refresh } = await useAsyncData('github-last-releases-component', () => fetchLastRelease())

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
