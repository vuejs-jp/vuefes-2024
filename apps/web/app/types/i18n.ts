import VueI18n from '@nuxtjs/i18n'

declare module '#app' {
  interface NuxtApp {
    $i18n: typeof VueI18n.prototype
  }
}

declare module '#i18n' {
  export interface Composer {
    setLocale: (locale: string) => Promise<void>
  }
}
