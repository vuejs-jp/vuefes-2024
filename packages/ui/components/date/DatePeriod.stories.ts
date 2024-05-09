import { Meta, StoryObj } from '@storybook/vue3'
import DatePeriod from './DatePeriod.vue'

const meta: Meta<typeof DatePeriod> = {
  title: 'date/DatePeriod',
  tags: ['autodocs'],
  component: DatePeriod,
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

export default meta

type Story = StoryObj<typeof Date>


/**
 * Controlでpropsを切り替えると、日付と曜日表記が変わる
 */
export const PropsControls: Story = {
  name: 'propsControls',
  args: {
    start: {
      prefixYear: '2024',
      date: '4.1',
      dayOfWeek: '月',
    },
    end: {
      date: '4.30',
      dayOfWeek: '火',
    },
  },
  render: (args) => ({
    components: { DatePeriod },
    setup() {
      return { args }
    },
    template: '<DatePeriod :="args" />',
  })
}

/**
 * ツールバーで言語を切り替えると、日付と曜日表記が変わる
 */
export const I18n: Story = {
  name: 'i18n',
  render: () => ({
    components: { DatePeriod },
    template: '<DatePeriod :start="{prefixYear:$t(`sponsor.prefixYear`),date:$t(`sponsor.start_date`),dayOfWeek:$t(`sponsor.day_of_week.monday`)}" :end="{suffixYear:$t(`sponsor.suffixYear`),date:$t(`sponsor.end_date`),dayOfWeek:$t(`sponsor.day_of_week.tuesday`)}" />'
  })
}
