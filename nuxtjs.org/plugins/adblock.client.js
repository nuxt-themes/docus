export default ({ store }) => {
  window.onNuxtReady(async () => {
    if (await adsBlocked()) {
      store.commit('setAdBlocked', true)
    }
  })
}

function adsBlocked() {
  return fetch('https://cdn.carbonads.com/carbon.js?serve=CKYILK7U&placement=nuxtjsorg', {
    method: 'HEAD',
    mode: 'no-cors'
  })
    .then(() => false)
    .catch(() => true)
}
