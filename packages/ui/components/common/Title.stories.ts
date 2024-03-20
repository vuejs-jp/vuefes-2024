import { StoryFn } from '@storybook/vue3'
import Title from './Title.vue'

export default {
  title: 'common/Title',
  component: Title,
  args: {
    default: 'Vue Fes Japan 2024',
    id: 'form',
  },
  argTypes: {
    default: {
      description: 'Slot for title',
      control: {
        type: 'text',
      },
    },
    id: {
      description: 'The id property',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Title },
  setup() {
    return { args }
  },
  template: `<Title v-bind="args">
    Vue Fes Japan 2024
  </Title>`,
})

export const Default = Template.bind({})
