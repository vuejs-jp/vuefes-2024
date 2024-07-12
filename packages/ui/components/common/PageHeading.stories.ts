import { StoryFn } from '@storybook/vue3'
import PageHeading from './PageHeading.vue'

export default {
  title: 'common/PageHeading',
  component: PageHeading,
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PageHeading },
  setup() {
    return { args }
  },
  template: `<PageHeading>
    見出し
  </PageHeading>`,
})

export const Default = Template.bind({})
