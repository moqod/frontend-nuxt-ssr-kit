const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    '@/assets/less/normalize.less',
    '@/assets/less/variables.less',
    'swiper/dist/css/swiper.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/flamelink',
    '~/plugins/axios',
    { src: '~/plugins/awesome-swiper', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      baseUrl: process.env.BASE_URL,
      strategy: 'prefix_except_default',
      detectBrowserLanguage: false,
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          file: 'en.js',
        },
        {
          code: 'nl',
          iso: 'nl-NL',
          file: 'nl.js',
        }
      ],
      defaultLocale: 'en',
      lazy: true,
      langDir: 'lang/',
      seo: false // disable for better performance, enable it for layout this.$nuxtI18nSeo()
    }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  router: {
    linkActiveClass: 'active'
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: false,
    publicPath: '/dist/',
    vendor: [
      'firebase',
      'firebase-auth',
    ],

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

      // save small files in html
      // find and remove default rule
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/i');
      config.module.rules.splice(config.module.rules.indexOf(rule), 1);

      // add it again, but now without 'assets\/svg'
      config.module.rules.unshift({
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        loader: 'url-loader',
        query: {
          limit: 5000, // 5 KO
          name: 'img/[name].[hash:7].[ext]'
        }
      });

    }
  }

}
