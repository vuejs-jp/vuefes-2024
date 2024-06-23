import { StoryFn } from '@storybook/vue3'
import IntegrationDialog from './IntegrationDialog.vue'

export default {
  title: 'namecard/IntegrationDialog',
  component: IntegrationDialog,
  args: {
    default: 'ネームカードを作成するには、あらかじめチケットの購入が必要です。',
    title: 'ソーシャルアカウントとの連携',
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
  components: { IntegrationDialog },
  setup() {
    return { args }
  },
  template: '<IntegrationDialog v-bind="args">{{ args.default }}</IntegrationDialog>',
})

export const Default = Template.bind({})
