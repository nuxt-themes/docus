import { createRouter, createWebHistory } from 'vue3-router'

// Pages
import Index from '../pages/index.vue'
import Pages from '../pages/static.vue'

// Routes definition
const routes = [
  {
    path: '',
    name: 'index',
    component: Index
  },
  {
    path: '/pages',
    name: 'pages',
    component: Pages
  }
]

// Router plugin
export const router = createRouter({
  history: createWebHistory('/admin/'),
  routes
})
