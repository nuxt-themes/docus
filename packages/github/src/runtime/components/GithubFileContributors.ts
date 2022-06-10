import { defineComponent, ref, toRefs, useSlots, watch } from 'vue'
import type { PropType } from 'vue'
import { useGithub } from '../composables/useGithub'
import type { GithubContributorsQuery } from '../../module'

export default defineComponent({
  props: {
    source: {
      type: String,
      required: true,
    },
    query: {
      type: Object as PropType<GithubContributorsQuery>,
      required: false,
    },
  },
  async setup(props) {
    const { source, query } = toRefs(props)

    const { fetchFileContributors } = useGithub()

    const contributors = ref<any>([])

    const refresh = async () => (contributors.value = await fetchFileContributors(source.value, query.value))

    watch([source, query], refresh)

    await refresh()

    return {
      contributors,
      refresh,
    }
  },
  render({ contributors, refresh }) {
    const slots = useSlots()

    return slots?.default?.({ contributors, refresh })
  },
})
