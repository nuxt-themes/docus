<template>
  <button ref="copy" class="copy" :class="state">
    <span v-if="state === 'copied'">Copied</span>
    <span v-else>Copy</span>
  </button>
</template>

<script>
import Clipboard from 'clipboard'

export default {
  data () {
    return {
      state: 'init'
    }
  },
  mounted () {
    const copyCode = new Clipboard(this.$refs.copy, {
      target (trigger) {
        return trigger.previousElementSibling
      }
    })

    copyCode.on('success', (event) => {
      event.clearSelection()
      this.state = 'copied'
      window.setTimeout(() => {
        this.state = 'init'
      }, 2000)
    })
  }
}
</script>
