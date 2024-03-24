import { StoryFn } from '@storybook/vue3'
import Date from './Date.vue'

export default {
  title: 'date/Date',
  component: Date,
  args: {
    date: '4.1',
    dayOfWeek: '月',
  },
  argTypes: {
    year: {
      description: 'The year property',
      control: {
        type: 'text',
      },
    },
    date: {
      description: 'The date property',
      control: {
        type: 'text',
      },
    },
    dayOfWeek: {
      description: 'The dayOfWeek property',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Date },
  setup() {
    return { args }
  },
  template: '<Date v-bind="args" />',
})

export const Default = Template.bind({})

export const WithYear = Template.bind({})
WithYear.args = {
  year: 2024,
}
