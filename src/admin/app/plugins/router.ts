import { createRouter, createWebHistory } from 'vue3-router'

// Pages
import Index from '../pages/index.vue'
import Static from '../pages/static.vue'
import Components from '../pages/components.vue'

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
      path: '/static',
      name: 'static',
      component: Static as any
    },
    {
      path: '/components',
      name: 'components',
      component: Components as any
    }
  ]
})
