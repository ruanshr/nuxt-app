import rootGetters from './getters'
import rootActions from './actions'
import user from './modules/user'
export const state = () => ({ word: 'welcome' })
export const getters = rootGetters
export const actions = rootActions
export default {
  state,
  getters: rootGetters,
  actions: rootActions,
  modules: {
    user
  }
}
