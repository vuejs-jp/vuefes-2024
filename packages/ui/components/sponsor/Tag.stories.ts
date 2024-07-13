import { StoryFn } from '@storybook/vue3'
import Tag from './Tag.vue'

export default {
  title: 'sponsor/Tag',
  component: Tag,
  args: {
    background: '#93AF5E',
    label: 'プラチナ',
  },
  argTypes: {
    background: {
      description: 'The background property',
      control: {
        type: 'text',
      },
    },
    label: {
      description: 'The label property',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Tag },
  setup() {
    return { args }
  },
  template: '<Tag v-bind="args" />',
})

export const Platinum = Template.bind({})

export const Gold = Template.bind({})
Gold.args = {
  background: '#E5AF00',
  label: 'ゴールド',
}

export const Silver = Template.bind({})
Silver.args = {
  background: '#1A8191',
  label: 'シルバー',
}

export const Bronze = Template.bind({})
Bronze.args = {
  background: '#CC4F39',
  label: 'ブロンズ',
}
