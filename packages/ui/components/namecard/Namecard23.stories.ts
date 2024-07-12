import { StoryFn } from '@storybook/vue3'
import Namecard23 from './Namecard23.vue'

export default {
  title: 'namecard/Namecard23',
  component: Namecard23,
  args: {
    user: {
      display_name: 'jiyuujin',
      avatar_url: 'https://i.imgur.com/X0CcoU9.jpg',
      role: 'attendee',
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Namecard23 },
  setup() {
    return { args }
  },
  template: '<Namecard23 v-bind="args">{{ args.default }}</Namecard23>',
})

export const Default = Template.bind({})

export const WithParty = Template.bind({})
WithParty.args = {
  user: {
    display_name: 'jiyuujin',
    avatar_url: 'https://i.imgur.com/X0CcoU9.jpg',
    role: 'attendee + party',
  },
}

export const Speaker = Template.bind({})
Speaker.args = {
  user: {
    display_name: 'jiyuujin',
    avatar_url: 'https://i.imgur.com/X0CcoU9.jpg',
    role: 'speaker',
  },
}

export const Sponsor = Template.bind({})
Sponsor.args = {
  user: {
    display_name: 'jiyuujin',
    avatar_url: 'https://i.imgur.com/X0CcoU9.jpg',
    role: 'sponsor',
  },
}

export const Staff = Template.bind({})
Staff.args = {
  user: {
    display_name: 'jiyuujin',
    avatar_url: 'https://i.imgur.com/X0CcoU9.jpg',
    role: 'staff',
  },
}

export const NoAvatar = Template.bind({})
NoAvatar.args = {
  user: {
    display_name: 'jiyuujin',
    avatar_url: '',
    role: 'attendee',
  },
}
