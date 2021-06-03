import Vue from 'vue'
import AppCopyButton from '~/components/molecules/AppCopyButton'

export default {
  mounted() {
    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      for (const block of blocks) {
        const CopyButton = Vue.extend(AppCopyButton)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }, 250)
  }
}
