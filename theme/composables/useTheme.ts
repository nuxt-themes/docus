import { toRef, reactive } from 'vue'

export const useTheme = () => computed(() => useAppConfig().theme)
