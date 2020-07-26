import extendWebpackConfig from './extend.webpack.config';

const port = process.env.NUXT_PORT || 3200;
const host = process.env.NUXT_HOST || '0.0.0.0';
const isDev = process.env.NODE_ENV === 'development';

export default {
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`,
    isDev,
    twitterEmbeddedUrl: process.env.TWITTER_EMBEDDED_URL
      ? process.env.TWITTER_EMBEDDED_URL
      : '',
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
      {
        name: 'viewport',
        content: 'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  loading: { color: '#3B8070' },
  css: ['~/assets/scss/index.scss'],
  build: {
    extractCSS: true,
    extend: extendWebpackConfig,
  },
  modules: [
    ...(process.env.GOOGLE_ANALYTICS_ID
      ? [
          [
            '@nuxtjs/google-analytics',
            {
              id: process.env.GOOGLE_ANALYTICS_ID,
            },
          ],
        ]
      : []),
    ...(process.env.HOSTNAME ? ['@nuxtjs/sitemap'] : []),
    [
      '@nuxt/typescript-build',
      {
        typeCheck: {
          eslint: { files: './**/*.{ts,tsx,js,vue}' },
        },
        ignoreNotFoundWarnings: true,
      },
    ],
  ],
  sitemap: {
    hostname: process.env.HOSTNAME,
  },
};
