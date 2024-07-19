import { StoryFn } from '@storybook/vue3'
import StatusCard from './StatusCard.vue'

export default {
  title: 'common/StatusCard',
  component: StatusCard,
  args: {
    title: 'これから注文番号の照合を行います。注文番号照合の状況はネームカードページのステータスで確認できます。編集期限前に照合が正常に完了したことを確認してください。',
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
  components: { StatusCard },
  setup() {
    return { args }
  },
  template: '<StatusCard v-bind="args" />',
})

export const Default = Template.bind({})

export const Error = Template.bind({})
Error.args = {
  hasError: true,
  title: '印刷工程の都合上、ネームカードの編集期限後は編集できなくなります。当日会場にてネームカードをご希望の方は期限までに編集を完了させてください。',
}
