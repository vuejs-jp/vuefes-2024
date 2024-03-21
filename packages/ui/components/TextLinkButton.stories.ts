import { StoryFn } from '@storybook/vue3'
import TextLinkButton from './TextLinkButton.vue'

export default {
  title: 'Buttons/TextLinkButton',
  component: TextLinkButton,
  args: {    
    default: 'Back to Top',
    href: 'http://vuefes',
    color: 'vue-blue',
    backgroundColor: 'white',
    hoveredBackgroundColor: 'vue-blue-hover'
  },
  argTypes: {
    default: {
      description: 'Slot for submit button',
      control: {
        type: 'text',
      },
    },
    href: {
      description: 'link',
      control: {
        type: 'text',
      },
    },
    color: {
      description: 'color',
      control: {
        type: 'text',
      },
    },
    backgroundColor: {
      description: 'background color',
      control: {
        type: 'text',
      },
    },
    hoveredBackgroundColor: {
      description: 'background color when hovered',
      control: {
        type: 'text',
      },
    },
  },
}

const StoryTemplate: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextLinkButton },
  setup() {
    return { args }
  },
  template: `<div style="width: 400px;">
    <TextLinkButton v-bind="args">{{ args.default }}</TextLinkButton>
  </div>`,
})

export const Default = StoryTemplate.bind({})