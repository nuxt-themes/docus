import { createApp } from 'vue3'
import App from './App.vue'

// Styles
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'splitpanes/dist/splitpanes.css'
import './index.css'
import 'virtual:windi-utilities.css'

// Plugins
import { router as routerPlugin } from './plugins/router'
import { plugin as apiPlugin } from './plugins/api'

// Create app
const app = createApp(App)

app.use(routerPlugin)

app.use(apiPlugin)

app.mount('#app')
