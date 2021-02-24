<template>
  <div class="md:flex flex-row-reverse mb-4 border-gray-700 border-2 rounded-b-md">
    <div class="flex-1 relative p-4 text-sm  rounded-r-md" :class="wrapperClass">
      <component :is="tag" v-bind="propsData">
        <template v-for="slot in slots" #[slot.name]>
          <div :key="slot.name">
            {{ slotData[slot.name] }}
          </div>
        </template>
      </component>
    </div>
    <div class="p-4 prose dark:prose-dark bg-gray-800">
      <div v-for="prop in props" :key="prop.name" class="mb-2">
        <div>
          <span class="text-gray-100">{{ prop.name }}</span>
          <span class="text-gray-100">{{ prop.description }} <code>{{ prop.type }}</code></span>
        </div>
        <template v-if="prop.values">
          <select v-model="propsData[prop.name]" class="rounded-md text-gray-700 px-2 py-1 w-64 h-8">
            <option v-for="val in prop.values" :key="val">{{ val }}</option>
          </select>
        </template>
        <input v-else type="text" :value="propsData[prop.name]" class="rounded-md text-gray-700 px-2 py-1 w-64 h-8" @input="onPropChanged(prop, $event)" />
      </div>
      <div v-for="slot in slots" :key="slot.name" class="mb-2">
        <div>
          <span class="text-gray-100">{{ slot.name }}</span>
          <span class="text-gray-100"><code>slot</code></span>
        </div>
        <input v-model="slotData[slot.name]" type="text" class="rounded-md text-gray-700 px-2 py-1 w-64 h-8" />
      </div>
    </div>
  </div>
</template>

<script>
import destr from 'destr'

export default {
  props: {
    of: {
      type: String,
      default: 'alert'
    },
    data: {
      type: String,
      default: '{}'
    },
    defaults: {
      type: Object,
      default: () => ({})
    },
    wrapperClass: {
      type: String,
      default: ''
    }
  },
  data () {
    const tag = this.of.split('/').pop()
    const component = this.getParsedComponent(this.data)
    const props = this.getProps(component)
    const attributes = props.map(p => `:${p.name}="${p.name}"`).join(' ')

    return {
      tag,
      code: `<${tag} ${attributes}>${tag}</${tag}>`,
      slotData: this.getSlots(component).reduce((data, slot) => Object.assign(data, { [slot.name]: slot.defaultValue }), {}),
      propTypes: props.reduce((data, prop) => Object.assign(data, { [prop.name]: prop.type || 'string' }), {}),
      propsData: props.reduce((data, prop) => Object.assign(data, { [prop.name]: this.defaults[prop.name] || prop.defaultValue }), {})
    }
  },
  computed: {
    component () {
      return this.getParsedComponent(this.data)
    },
    props () {
      return this.getProps(this.component)
    },
    slots () {
      return this.getSlots(this.component)
    }
  },
  methods: {
    getParsedComponent (data) {
      return JSON.parse(decodeURI(data))
    },
    getProps (component) {
      if (!component || !component.props) {
        return []
      }
      // hide ignored properties
      return component.props
        .filter(prop => !prop.tags?.ignore)
        .map((prop) => {
          let defaultValue = destr(prop.defaultValue && prop.defaultValue.value)
          if (typeof defaultValue === 'string') {
            defaultValue = defaultValue.replace(/'(.*)'/, '$1')
          }
          return {
            name: prop.name,
            values: prop.values,
            description: prop.description,
            defaultValue,
            type: prop.type && prop.type.name
          }
        })
    },
    getSlots (component) {
      if (!component || !component.slots) {
        return []
      }
      // hide ignored properties
      return component.slots
        .map((slot) => {
          return {
            name: slot.name,
            defaultValue: slot.name === 'default' && component.displayName ? component.displayName : `Slot ${slot.name}`
          }
        })
    },
    onPropChanged (prop, { target: { value } }) {
      if (this.propTypes[prop.name] === 'array') {
        value = value.split(',')
      }
      this.propsData[prop.name] = value
    }
  }
}
</script>
