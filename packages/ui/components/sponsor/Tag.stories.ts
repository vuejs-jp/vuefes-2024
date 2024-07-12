import { StoryFn } from '@storybook/vue3'
import Tag from './Tag.vue'

export default {
  title: 'sponsor/Tag',
  component: Tag,
  args: {
    background: '#93AF5E',
    label: 'プラチナ',
  },
  argTypes: {
    background: {
      description: 'The background property',
      control: {
        type: 'text',
      },
    },
    label: {
      description: 'The label property',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Tag },
  setup() {
    return { args }
  },
  template: '<Tag v-bind="args" />',
})

export const Default = Template.bind({})
