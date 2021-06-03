const isProd = process.env.CONTEXT === 'production'
const isTest = Boolean(process.env.DEPLOY_PRIME_URL && !isProd)

export const state = () => ({
  host:
    (isProd ? process.env.URL : process.env.DEPLOY_PRIME_URL) ||
    'http://localhost:3000',
  isProd,
  isTest,
  isDev: !isProd && !isTest,
  filled: false,
  visibleAffix: false,
  adBlocked: false,
  focusMode: false
})

export const mutations = {
  toggle(state, key) {
    state[key] = !state[key]
  },
  setFilled(state) {
    state.filled = true
  },
  setAdBlocked(state, value) {
    state.adBlocked = value
  }
}
