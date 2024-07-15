import { StoryFn } from '@storybook/vue3'
import OgCard23 from './OgCard23.vue'

export default {
  title: 'namecard/OgCard23',
  component: OgCard23,
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
  components: { OgCard23 },
  setup() {
    return { args }
  },
  template: '<OgCard23 v-bind="args">{{ args.default }}</OgCard23>',
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
