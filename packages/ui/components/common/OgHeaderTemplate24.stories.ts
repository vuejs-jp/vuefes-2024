import { StoryFn } from '@storybook/vue3'
import OgHeaderTemplate24 from './OgHeaderTemplate24.vue'

export default {
  title: 'common/OgHeaderTemplate24',
  component: OgHeaderTemplate24,
  args: {
    title: '行動規範',
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OgHeaderTemplate24 },
  setup() {
    return { args }
  },
  template: '<OgHeaderTemplate24 v-bind="args">{{ args.default }}</OgHeaderTemplate24>',
})

export const CodeOfConduct = Template.bind({})

export const Jobboard = Template.bind({})
Jobboard.args = {
  title: 'ジョブボード',
}

export const PrivacyPolicy = Template.bind({})
PrivacyPolicy.args = {
  title: 'プライバシーポリシー',
}

export const Tokusho = Template.bind({})
Tokusho.args = {
  title: '特定商取引法に基づく表示',
}
