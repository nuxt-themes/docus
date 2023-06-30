<script lang="ts">
import { joinURL } from 'ufo'
import type { PropType } from 'vue'
import { computed, defineComponent, useSlots } from 'vue'
import { useAppConfig } from '#imports'

export default defineComponent({
  props: {
    /**
     * GitHub base URL.
     */
    baseUrl: {
      type: String,
      default: () => useAppConfig()?.docus?.github?.baseUrl || 'https://github.com',
      required: false
    },
    /**
     * Repository owner.
     */
    owner: {
      type: String,
      default: () => useAppConfig()?.docus?.github?.owner,
      required: false
    },
    /**
     * Repository name.
     */
    repo: {
      type: String,
      default: () => useAppConfig()?.docus?.github?.repo,
      required: false
    },
    /**
     * The branch to use for the edit link.
     */
    branch: {
      type: String,
      default: () => useAppConfig()?.docus?.github?.branch,
      required: false
    },
    /**
     * A base directory to append to the source path.
     *
     * Won't be used if `page` is set.
     */
    dir: {
      type: String,
      default: () => useAppConfig()?.docus?.github?.dir,
      required: false
    },
    /**
     * Source file path.
     *
     * Won't be used if `page` is set.
     */
    source: {
      type: String,
      required: false,
      default: undefined
    },
    /**
     * Use page from @nuxt/content.
     */
    page: {
      type: Object as PropType<any>,
      required: false,
      default: undefined
    },
    /**
     * Content directory (to be used with `page`)
     */
    contentDir: {
      type: String,
      required: false,
      default: () => useAppConfig()?.docus?.github?.dir || 'content'
    },
    /**
     * Send to an edit page or not.
     */
    edit: {
      type: Boolean,
      required: false,
      default: () => useAppConfig()?.docus?.github?.edit
    }
  },
  setup (props) {
    if (!props.owner || !props.repo || !props.branch) {
      throw new Error('If you want to use `GithubLink` component, you must specify: `owner`, `repo` and `branch`.')
    }

    const source = computed(() => {
      let { baseUrl, repo, owner, branch, contentDir } = props
      let prefix = ''

      // Resolve source from content sources
      if (useAppConfig()?.public?.content) {
        let source
        const { sources } = useAppConfig().public.content

        for (const key in sources || []) {
          if (props.page._id.startsWith(key)) {
            source = sources[key]
            break
          }
        }

        if (source?.driver === 'github') {
          repo = source.repo || props.repo || ''
          owner = source.owner || props.owner || ''
          branch = source.branch || props.branch || 'main'
          contentDir = source.dir || props.contentDir || ''
          prefix = source.prefix || ''
        }
      }

      return { baseUrl, repo, owner, branch, contentDir, prefix }
    })

    const base = computed(() => joinURL(`${source.value.baseUrl}/${source.value.owner}/${source.value.repo}`))

    const path = computed(() => {
      const dirParts: string[] = []

      // @nuxt/content support
      // Create the URL from a document data.
      if (props?.page?._path) {
        // Use content dir
        if (source.value.contentDir) { dirParts.push(source.value.contentDir) }

        // Get page file from page data
        dirParts.push(props.page._file.substring(source.value.prefix.length))

        return dirParts
      }

      // Use props dir
      if (props.dir) {
        dirParts.push(props.dir)
      }

      // Use props source
      if (props.source) {
        dirParts.push(props.source)
      }

      return dirParts
    })

    /**
     * Create edit link.
     */
    const url = computed(() => {
      const parts = [base.value]

      if (props.edit) { parts.push('edit') } else { parts.push('tree') }

      parts.push(source?.value?.branch || '', ...path.value)

      return parts.filter(Boolean).join('/')
    })

    return {
      url
    }
  },
  render (ctx: any) {
    const { url } = ctx

    const slots = useSlots()

    return slots?.default?.({ url })
  }
})
</script>
