import { mande } from 'mande'
import { Plugin } from 'vue3'

const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/admin/api' : '/admin/api'

const apiInstance = mande(apiUrl)

export const plugin = <Plugin>{
  install(app) {
    app.config.globalProperties.$api = apiInstance
  }
}

export const useApi = () => {
  return apiInstance
}
