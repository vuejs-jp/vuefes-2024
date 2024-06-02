import { Meta, StoryObj } from '@storybook/vue3'
import DateTime from './DateTime.vue'

const meta: Meta<typeof DateTime> = {
  title: 'date/DateTime',
  tags: ['autodocs'],
  component: DateTime,
  argTypes: {
    date: {
      description: 'The date property',
      control: {
        type: 'object',
      },
    },
    time: {
      description: 'The time property',
      control: {
        type: 'object',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Date>

export const Ja: Story = {
  name: 'Japanese',
  args: {
    date: {
      prefixYear: '2024',
      date: '6.30',
      dayOfWeek: '日',
    },
    time: {
      hour: '23',
      minute: '59',
    },
  },
  render: (args) => ({
    components: { DateTime },
    setup() {
      return { args }
    },
    template: '<DateTime :="args" />',
  })
}

export const En: Story = {
  name: 'English',
  args: {
    date: {
      prefixYear: '2024',
      date: '6.30',
    },
    time: {
      hour: '11',
      minute: '59',
      ampm: 'pm',
    },
  },
  render: (args) => ({
    components: { DateTime },
    setup() {
      return { args }
    },
    template: '<DateTime :="args" />',
  })
}
