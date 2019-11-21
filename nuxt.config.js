export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'NKNxVanity',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'content-type',
        content: 'text/html'
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'NKNxVanity is a do-it-yourself vanitizing service for NKN wallets. Create a cool looking wallet address with one click.'
      },
      { name: 'og:title', content: 'NKNxVanity' },
      {
        name: 'og:description',
        content:
          'NKNxVanity is a do-it-yourself vanitizing service for NKN wallets. Create a cool looking wallet address with one click.'
      },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://vanity.nknx.org' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@nknX_org' },
      { name: 'twitter:title', content: 'NKNxVanity' },
      {
        name: 'twitter:description',
        content:
          'NKNxVanity is a do-it-yourself vanitizing service for NKN wallets. Create a cool looking wallet address with one click.'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/grid.css',
    '~/assets/css/feather.css',
    '~/assets/scss/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/i18n',
    '~plugins/v-tooltip',
    '~plugins/filters',
    'plugins/nknVanity'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'vue-scrollto/nuxt',
    '@nuxtjs/style-resources',
    'nuxt-svg-loader',
    '@nuxtjs/axios',
    'nuxt-clipboard2',
    [
      '@nuxtjs/moment',
      {
        locales: [
          'de',
          'ru',
          'fr',
          'tr',
          'es',
          'nl',
          'hu',
          'ja',
          'fi',
          'vi',
          'sk',
          'zh-cn'
        ],
        defaultLocale: 'en'
      }
    ],
    [
      'nuxt-i18n',
      {
        defaultLocale: 'en',
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          }
        ],
        lazy: true,
        langDir: 'lang/'
      }
    ]
  ],
  styleResources: {
    scss: [
      '~/assets/scss/_app.variables.scss',
      '~/assets/scss/_app.mixins.scss'
    ]
  },
  axios: {
    baseURL: 'https://api.nknx.nkn.org/'
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ['v-tooltip'],
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          test: /nknVanityWorker\.js$/,
          loader: 'worker-loader',
          exclude: /node_modules/,
          options: {
            inline: true,
            name: 'nknVanityWorker.js'
          }
        })
      }
    }
  }
}
