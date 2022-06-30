import { createApp } from 'vue'
import { defineNuxtPlugin } from '#app'
import NuxtLoadingBar from '../components/NuxtLoadingBar.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hookOnce('app:mounted', () => {
    const wrapper = document.createElement('div')
    wrapper.id = 'docus-loading-bar'
    document.body.appendChild(wrapper)
    createApp(NuxtLoadingBar, {
      nuxtApp,
    }).mount(wrapper)
  })
})
