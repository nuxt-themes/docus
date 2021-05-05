import { createApp } from 'vue3'
import { createRouter, createWebHistory } from 'vue3-router'
import routes from './pages/_routes'

import App from './App.vue'
import 'virtual:windi.css'
import './index.css'
import apiPlugin from './plugins/api'

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes
})

createApp(App).use(router).use(apiPlugin).mount('#app')
