import { hash } from 'ohash'
import { defineComponent, toRefs, useSlots, watch } from 'vue'
import type { PropType } from 'vue'
import { useGithub } from '../composables/useGithub'
import type { GithubContributorsQuery } from '../../module'
import { useAsyncData } from '#imports'

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

    const { data: contributors, refresh, pending } = await useAsyncData(`github-file-contributors-${hash(query)}`, () => fetchFileContributors(source.value, query.value))

    watch([source, query], refresh)

    return {
      contributors,
      refresh,
      pending,
    }
  },
  render({ contributors, refresh, pending }) {
    const slots = useSlots()

    return slots?.default?.({ contributors, refresh, pending })
  },
})
