const port = process.env.PORT || process.env.npm_package_config_nuxt_port
const host = process.env.HOST || process.env.npm_package_config_nuxt_host
const isDev = process.env.NODE_ENV == 'development'

module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`,
    isDev,
    twitterEmbeddedUrl: process.env.TWITTER_EMBEDDED_URL ? process.env.TWITTER_EMBEDDED_URL : '',
    currentTime: (new Date().getTime()),
  },
  server: {
    port,
    host,
  },
  srcDir: 'src',
  head: {
    title: '上演時間情報まとめ｜corolife',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
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
    useForkTsChecker: true,
    extractCSS: true,
    extend: require('./extend.webpack.config'),
    stats: {
      warningsFilter: /export .* was not found in/,
    }
  },
  modules: [
    ...(process.env.GOOGLE_ANALYTICS_ID ? [[
         '@nuxtjs/google-analytics', {
            id: process.env.GOOGLE_ANALYTICS_ID
          }
        ]] : []),
    ...(process.env.HOSTNAME ? ['@nuxtjs/sitemap'] : []),
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.HOSTNAME,
    generate: true,
  },
}
