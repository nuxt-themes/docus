const SnackBar = () =>
  import('@snackbar/core' /* webpackChunkName: "snackbar/core" */)

window.onNuxtReady(async nuxt => {
  const { email, hash } = nuxt.$route.query

  if (email && hash) {
    const { createSnackbar } = await SnackBar()
    const showSnackbar = msg =>
      createSnackbar(msg, {
        timeout: 4000,
        theme: {
          backgroundColor: '#2F495E',
          textColor: 'white',
          actionColor: '#00C48D'
        }
      })

    nuxt.$http
      .$post(`${process.env.NUXT_API}/newsletter/confirm`, { email, hash })
      .then(() => showSnackbar('Email confirmed'))
      .catch(async err => {
        if (err.response) {
          const { code } = await err.response.json()
          if (code === 'member-exists') {
            showSnackbar('You are already registered.')
          }
        }
      })
  }
})
