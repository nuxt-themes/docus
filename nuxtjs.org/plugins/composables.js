import { ref, useContext } from '@nuxtjs/composition-api'

export function useNewsletter() {
  // @ts-ignore
  const { $http } = useContext()

  let _timeout
  const email = ref('')
  const error = ref(null)
  const subscribed = ref(false)
  const pending = ref(false)

  const subscribe = async () => {
    // Cancel empty email
    if (!email.value || !email.value.trim()) return

    if (_timeout) clearTimeout(_timeout)
    error.value = null
    pending.value = true

    try {
      await $http.$post(
        `${process.env.NUXT_API || 'https://api.nuxtjs.com'}/newsletter`,
        {
          email: email.value
        }
      )

      subscribed.value = email.value
      pending.value = false
    } catch (e) {
      pending.value = false
      subscribed.value = false

      if (e.response) {
        const { code, name } = await e.response.json()

        if (code === 'member-exists') error.value = code
        if (name === 'ValidationException') error.value = 'validation'

        _timeout = setTimeout(() => (error.value = null), 3000)
      }
    }
  }

  return {
    email,
    error,
    subscribed,
    pending,
    subscribe
  }
}
