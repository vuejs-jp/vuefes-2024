import { StoryFn } from '@storybook/vue3'
import LinkButton from './LinkButton.vue'

export default {
  title: 'Link/LinkButton',
  tags: ['autodocs'],
  component: LinkButton,
  args: {
    backgroundColor: 'vue-green/200',
    color: 'white',
    href: 'https://forms.gle/paxZqz55oXLE4Njn9',
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LinkButton },
  setup() {
    return { args }
  },
  template: `<div style="display: grid; gap: 8px;">
    <h2>Default</h2>
    <LinkButton style="width: 400px; height: 66px;" v-bind="args">Apply</LinkButton>
    <LinkButton style="width: 400px; height: 66px;" v-bind="args" href="https://docs.google.com/presentation/d/1YXWqW55CKdt4czr8paarpdxqYz8NjSFRzrOQ-NnClKQ/edit?usp=sharing" background-color="white" color="vue-blue">Check the doc</LinkButton>
    <h2>With Icon</h2>
    <LinkButton style="width: 400px; height: 66px;" v-bind="args" href="https://twitter.com/vuefes" icon-name="x">@vuefes</LinkButton>
    <LinkButton style="width: 400px; height: 66px;" v-bind="args" href="https://note.com/vuejs_jp/m/mb35849fee631" background-color="white" color="vue-blue" icon-name="note">note</LinkButton>
    <h2>Anchor Link to Button</h2>
    <LinkButton style="width: 400px; height: 66px;" v-bind="args" is="button" icon-name="x" @on-click="() => {}">@vuefes</LinkButton>
    <LinkButton style="width: 400px; height: 66px;" v-bind="args" is="button" background-color="white" color="vue-blue" icon-name="note" @on-click="() => {}">note</LinkButton>
  </div>`,
})

export const Default = Template.bind({})
