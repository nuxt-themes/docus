<template>
  <code-group :key="id">
    <code-block :label="firstTabName" v-bind="{active: activeTab == 1 || undefined}">

      <div class="p-4 border-2 border-t-0 border-gray-700 rounded-b-md">
        <slot name="firstTabContent" />
      </div>

    </code-block>
    <code-block :label="secondTabName" v-bind="{active: activeTab == 2 || undefined}">

      <div class="p-4 border-2 border-t-0 border-gray-700 rounded-b-md">
        <slot name="secondTabContent" />
      </div>

    </code-block>
  </code-group>
</template>

<script>
export default {
  props: {
    firstTabName: {
      type: String,
      default: 'Yarn'
    },
    secondTabName: {
      type: String,
      default: 'NPM'
    },
    /**
     * @values 1,2
     */
    activeTab: {
      type: String,
      default: '1',
      validator (value) {
        return ['1', '2'].includes(value)
      }
    }
  },
  data () {
    return {
      id: 0
    }
  },
  watch: {
    firstTabName () {
      this.id += 1
    },
    secondTabName () {
      this.id += 1
    },
    activeTab () {
      this.$nextTick(() => {
        this.id += 1
      })
    }
  }
}
</script>
