export const state = () => ({
  adBlocked: false
})

export const mutations = {
  setAdBlocked(state, value) {
    state.adBlocked = value
  }
}
