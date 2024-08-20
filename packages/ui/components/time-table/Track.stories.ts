import { StoryFn } from '@storybook/vue3'
import Track from './Track.vue'

export default {
  title: 'Timetable/Track',
  tags: ['autodocs'],
  component: Track,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#35495e',
        },
        {
          name: 'light',
          value: '#fff',
        },
      ],
    },
  },
  args: {
    color: 'hiwamoegi',
  },
  argTypes: {
    color: {
      description: 'The color property',
      control: {
        type: 'text',
      },
    },
  },
}

const MedpeerStory: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Track },
  setup() {
    return { args }
  },
  template: '<Track v-bind="args">Medpeerトラック</Track>',
})

export const Medpeer = MedpeerStory.bind({})

const MntsqStory: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Track },
  setup() {
    return { args }
  },
  template: '<Track v-bind="args">MNTSQが全ての合意をフェアにするぞトラック</Track>',
})

export const Mntsq = MntsqStory.bind({})
Mntsq.args = {
  color: 'tohoh',
}

const KickflowStory: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Track },
  setup() {
    return { args }
  },
  template: '<Track v-bind="args">kickflowトラック</Track>',
})

export const Kickflow = KickflowStory.bind({})
Kickflow.args = {
  color: 'asagi',
}

const VueStory: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Track },
  setup() {
    return { args }
  },
  template: '<Track v-bind="args">Vueトラック</Track>',
})

export const Vue = VueStory.bind({})
Vue.args = {
  color: 'sangosyo',
}
