import svgLoader from 'vite-svg-loader'
import { conferenceTitle } from './app/utils/constants'
import { generalOg, twitterOg } from './app/utils/og.constants'
import { isProd } from './app/utils/environment.constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app/',
  app: {
    buildAssetsDir: '/_nuxt/',
    baseURL: isProd ? '/2024/' : '/',
    head: {
      title: conferenceTitle,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ...generalOg(),
        ...twitterOg(),
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://use.typekit.net/lff1jgr.css' },
      ],
      htmlAttrs: {
        lang: 'ja',
      },
    },
  },
  modules: [
    '@vuejs-jp/vuefes-ui',
    [
      '@nuxtjs/device',
      {
        device: {
          refreshOnResize: true,
        },
      },
    ],
    '@nuxtjs/i18n',
    '@nuxt/content',
    'nuxt-gtag',
  ],
  i18n: {
    legacy: false,
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'ja',
        name: '日本語',
        iso: 'ja',
        file: 'ja.json',
      },
      {
        code: 'en',
        name: 'English',
        iso: 'en',
        file: 'en.json',
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'ja',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  content: {
    markdown: {
      anchorLinks: false,
    },
  },
  gtag: {
    id: process.env.NUXT_GTAG_ID,
  },
  vite: {
    plugins: [
      svgLoader({
        svgo: false,
      }),
    ],
  },
  build: {
    transpile: ['vue-toastification'],
  },
  devtools: { enabled: true },
  css: ['~/assets/base.css'],
  postcss: {
    plugins: {
      'postcss-custom-media': {},
    },
  },
  runtimeConfig: {
    public: {
      gtagId: process.env.NUXT_GTAG_ID,
      newtSpaceUid: process.env.NUXT_NEWT_SPACE_UID,
      newtFormUid: process.env.NUXT_NEWT_FORM_UID,
      reCaptchaWebsiteKey: process.env.NUXT_RECAPTCHA_WEBSITE_KEY,
    },
  },
})
