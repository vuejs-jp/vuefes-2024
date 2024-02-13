// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app/',
  modules: ['@vuejs-jp/vuefes-ui', '@nuxtjs/i18n', '@nuxt/content'],
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  devtools: { enabled: true },
});
