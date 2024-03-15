import { StoryFn } from '@storybook/vue3'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
import SpHeader from './SpHeader.vue'

export default {
  title: 'common/SpHeader',
  component: SpHeader,
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
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        mobile1: {
          name: 'Small mobile',
          styles: { width: '375px', height: '667px' },
        },
      },
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
  components: { SpHeader },
  setup() {
    return { args }
  },
  template: '<SpHeader v-bind="args" />',
})

export const Default = Template.bind({})

Default.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'mobile1',
  },
}
