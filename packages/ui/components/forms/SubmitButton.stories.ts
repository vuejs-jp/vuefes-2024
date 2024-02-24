import { StoryFn } from '@storybook/vue3'
import SubmitButton from './SubmitButton.vue'

export default {
  title: 'Forms/SubmitButton',
  component: SubmitButton,
  args: {
    default: 'Submit',
    disabled: false,
  },
  argTypes: {
    default: {
      description: 'Slot for submit button',
      control: {
        type: 'text',
      },
    },
  },
}

const StoryTemplate: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubmitButton },
  setup() {
    return { args }
  },
  template: '<SubmitButton v-bind="args">{{ args.default }}</SubmitButton>',
})

export const Default = StoryTemplate.bind({})

export const Disabled = StoryTemplate.bind({})
Disabled.args = {
  disabled: true,
}
