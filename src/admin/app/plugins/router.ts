import { createRouter, createWebHistory } from 'vue3-router'

// Pages
import Index from '../pages/index.vue'
import Static from '../pages/static.vue'
import Components from '../pages/components.vue'
import Config from '../pages/config.vue'
import WindiCSS from '../pages/windicss.vue'

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
    },
    {
      path: '/config',
      name: 'config',
      component: Config as any
    },
    {
      path: '/windicss',
      name: 'windicss',
      component: WindiCSS as any
    }
  ]
})
