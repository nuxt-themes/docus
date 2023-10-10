import { UAlert, UButton } from '#components'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('UAlert', UAlert)
  nuxtApp.vueApp.component('UButton', UButton)
})
