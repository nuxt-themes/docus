export const useUserAgent = () => {
  const { $userAgent } = useNuxtApp()

  return $userAgent
}
