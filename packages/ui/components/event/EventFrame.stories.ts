import { StoryFn } from '@storybook/vue3'
import EventFrame from './EventFrame.vue'

export default {
  title: 'event/EventFrame',
  component: EventFrame,
  args: {
    title: 'Vue.jsコミュニティにようこそ！',
  },
  argTypes: {
    title: {
      description: 'The title property',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EventFrame },
  setup() {
    return { args }
  },
  template: '<EventFrame v-bind="args" />',
})

export const Default = Template.bind({})
