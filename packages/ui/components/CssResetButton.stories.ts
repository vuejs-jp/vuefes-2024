import { StoryFn } from '@storybook/vue3'
import CssResetButton from './CssResetButton.vue'

export default {
  title: 'Example/CssResetButton',
  component: CssResetButton,
  args: {
    default: '<strong>Go!</strong>',
  },
  argTypes: {
    default: {
      description: 'The default Vue slot',
      control: {
        type: 'text',
      },
      table: {
        category: 'Slots',
        type: {
          summary: 'html',
        },
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CssResetButton },
  setup() {
    return { args }
  },
  template: '<CssResetButton v-bind="args">{{ args.default }}</CssResetButton>',
})

export const Default = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
