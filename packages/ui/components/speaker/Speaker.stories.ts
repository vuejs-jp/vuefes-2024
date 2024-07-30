import { StoryFn } from '@storybook/vue3'
import Speaker from './Speaker.vue'

export default {
  title: 'Speaker/Speaker',
  component: Speaker,
  args: {
    image: '/avatar/avatar_sample.jpg',
    company: 'Sample Company Name',
    division: 'Sample Divison',
    name: 'Sample Name',
    githubId: 'vuejs-jp',
    xId: 'vuefes',
  },
  argTypes: {
    image: {
      description: 'Speaker Image',
      control: {
        type: 'string',
      },
    },
    company: {
      description: 'Speaker Company',
      control: {
        type: 'string',
      },
    },
    division: {
      description: 'Division Division',
      control: {
        type: 'string',
      },
    },
    name: {
      description: 'Speaker Name',
      control: {
        type: 'string',
      },
    },
    githubId: {
      description: 'Speaker Github Id',
      control: {
        type: 'string',
      },
    },
    xId: {
      description: 'Speaker X Id',
      control: {
        type: 'string',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Speaker },
  setup() {
    return { args }
  },
  template: '<Speaker v-bind="args" />',
})

export const Default = Template.bind({})

export const RowPosition = Template.bind({})
RowPosition.args = {
  rowPosition: true,
}
