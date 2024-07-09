import { StoryFn } from '@storybook/vue3'
import IntegrationDialog from './IntegrationDialog.vue'

export default {
  title: 'namecard/IntegrationDialog',
  component: IntegrationDialog,
  args: {
    default: 'ネームカードを作成するには、あらかじめチケットの購入が必要です。チケット購入後、以下のいずれかのソーシャルアカウントからログインし、必要な情報をご登録ください。',
    title: 'ソーシャルアカウントからのログイン',
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
