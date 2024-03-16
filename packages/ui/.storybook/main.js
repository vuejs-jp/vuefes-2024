import { mergeConfig } from 'vite'
import turbosnap from 'vite-plugin-turbosnap'
import svgLoader from 'vite-svg-loader'

module.exports = {
  stories: ['../components/**/*.stories.mdx', '../components/**/*.stories.@(js|ts)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-backgrounds',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [svgLoader({ defaultImport: 'component' })],
    })
  },
}
