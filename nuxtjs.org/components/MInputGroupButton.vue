<template>
  <form class="mt-4 sm:flex lg:mt-0" @submit.prevent="submit">
    <ATextInput
      :value="value"
      :placeholder="placeholder"
      class="white:placeholder-gray-400 dark:placeholder-gray-300 appearance-none min-w-0 sm:max-w-xs block w-full bg-none dark:bg-transparent light:bg-white border light:border-gray-200 dark:border-wite rounded-md py-2 pl-3 pr-10 text-base light:text-gray-500 dark:text-white focus:outline-none light:focus:ring-black dark:focus:ring-white light:focus:border-white dark:focus:border-white sm:text-sm"
      @input="$emit('input', $event)"
    />
    <div class="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
      <AButton
        type="submit"
        aria-label="Submit"
        class="bg-primary-green w-full rounded-md text-sm px-4 h-10 font-medium text-gray-800 hover:bg-green-300 focus:bg-green-300"
        @click="submit"
      >
        <slot />
      </AButton>
    </div>
  </form>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'send'
    },
    done: {
      type: Boolean,
      default: false
    },
    doneIcon: {
      type: String,
      default: 'check'
    },
    doneText: {
      type: String,
      default: 'Done'
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: String,
      default: 'spinner'
    },
    loadingText: {
      type: String,
      default: 'Loading'
    }
  },
  setup(props, { emit }) {
    const submit = () => {
      emit('submit', props.value)
    }

    const currentIcon = computed(() => {
      if (props.loading) {
        return props.loadingIcon
      }

      if (props.done) {
        return props.doneIcon
      }

      return props.icon
    })

    const currentText = computed(() => {
      if (props.loading) {
        return props.loadingText
      }

      if (props.done) {
        return props.doneText
      }

      return props.submitText
    })

    return {
      submit,
      currentIcon,
      currentText
    }
  }
})
</script>
