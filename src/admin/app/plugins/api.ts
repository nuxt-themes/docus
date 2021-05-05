import { mande } from 'mande'
import { Plugin } from 'vue3'

export default <Plugin>{
  install(app) {
    const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/admin/api' : '/admin/api'

    app.config.globalProperties.$api = mande(apiUrl)
  }
}
