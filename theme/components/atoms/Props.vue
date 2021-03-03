<template>
  <table-container>
    <table v-if="component">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th v-if="showRequired">Required</th>
          <th v-if="showDefault">Default</th>
          <th v-if="showValues">Values</th>
          <th v-if="showDescription">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in props" :key="prop.name">
          <td><code>{{ prop.name }}</code></td>
          <td><code>{{ prop.type && prop.type.name }}</code></td>
          <td v-if="showRequired">{{ prop.required ? "Yes" : "No" }}</td>
          <td v-if="showDefault"><code v-if="prop.defaultValue">{{ prop.defaultValue && prop.defaultValue.value }}</code></td>
          <td v-if="showValues">
            <code v-if="prop.values">{{ prop.values && JSON.stringify(prop.values).replace(/,/g, ', ') }}</code>
            <span v-else>-</span>
          </td>
          <td v-if="showDescription">
            <div v-html="prop.description"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </table-container>
</template>

<script>
import TableContainer from '../../../docs/components/TableContainer.vue'
export default {
  components: { TableContainer },
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
  computed: {
    component () {
      return this.data
    },
    props () {
      // hide ignored properties
      return this.component.props.filter(prop => !prop.tags?.ignore)
    },
    showRequired () {
      if (this.required !== undefined) {
        return this.required
      }
      return this.props.find(prop => prop.required !== undefined)
    },
    showValues () {
      if (this.values !== undefined) {
        return this.values
      }
      return this.props.find(prop => prop.values)
    },
    showDescription () {
      if (this.description !== undefined) {
        return this.description
      }
      return this.props.find(prop => prop.description)
    },
    showDefault () {
      if (this.defaultValue !== undefined) {
        return this.defaultValue
      }
      return this.props.find(prop => prop.defaultValue)
    }
  }
}
</script>
