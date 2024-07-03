import { StoryFn } from '@storybook/vue3'
import Accordion from './Accordion.vue'

export default {
  title: 'common/Accordion',
  component: Accordion,
  args: {
    default: '<strong>Go!</strong>',
    title: '折りたたみ',
  },
  argTypes: {
    default: {
      description: 'The default Vue slot',
      control: {
        type: 'text',
      },
      table: {
        category: 'Slots',
        type: {
          summary: 'html',
        },
      },
    },
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
  components: { Accordion },
  setup() {
    return { args }
  },
  template: '<Accordion v-bind="args">{{ args.default }}</Accordion>',
})

export const Default = Template.bind({})
