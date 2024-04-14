import { StoryFn } from '@storybook/vue3'
import SecondaryLinkButton from './SecondaryLinkButton.vue'

export default {
  title: 'Link/SecondaryLinkButton',
  tags: ['autodocs'],
  component: SecondaryLinkButton,
  args: {
    href: 'https://forms.gle/paxZqz55oXLE4Njn9',
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SecondaryLinkButton },
  setup() {
    return { args }
  },
  template: `<div style="display: grid; gap: 8px; width: 400px;">
    <h2>Default</h2>
    <SecondaryLinkButton :="args" href="https://docs.google.com/presentation/d/1YXWqW55CKdt4czr8paarpdxqYz8NjSFRzrOQ-NnClKQ/edit?usp=sharing">Check the doc</SecondaryLinkButton>
    <h2>With Icon</h2>
    <SecondaryLinkButton :="args" href="https://note.com/vuejs_jp/m/mb35849fee631" icon-name="note">note</SecondaryLinkButton>
  </div>`,
})

export const Default = Template.bind({})
