import { StoryFn } from '@storybook/vue3'
import Icon from './Icon.vue'

export default {
  title: 'Icon/Icon',
  component: Icon,
  args: {
    color: 'vue-blue',
    name: 'x',
  },
  argTypes: {
    color: {
      description: 'The color property',
      control: {
        type: 'text',
      },
    },
    name: {
      description: 'The name property',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icon },
  setup() {
    return { args }
  },
  template: `<div style="display: grid; gap: 8px;">
    <h3>X</h3>
    <div style="display: flex; gap: 8px;">
      <Icon v-bind="args" />
      <Icon v-bind="args" name="x" />
      <Icon v-bind="args" name="x24" />
      <Icon v-bind="args" name="x40" />
    </div>
    <h3>Facebook</h3>
    <div style="display: flex; gap: 8px;">
      <Icon v-bind="args" name="Facebook" />
    </div>
    <h3>note</h3>
    <div style="display: flex; gap: 8px;">
      <Icon v-bind="args" name="note" />
    </div>
    <h3>YouTube</h3>
    <div style="display: flex; gap: 8px;">
      <Icon v-bind="args" name="YouTube" />
    </div>
    <h3>GitHub</h3>
    <div style="display: flex; gap: 8px;">
      <Icon v-bind="args" name="GitHub" />
      <Icon v-bind="args" name="GitHub24" />
      <Icon v-bind="args" name="GitHub32" />
    </div>
    <h3>Google</h3>
    <div style="display: flex; gap: 8px;">
      <Icon v-bind="args" name="Google24" />
      <Icon v-bind="args" name="Google32" />
    </div>
    <h3>Menu</h3>
    <div style="display: flex; gap: 8px;">
      <Icon v-bind="args" name="menu" />
    </div>
    <h3>Close</h3>
    <div style="display: flex; gap: 8px;">
      <Icon v-bind="args" name="close" />
    </div>
    <h3>External</h3>
    <div style="display: flex; gap: 8px;">
      <Icon v-bind="args" name="external" />
     </div>
    <h3>Alert</h3>
    <div style="display: flex; gap: 8px;">
     <Icon v-bind="args" name="alert" />
    </div>
  </div>`,
})

export const Default = Template.bind({})
