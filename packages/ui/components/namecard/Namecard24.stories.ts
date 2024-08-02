import { StoryFn } from '@storybook/vue3'
import Namecard24 from './Namecard24.vue'

export default {
  title: 'namecard/Namecard24',
  component: Namecard24,
  argTypes: {
    user:{ control: 'object' },
  },
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
  components: { Namecard24 },
  setup() {
    return { args }
  },
  template: '<Namecard24 v-bind="args">{{ args.default }}</Namecard24>',
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
    display_name: '山田　太郎',
    avatar_url: '',
    role: 'attendee',
  },
  isPlaceholder: true,
}

export const FullWidthCharacters12 = Template.bind({})
FullWidthCharacters12.args = {
  user: {
    display_name: '上上上上上上上上上上上上',
    avatar_url: '',
    role: 'attendee',
  },
}