import { StoryFn } from '@storybook/vue3'
import Tab from './Tab.vue'

export default {
  title: 'Tab/Tab',
  tags: ['autodocs'],
  component: Tab,
  args: {
    labels: ['Sponsor', 'Speaker', 'Staff'],
  },
  argTypes: {
    href: {
      description: 'The labels property',
      control: {
        type: 'text',
      },
    },
  },
}

const StoryTemplate: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Tab },
  setup() {
    return { args }
  },
  template: `<Tab v-bind="args">
    <template v-slot:tab_content_0>Sponsor</template>
    <template v-slot:tab_content_1>Speaker</template>
    <template v-slot:tab_content_2>Staff</template>
  </Tab>`,
})

export const Default = StoryTemplate.bind({})
