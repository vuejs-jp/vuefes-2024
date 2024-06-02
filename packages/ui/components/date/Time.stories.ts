import { Meta, StoryObj } from '@storybook/vue3'
import Time from './Time.vue'

const meta: Meta<typeof Date> = {
  title: 'date/Time',
  tags: ['autodocs'],
  component: Time,
  argTypes: {
    hour: {
      description: 'The hour property',
      control: {
        type: 'text',
      },
    },
    minute: {
      description: 'The minute property',
      control: {
        type: 'text',
      },
    },
    ampm: {
      description: 'The ampm property',
      control: {
        type: 'text',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Date>

export const Ja: Story = {
  name: 'Japanese',
  args: {
    hour: '23',
    minute: '59',
  },
  render: (args) => ({
    components: { Time },
    setup() {
      return { args }
    },
    template: '<Time :="args" />',
  })
}

export const En: Story = {
  name: 'English',
  args: {
    hour: '11',
    minute: '59',
    ampm: 'pm',
  },
  render: (args) => ({
    components: { Time },
    setup() {
      return { args }
    },
    template: '<Time :="args" />',
  })
}
