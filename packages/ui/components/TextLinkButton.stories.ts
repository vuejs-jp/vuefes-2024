import { StoryFn } from '@storybook/vue3'
import TextLinkButton from './TextLinkButton.vue'

export default {
  title: 'Buttons/TextLinkButton',
  component: TextLinkButton,
  args: {    
    default: 'Back to Top',
    href: 'http://vuefes',
    color: 'vue-green',
    backgroudColor: 'white',
  },
  argTypes: {
    default: {
      description: 'Slot for submit button',
      control: {
        type: 'text',
      },
    }  
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