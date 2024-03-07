import { StoryFn } from '@storybook/vue3'
import TextButton from './TextButton.vue'

export default {
  title: 'Text/TextButton',
  component: TextButton,
  parameters: {
    backgrounds: {
      default: '#35495e',
    },
  },
  args: {
    href: 'https://vuefes.jp/2023',
    color: 'white',
  },
  argTypes: {
    default: {
      description: 'Slot for text button',
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
  decorators: [
    () => ({
      template:
        '<div style="height: 100vh; background-color: #35495e;"><story /></div>',
    }),
  ],
}

const StoryTemplate: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextButton },
  setup() {
    return { args }
  },
  template: `<div style="display: grid; gap: 2px;">
    <TextButton v-bind="args">{{ args.default ?? 'Vue Fes Japan 2023' }}</TextButton>
    <TextButton v-bind="args" href="https://vuefes.jp/2022">{{ args.default ?? 'Vue Fes Japan Online 2022' }}</TextButton>
    <TextButton v-bind="args" href="https://vuefes.jp/2020">{{ args.default ?? 'Vue Fes Japan 2020' }}</TextButton>
    <TextButton v-bind="args" href="https://vuefes.jp/2019">{{ args.default ?? 'Vue Fes Japan 2019' }}</TextButton>
    <TextButton v-bind="args" href="https://vuefes.jp/2018">{{ args.default ?? 'Vue Fes Japan 2018' }}</TextButton>
  </div>`,
})

export const Default = StoryTemplate.bind({})
