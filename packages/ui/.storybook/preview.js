import { setup } from '@storybook/vue3'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { createI18n } from 'vue-i18n'

import './global.css'

const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  messages: {
    ja: {
      sponsor: {
        prefixYear: '2024',
        suffixYear: '',
        start_date: '4.8',
        end_date: '4.25',
        day_of_week: {
          monday: '月',
          tuesday: '火',
          thursday: '木',
        },
      },
    },
    en: {
      sponsor: {
        prefixYear: '',
        suffixYear: '2024',
        start_date: 'April 8',
        end_date: '25,',
        day_of_week: {
          monday: '',
          tuesday: '',
          thursday: '',
        },
      },
    },
  },
})

setup((app) => {
  app.use(i18n)
})

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'responsive',
  },
}

export const decorators = [
  (story, context) => {
    i18n.global.locale = context.globals.locale
    return { template: '<story />' }
  },
]

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: '多言語設定',
    defaultValue: 'ja',
    toolbar: {
      icon: 'globe',
      items: ['ja', 'en'],
    },
  },
}
