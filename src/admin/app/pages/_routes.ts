import Index from './index.vue'
import Pages from './static.vue'

export default [
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
