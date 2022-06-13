import { defineComponent, ref, useSlots } from 'vue'
import type { PropType } from 'vue'
import { hash } from 'ohash'
import { useGithub } from '../composables/useGithub'
import type { GithubReleasesQuery } from '../../module'
import { useAsyncData, useState } from '#imports'

export default defineComponent({
  props: {
    query: {
      type: Object as PropType<GithubReleasesQuery>,
      required: false,
    },
  },
  async setup(props) {
    const { fetchReleases } = useGithub()

    const id = `github-releases-component-${hash(props.query)}`

    const { data: _releases, refresh } = await useAsyncData(id, () => fetchReleases(props.query))

    // TODO: remove this painful workaround: hotfix for https://github.com/vuejs/core/issues/5513
    // @ts-expect-error - Workaround
    const releases = process.client ? useState(id) : ref()
    releases.value = releases.value || _releases.value

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
