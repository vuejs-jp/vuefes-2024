import { StoryFn } from '@storybook/vue3'
import LinkButton from './LinkButton.vue'

export default {
  title: 'Link/LinkButton',
  component: LinkButton,
  args: {
    backgroundColor: 'vue-green',
    color: 'white',
    href: 'https://vuefes.jp/',
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LinkButton },
  setup() {
    return { args }
  },
  template: `<div style="width: 400px;">
    <LinkButton :="args">Check</LinkButton>
  </div>`,
})

export const Default = Template.bind({})
Default.args = {
  target:'_blank',
}

export const SubLinkButton = Template.bind({})
SubLinkButton.args = {
  backgroundColor: 'white',
  color: 'vue-blue',
  iconName: 'note',
}
