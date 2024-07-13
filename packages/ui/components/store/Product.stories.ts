import { StoryFn } from '@storybook/vue3'
import Product from './Product.vue'

export default {
  title: 'store/Product',
  component: Product,
  args: {
    name: 'Tシャツ',
    explain: 'Vue Fes Japan 2023 のオリジナル T シャツです。サイズはS・M・L・XLの4種類。前面のみのプリントです。',
    price: '¥2,500',
    size: 'S / M / L / XL',
    color: 'ネイビー',
    src: 'store/vue-t-shirt.png',
    alt: 'Tシャツ',
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Product },
  setup() {
    return { args }
  },
  template: '<Product v-bind="args">{{ args.default }}</Product>',
})

export const Default = Template.bind({})
