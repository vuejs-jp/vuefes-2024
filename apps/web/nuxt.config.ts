import { createClient } from '@supabase/supabase-js'
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
    '@nuxtjs/supabase',
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
  supabase: {
    redirect: false,
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
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: ['/'],
      ignore: ['/api'],
    },
  },
  serverMiddleware: [
    '~/api/invite-user.ts',
    '~/api/delete-user.ts',
  ],
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) {
        return
      }

      const supabaseUrl = process.env.SUPABASE_URL
      const supabaseKey = process.env.SUPABASE_KEY
      const serviceKey = process.env.SERVICE_KEY
      if (!supabaseUrl || !supabaseKey || serviceKey) return

      const client = createClient(supabaseUrl, supabaseKey, {})
      const { data: speakers, error: error1 } = await client.from('speakers').select()
      const { data: sponsors, error: error2 } = await client.from('sponsors').select()
      if (error1 || error2) return

      const speakerRoutes = speakers?.map((d) => `/sessions/${d.detail_page_id}`)
      const speakerEnRoutes = speakers?.map((d) => `/en/sessions/${d.detail_page_id}`)
      const sponsorRoutes = sponsors?.map((d) => `/sponsors/${d.detail_page_id}`)
      const sponsorEnRoutes = sponsors?.map((d) => `/en/sponsors/${d.detail_page_id}`)
      nitroConfig.prerender?.routes?.push(...(speakerRoutes || []))
      nitroConfig.prerender?.routes?.push(...(speakerEnRoutes || []))
      nitroConfig.prerender?.routes?.push(...(sponsorRoutes || []))
      nitroConfig.prerender?.routes?.push(...(sponsorEnRoutes || []))
    },
    'prerender:routes': (context) => {
      for (const path of [...context.routes]) {
        if (!path.endsWith('.html') && path !== '/') {
          context.routes.delete(path)
          context.routes.add(`${path}/`)
        }
      }
    },
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
  routeRules: {
    '/sessions/': { prerender: true },
    '/sponsors/': { prerender: true },
  },
  runtimeConfig: {
    public: {
      gtagId: process.env.NUXT_GTAG_ID,
      newtSpaceUid: process.env.NUXT_NEWT_SPACE_UID,
      newtFormUid: process.env.NUXT_NEWT_FORM_UID,
      reCaptchaWebsiteKey: process.env.NUXT_RECAPTCHA_WEBSITE_KEY,
      // supabase
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      serviceKey: process.env.SERVICE_KEY,
      // datasource
      speakerDatasource : process.env.SPEAKER_DATASOURCE, // local or supabase
      sponsorDatasource : process.env.SPONSOR_DATASOURCE, // local or supabase
      // feature
      availableApplySpeaker: process.env.AVAILABLE_APPLY_SPEAKER,
      availableApplySponsor: process.env.AVAILABLE_APPLY_SPONSOR,
      enableInviteStaff: process.env.ENABLE_INVITE_STAFF,
      enableOperateAdmin: process.env.ENABLE_OPERATE_ADMIN,
      enableSwitchLocale: process.env.ENABLE_SWITCH_LOCALE,
      enableRegisterTicket: process.env.ENABLE_REGISTER_TICKET,
      enableRegisterNamecard: process.env.ENABLE_REGISTER_NAMECARD,
      showStore: process.env.SHOW_STORE,
    },
  },
  // for https on localhost
  // devServer: {
  //   https: {
  //     key: './certificates/localhost-key.pem',
  //     cert: './certificates/localhost.pem',
  //   },
  // },
})
