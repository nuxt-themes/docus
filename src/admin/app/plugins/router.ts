import { createRouter, createWebHistory } from 'vue3-router'

// Pages
import Index from '../pages/index.vue'
import Pages from '../pages/static.vue'

// Router plugin
export const router = createRouter({
  history: createWebHistory('/admin/'),
  routes: [
    {
      path: '',
      name: 'index',
      component: Index as any
    },
    {
      path: '/pages',
      name: 'pages',
      component: Pages as any
    }
  ]
})
