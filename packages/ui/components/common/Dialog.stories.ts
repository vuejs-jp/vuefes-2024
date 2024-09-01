import { StoryFn } from '@storybook/vue3'
import Dialog from './Dialog.vue'

export default {
  title: 'common/Dialog',
  component: Dialog,
  args: {
    default: '<strong>Go!</strong>',
    open: true,
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
  components: { Dialog },
  setup() {
    return { args }
  },
  template: '<Dialog v-bind="args">{{ args.default }}</Dialog>',
})

export const Default = Template.bind({})
