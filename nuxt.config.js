export default {
  mode: 'spa',
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
        vueI18nLoader: true,
        defaultLocale: 'en',
        locales: [
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            flag: 'us',
            file: 'en-US.js'
          }
        ]
      }
    ]
  ],
  styleResources: {
    scss: ['~/assets/scss/_app.variables.scss']
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
