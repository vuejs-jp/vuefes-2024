import { StoryFn } from '@storybook/vue3'
import DatePeriod from './DatePeriod.vue'

export default {
  title: 'date/DatePeriod',
  component: DatePeriod,
  args: {
    start: {
      year: 2024,
      date: '4.1',
      dayOfWeek: '月',
    },
    end: {
      date: '4.30',
      dayOfWeek: '火',
    },
  },
  argTypes: {
    start: {
      description: 'The start property',
      control: {
        type: 'object',
      },
    },
    end: {
      description: 'The end property',
      control: {
        type: 'object',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DatePeriod },
  setup() {
    return { args }
  },
  template: '<DatePeriod v-bind="args" />',
})

export const Default = Template.bind({})
