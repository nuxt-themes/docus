import { defineComponent, useSlots } from 'vue'
import type { PropType } from 'vue'
import { useGithub } from '../composables/useGithub'
import { useAsyncData } from '#imports'

export default defineComponent({
  props: {
    query: {
      type: Object as PropType<any>,
      required: false,
    },
  },
  async setup(props) {
    const { fetchRepository } = useGithub()

    const { data: repository, refresh } = await useAsyncData('github-repository-component', () => fetchRepository(props.query))

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
