import { defineNuxtConfig } from 'nuxt/config'
import svgLoader from 'vite-svg-loader'
import { conferenceTitle } from './app/utils/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app/',
  app: {
    buildAssetsDir: '/_nuxt/',
    baseURL: '/',
    head: {
      title: conferenceTitle,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
  modules: ['@vuejs-jp/vuefes-ui', '@nuxtjs/supabase', '@pinia/nuxt', '@nuxt/image'],
  // .env の NUXT_PUBLIC_SITE_URL を設定したので、一旦コメントアウトする
  // site: {
  //   url: 'https://vuefes-2024-admin.pages.dev/',
  // },
  image: {
    domains: ['jjdlwtezpdclgxxagxpj.supabase.co'],
    quality: 80,
    format: ['avif', 'webp']
  },
  supabase: {
    redirect: false,
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
      ignore: ['/api'],
    },
  },
  serverMiddleware: [
    '~/api/invite-user.ts',
    '~/api/delete-user.ts',
  ],
  devtools: { enabled: true },
  css: ['~/assets/base.css'],
  postcss: {
    plugins: {
      'postcss-custom-media': {},
    },
  },
  routeRules: {
    '/staff/console/': { prerender: true },
    '/staff/invite/': { prerender: true },
  },
  runtimeConfig: {
    public: {
      // supabase
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      serviceKey: process.env.SERVICE_KEY,
    },
  },
  // for https on localhost
  devServer: {
    // https: {
    //   key: './certificates/localhost-key.pem',
    //   cert: './certificates/localhost.pem',
    // },
    port: 3001,
  },
})
