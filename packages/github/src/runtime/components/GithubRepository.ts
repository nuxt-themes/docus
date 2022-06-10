import { defineComponent, useSlots } from 'vue'
import { useGithub } from '../composables/useGithub'
import { useAsyncData } from '#imports'

export default defineComponent({
  async setup(props) {
    const { fetchRepository } = useGithub()

    const { data: repository, refresh } = await useAsyncData('github-repository-component', () => fetchRepository())

    return {
      repository,
      refresh,
    }
  },
  render({ repository, refresh }) {
    const slots = useSlots()

    return slots?.default?.({ repository, refresh })
  },
})
