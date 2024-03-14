import { StoryFn } from '@storybook/vue3'
import Header from './Header.vue'

export default {
  title: 'common/Header',
  component: Header,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#35495e',
        },
        {
          name: 'light',
          value: '#fff',
        },
      ],
    },
  },
  args: {
    color: 'vue-blue',
  },
  argTypes: {
    color: {
      description: 'The color property',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Header },
  setup() {
    return { args }
  },
  template: '<Header v-bind="args" />',
})

export const Default = Template.bind({})

Default.parameters = {
  layout: 'fullscreen',
}
