import { StoryFn } from '@storybook/vue3'
import LinkButton from './LinkButton.vue'

export default {
  title: 'common/LinkButton',
  component: LinkButton,
  args: {
    title: 'button',
    backgroundColor: 'vue-green',
    color: 'white',
    href: 'https://example.com',
    iconName: 'x',
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LinkButton },
  setup() {
    return { args }
  },
  template: `<div style="width: 400px;">
    <LinkButton :="args">{{ args.title }}</LinkButton>
  </div>`,
})

export const Default = Template.bind({})

export const TargetBlank = Template.bind({})
TargetBlank.args = {
  target:'_blank'
}

export const SubLinkButton = Template.bind({})
SubLinkButton.args = {
  backgroundColor: 'white',
  color: 'vue-blue',
  iconName: 'note',
}
