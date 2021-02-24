<template>
  <code-group :key="id">
    <code-block :label="labelFirstTab" v-bind="{active: activeTab == 1 || undefined}">

      <div class="p-4 border-2 border-t-0 border-gray-700 rounded-b-md">
        <slot name="contentFirstTab" />
      </div>

    </code-block>
    <code-block :label="labelSecondTab" v-bind="{active: activeTab == 2 || undefined}">

      <div class="p-4 border-2 border-t-0 border-gray-700 rounded-b-md">
        <slot name="contentSecondTab" />
      </div>

    </code-block>
  </code-group>
</template>

<script>
export default {
  props: {
    labelFirstTab: {
      type: String,
      default: 'Yarn'
    },
    labelSecondTab: {
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
    labelFirstTab () {
      this.id += 1
    },
    labelSecondTab () {
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
