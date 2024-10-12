import { StoryFn } from '@storybook/vue3'
import Avatar from './Avatar.vue'

export default {
  title: 'Speaker/Avatar',
  component: Avatar,
  args: {
    src: '/avatar/avatar_sample.jpg',
    alt: 'sample',
  },
  argTypes: {
    src: {
      description: 'Image source url property',
      control: {
        type: 'text',
      },
    },
    alt: {
      description: 'Image alt property',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Avatar },
  setup() {
    return { args }
  },
  template: '<div style="width: 340px;"><Avatar v-bind="args" /></div>',
})

export const Default = Template.bind({})
