import { StoryFn } from '@storybook/vue3'
import IconButton from './IconButton.vue'

export default {
  title: 'Icon/IconButton',
  component: IconButton,
  args: {
    href: 'https://twitter.com/vuefes',
    color: 'vue-blue',
    name: 'x',
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
  components: { IconButton },
  setup() {
    return { args }
  },
  template: `<div style="display: flex; gap: 8px;">
    <IconButton v-bind="args" />
    <IconButton v-bind="args" href="https://note.com/vuefes" name="note" />
    <IconButton v-bind="args" href="https://www.youtube.com/channel/UC6KPwA1kZJtQYdlh8_2hxCA" name="YouTube" />
    <IconButton v-bind="args" href="https://github.com/vuejs-jp" name="GitHub" />
  </div>`,
})

export const Default = Template.bind({})
