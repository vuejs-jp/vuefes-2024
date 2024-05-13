import { Meta, StoryObj } from '@storybook/vue3'
import Date from './Date.vue'

const meta: Meta<typeof Date> = {
  title: 'date/Date',
  tags: ['autodocs'],
  component: Date,
  argTypes: {
    prefixYear: {
      description: 'The prefixYear property',
      control: {
        type: 'text',
      },
    },
    suffixYear: {
      description: 'The suffixYear property',
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

export default meta

type Story = StoryObj<typeof Date>

/**
 * Controlでpropsを切り替えると、日付と曜日表記が変わる
 */
export const PropsControls: Story = {
  name: 'propsControls',
  args: {
    prefixYear: '2024',
    suffixYear: '',
    date: '5.8',
    dayOfWeek: '月',
  },
  render: (args) => ({
    components: { Date },
    setup() {
      return { args }
    },
    template: '<Date :="args" />',
  })
}

/**
 * ツールバーで言語を切り替えると、日付と曜日表記が変わる
 */
export const I18n: Story = {
  name: 'i18n',
  render: () => ({
    components: { Date },
    template:  '<Date :prefix-year="$t(`prefix_year`)" :suffix-year="$t(`suffix_year`)" :date="$t(`sponsor.start_date`)" :dayOfWeek="$t(`day_of_week.monday`)" />'
  })
}
