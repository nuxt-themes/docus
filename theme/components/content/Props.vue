<script>
import { kebabCase } from 'scule'

export default defineComponent({
  props: {
    of: {
      type: String,
      default: undefined
    },
    /**
     * Toggle required column.
     */
    required: {
      type: Boolean,
      default: undefined
    },
    /**
     * Toggle values column.
     */
    values: {
      type: Boolean,
      default: undefined
    },
    /**
     * Toggle description column.
     */
    description: {
      type: Boolean,
      default: undefined
    },
    /**
     * Toglle default column.
     */
    default: {
      type: Boolean,
      default: undefined
    }
  },
  async setup (props) {
    // Docs: https://github.com/nuxtlabs/nuxt-component-meta
    const query = `/api/component-meta/${kebabCase(props.of)}`

    const { data: meta } = await useAsyncData(props.of, () => $fetch(query))

    const properties = computed(() => meta.value.props.filter(prop => !prop.tags?.ignore.includes(prop)))

    const showRequired = computed(() => {
      if (props.required !== undefined) {
        return props.required
      }

      return properties.value?.find(prop => prop.required !== undefined)
    })

    const showValues = computed(() => {
      if (props.values !== undefined) {
        return props.values
      }

      return properties.value?.find(prop => prop.values)
    })

    const showDescription = computed(() => {
      if (props.description !== undefined) {
        return props.description
      }

      return properties.value?.find(prop => prop.description)
    })

    const showDefault = computed(() => {
      if (props.default !== undefined) {
        return props.default
      }

      return properties.value?.find(prop => prop.default)
    })

    return {
      meta,
      properties,
      showRequired,
      showValues,
      showDescription,
      showDefault
    }
  }
})
</script>

<template>
  <ProseTable v-if="meta && meta?.props && meta?.props?.length">
    <ProseThead>
      <ProseTr>
        <ProseTh>Prop</ProseTh>
        <ProseTh>Type</ProseTh>
        <ProseTh v-if="showRequired">
          Required
        </ProseTh>
        <ProseTh v-if="showDefault">
          Default
        </ProseTh>
        <ProseTh v-if="showValues">
          Values
        </ProseTh>
        <ProseTh v-if="showDescription">
          Description
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr v-for="prop in properties" :key="prop.name">
        <ProseTd>
          <ProseCodeInline>{{ prop?.name || '?' }}</ProseCodeInline>
        </ProseTd>
        <ProseTd>
          <ProseCodeInline>{{ prop?.type || '?' }}</ProseCodeInline>
        </ProseTd>
        <ProseTd v-if="showRequired">
          <ProseCodeInline>{{ prop.required === '?' ? '?' : prop.required ? 'Yes' : 'No' }}</ProseCodeInline>
        </ProseTd>
        <ProseTd v-if="showDefault">
          <ProseCodeInline v-if="prop.default">
            {{ prop?.default || '?' }}
          </ProseCodeInline>
        </ProseTd>
        <ProseTd v-if="showValues">
          <ProseCodeInline v-if="prop.values">
            {{ prop?.values || '?' }}
          </ProseCodeInline>
          <ProseCodeInline v-else>
            -
          </ProseCodeInline>
        </ProseTd>
        <ProseTd v-if="showDescription">
          <ProseCodeInline>{{ prop.description }}</ProseCodeInline>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
