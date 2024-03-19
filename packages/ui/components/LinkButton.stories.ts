import { StoryFn } from '@storybook/vue3'
import LinkButton from './LinkButton.vue'

export default {
  title: 'Buttons/LinkButton',
  component: LinkButton,
  args: {    
    default: 'Back to Top',
    url: 'http://vuefes'
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
  components: { LinkButton },
  setup() {
    return { args }
  },
  template: `<div style="width: 400px;">
    <LinkButton v-bind="args">{{ args.default }}</LinkButton>
  </div>`,
})

export const Default = StoryTemplate.bind({})
