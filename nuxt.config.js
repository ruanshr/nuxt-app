module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui','@/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  // proxy: {
  //   '/proxy-api': {
  //     target: process.env.remote_address, // 代理地址
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/proxy-api': '' //将 /api 替换掉
  //     }
  //   }
  // },
  proxy: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
