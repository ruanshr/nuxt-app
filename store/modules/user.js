export default {
  namespaces: true,
  state: () => ({}),
  actions: {
    async getCustomerList({ state }) {
      const res = getCustomerList()
    }
  }
}
