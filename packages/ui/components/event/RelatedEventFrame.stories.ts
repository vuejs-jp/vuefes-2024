import { StoryFn } from '@storybook/vue3'
import RelatedEventFrame from './RelatedEventFrame.vue'

export default {
  title: 'event/RelatedEventFrame',
  component: RelatedEventFrame,
  args: {
    src: 'https://media.connpass.com/thumbs/f0/bb/f0bb7d40ab7393c91d6f3b9db5c0a1de.png',
    alt: 'Vue Fes Japan × TSKaigi 合同イベント「次世代フロントエンドツールチェイン」',
    registerUrl: 'https://vuejs-meetup.connpass.com/event/330325/',
    registerActionText: '参加する',
  },
  argTypes: {
    src: {
      description: 'The src property',
      control: {
        type: 'text',
      },
    },
    alt: {
      description: 'The alt property',
      control: {
        type: 'text',
      },
    },
    registerUrl: {
      description: 'The registerUrl property',
      control: {
        type: 'text',
      },
    },
    registerActionText: {
      description: 'The registerActionText property',
      control: {
        type: 'text',
      },
    },
    description: {
      description: 'The description property',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RelatedEventFrame },
  setup() {
    return { args }
  },
  template: `<RelatedEventFrame v-bind="args">
    <template #title>Vue Fes Japan × TSKaigi 合同イベント「次世代フロントエンドツールチェイン」</template>
    <template #description>Vue.js カンファレンス「Vue Fes Japan」と TypeScript カンファレンス「TSKaigi」が奇跡の合体！2024/10/19（土）開催予定のVue Fes Japan 2024、2024/11/16（土）開催予定のTSKaigi Kansai 2024に向けて、フロントエンド勢必見のイベントを緊急開催します！</template>
  </RelatedEventFrame>`,
})

export const Default = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
