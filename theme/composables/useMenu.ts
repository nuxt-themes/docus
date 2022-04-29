import { useNuxtApp } from '#imports'

export const useMenu = () => {
  const { $menu } = useNuxtApp()

  return $menu
}
