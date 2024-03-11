import { StoryFn } from '@storybook/vue3'
import SubmitButton from './SubmitButton.vue'

export default {
  title: 'Forms/SubmitButton',
  component: SubmitButton,
  args: {
    default: 'Submit',
    backgroundColor: 'vue-green',
    color: 'white',
    disabled: false,
  },
  argTypes: {
    default: {
      description: 'Slot for submit button',
      control: {
        type: 'text',
      },
    },
    disabled: {
      description: 'button on-off',
      control: {
        type: 'boolean'
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
  template: `<div style="width: 400px;">
    <SubmitButton v-bind="args">{{ args.default }}</SubmitButton>
  </div>`,
})

export const Default = StoryTemplate.bind({})

export const Disabled = StoryTemplate.bind({})
Disabled.args = {
  disabled: true,
}
