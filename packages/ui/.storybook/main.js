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
      plugins:
        configType === 'PRODUCTION'
          ? [turbosnap({ rootDir: config.root ?? `${process.cwd()}/packages/ui` }), svgLoader({ defaultImport: 'component' })]
          : [svgLoader({ defaultImport: 'component' })],
    })
  },
}
