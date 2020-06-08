export default function({ $axios, redirect, store }) {
  $axios.interceptors.response.use(
    response => {
      const data = response.data
      const { code, success } = data
      if (!success && code === 80004) {
        store.dispatch('logout', {})
      }
      return data
    },
    error => {
      return Promise.reject(error)
    }
  )
  $axios.onRequest(config => {
    // 统计请求
    store.dispatch('statisRequest', config)
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect('../../mobile/bims/views/index.html')
    }
  })
}
