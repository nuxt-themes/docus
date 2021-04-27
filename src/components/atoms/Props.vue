<template>
  <prose-table v-if="component">
    <prose-thead>
      <prose-tr>
        <prose-th>Prop</prose-th>
        <prose-th>Type</prose-th>
        <prose-th v-if="showRequired">Required</prose-th>
        <prose-th v-if="showDefault">Default</prose-th>
        <prose-th v-if="showValues">Values</prose-th>
        <prose-th v-if="showDescription">Description</prose-th>
      </prose-tr>
    </prose-thead>
    <prose-tbody>
      <prose-tr v-for="prop in properties" :key="prop.name">
        <prose-td>
          <prose-code-inline>{{ prop.name }}</prose-code-inline>
        </prose-td>
        <prose-td>
          <prose-code-inline>{{ prop.type && prop.type.name }}</prose-code-inline>
        </prose-td>
        <prose-td v-if="showRequired">{{ prop.required ? 'Yes' : 'No' }}</prose-td>
        <prose-td v-if="showDefault">
          <prose-code-inline v-if="prop.defaultValue">{{ prop.defaultValue && prop.defaultValue.value }}</prose-code-inline>
        </prose-td>
        <prose-td v-if="showValues">
          <prose-code-inline v-if="prop.values">{{ prop.values && JSON.stringify(prop.values).replace(/,/g, ', ') }}</prose-code-inline>
          <span v-else>-</span>
        </prose-td>
        <prose-td v-if="showDescription">
          <div v-html="prop.description"></div>
        </prose-td>
      </prose-tr>
    </prose-tbody>
  </prose-table>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    of: {
      type: String,
      default: undefined
    },
    /**
     * @ignore
     */
    data: {
      type: Object,
      default: () => ({})
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
    defaultValue: {
      type: Boolean,
      default: undefined
    }
  },
  setup(props) {
    const component = computed(() => props.data)

    const properties = computed(() => component.value.props?.filter(prop => !prop.tags?.ignore))

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
      if (props.defaultValue !== undefined) {
        return props.defaultValue
      }

      return properties.value?.find(prop => prop.defaultValue)
    })

    return {
      component,
      properties,
      showRequired,
      showValues,
      showDescription,
      showDefault
    }
  }
})
</script>
