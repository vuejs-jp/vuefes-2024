import { StoryFn } from '@storybook/vue3'
import SessionTime from './SessionTime.vue'

export default {
  title: 'Timetable/SessionTime',
  tags: ['autodocs'],
  component: SessionTime,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#35495e',
        },
        {
          name: 'light',
          value: '#fff',
        },
      ],
    },
  },
}

const StoryTemplate: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SessionTime },
  setup() {
    return { args }
  },
  template: `<div style="width: 343px;">
    <SessionTime v-bind="args">14:30</SessionTime>
  </div>`,
})

export const Default = StoryTemplate.bind({})
