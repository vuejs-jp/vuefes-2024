import { StoryFn } from '@storybook/vue3'
import Comment from './Comment.vue'

export default {
  title: 'common/Comment',
  component: Comment,
  args: {
    title: '今年もやります！',
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Comment },
  setup() {
    return { args }
  },
  template: '<Comment v-bind="args">{{ args.default }}</Comment>',
})

export const Default = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
