import { useNuxtApp } from '#imports'

export const useUserAgent = () => {
  const { $userAgent } = useNuxtApp()

  return $userAgent
}
