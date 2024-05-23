import { setup } from '@storybook/vue3'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'

import './global.css'

const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  messages: {
    ja: {
      prefix_year: '2024',
      suffix_year: '',
      day_of_week: {
        monday: '月',
        tuesday: '火',
        thursday: '木',
      },
      sponsor: {
        start_date: '4.8',
        end_date: '4.25',
      },
    },
    en: {
      prefix_year: '',
      suffix_year: '2024',
      // dummy
      day_of_week: {
        monday: '',
        tuesday: '',
        thursday: '',
      },
      // end dummy
      sponsor: {
        start_date: 'April 8',
        end_date: '25,',
      },
    },
  },
})

const routes = [
  {
    path: '/',
    name: 'ja',
  },
  {
    path: '/en',
    name: 'en',
  },
]

// 画面遷移は発生しないが、StorybookではURLを直接使えないため、createMemoryHistoryで生成
const router = createRouter({ history: createMemoryHistory(), routes })

setup((app) => {
  app.use(i18n)
  app.use(router)
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
