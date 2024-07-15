import { StoryFn } from '@storybook/vue3'
import Namecard24 from './Namecard24.vue'

export default {
  title: 'namecard/Namecard24',
  component: Namecard24,
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Namecard24 },
  setup() {
    return { args }
  },
  template: '<Namecard24 v-bind="args">{{ args.default }}</Namecard24>',
})

export const Default = Template.bind({})
