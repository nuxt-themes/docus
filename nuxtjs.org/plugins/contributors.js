export default function (ctx, inject) {
  inject('contributors', async path => {
    if (path[0] !== '/') {
      path = `/${path}`
    }
    return await fetch(
      `https://contributors-api.nuxtjs.com/nuxt/nuxtjs.org/master${path}`
    )
      .then(res => {
        if (!res.ok) return []
        return res.json()
      })
      .catch(e => [])
  })
}
