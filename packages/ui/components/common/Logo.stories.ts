import { StoryFn } from '@storybook/vue3'
import Logo from './Logo.vue'

export default {
  title: 'common/Logo',
  component: Logo,
  parameters: {
    backgrounds: {
      default: 'light',
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
  components: { Logo },
  setup() {
    return { args }
  },
  template: '<Logo v-bind="args" />',
})

export const Default = Template.bind({})

export const Dark = Template.bind({})
Dark.args = {
  color: 'white',
}
Dark.parameters = {
  backgrounds: {
    default: 'dark',
  },
}
