const port = process.env.PORT || process.env.npm_package_config_nuxt_port
const host = process.env.HOST || process.env.npm_package_config_nuxt_host
const isDev = process.env.NODE_ENV == 'development'

module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`,
    isDev,
  },
  server: {
    port,
    host,
  },
  srcDir: 'src',
  head: {
    title: 'nuxt.js with typescript',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  loading: { color: '#3B8070' },
  css: ['~/assets/scss/index.scss'],
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    stats: {
      warningsFilter: /export .* was not found in/,
    }
  },
  modules: [
    '~/modules/typescript.js',
  ],
}
