import { StoryFn } from '@storybook/vue3'
import TextLink from './TextLink.vue'

export default {
  title: 'Link/TextLink',
  tags: ['autodocs'],
  component: TextLink,
  args: {
    href: 'https://vuefes.jp/2023',
    color: 'white',
  },
  argTypes: {
    href: {
      description: 'The href property',
      control: {
        type: 'text',
      },
    },
    color: {
      description: 'The color property',
      control: {
        type: 'text',
      },
    },
  },
}

const StoryTemplate: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextLink },
  setup() {
    return { args }
  },
  template: `<div style="display: grid; gap: 4px;">
    <div>
      Google社の<TextLink v-bind="args" color="vue-green" href="https://policies.google.com/privacy?hl=ja" target="_blank">{{ args.default ?? 'プライバシーポリシー' }}</TextLink>
    </div>
    <div style="background-color: #35495e;">
      <TextLink v-bind="args">{{ args.default ?? 'Vue Fes Japan 2023' }}</TextLink>
    </div>
  </div>`,
})

export const Default = StoryTemplate.bind({})
