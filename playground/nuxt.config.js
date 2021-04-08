import { resolve } from 'path'
import { withDocus } from 'docus'

export default withDocus({
  windicss: {
    root: resolve(__dirname, '..'),
    config: {
      shortcuts: {
        // 'border-header': '',
        // 'max-w-container': 'max-w-5xl'
        // 'blur-header': 'none',
        // 'bg-header': 'bg-blue-500 bg-opacity-70'
        // 'text-icon': 'text-black dark:text-white'
      }
    }
  },
  i18n: {
    locales: () => [{
      code: 'fr',
      iso: 'fr-FR',
      file: 'fr-FR.js',
      name: 'Français'
    }, {
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
    }]
  }
})
