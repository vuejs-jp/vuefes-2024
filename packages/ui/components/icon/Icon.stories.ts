import { StoryFn } from '@storybook/vue3'
import Icon from './Icon.vue'

export default {
  title: 'Icon/Icon',
  component: Icon,
  args: {
    color: 'vue-blue',
    name: 'x',
  },
  argTypes: {
    color: {
      description: 'The color property',
      control: {
        type: 'text',
      },
    },
    name: {
      description: 'The name property',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icon },
  setup() {
    return { args }
  },
  template: `<div style="display: flex; gap: 8px;">
    <Icon v-bind="args" />
    <Icon v-bind="args" name="x22" />
    <Icon v-bind="args" name="note" />
    <Icon v-bind="args" name="note22" />
    <Icon v-bind="args" name="YouTube" />
    <Icon v-bind="args" name="GitHub" />
  </div>`,
})

export const Default = Template.bind({})
