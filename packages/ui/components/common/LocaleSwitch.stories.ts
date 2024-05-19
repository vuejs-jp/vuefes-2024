import { StoryFn } from '@storybook/vue3'
import LocaleSwitch from './LocaleSwitch.vue'

export default {
  title: 'common/LocaleSwitch',
  component: LocaleSwitch,
}

const Template: StoryFn<unknown> = () => ({
  components: { LocaleSwitch },
  setup() {
    return {  }
  },
  template: '<LocaleSwitch />',
})

export const Default = Template.bind({})
