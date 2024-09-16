import { StoryFn } from '@storybook/vue3'
import SessionContent from './SessionContent.vue'

export default {
  title: 'Timetable/SessionContent',
  tags: ['autodocs'],
  component: SessionContent,
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
    track: 'medpeer',
  },
  argTypes: {
    track: {
      description: 'The track property',
      control: {
        type: 'text',
      },
    },
  },
}

const StoryTemplate: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SessionContent },
  setup() {
    return { args }
  },
  template: `<SessionContent v-bind="args">
    <div style="width: 216px; display: flex; flex-direction: column; gap: 5px;">
      <p style="padding: 0; margin: 0; font-size: 12px; font-weight: 400; line-height: 1.2;">10:40</p>
      <p style="padding: 0; margin: 0; font-size: 18px; font-weight: 700; line-height: 1.2;">Evan You</p>
      <p style="padding: 0; margin: 0; font-size: 12px; font-weight: 400; line-height: 1.2;">TBD</p>
    </div>
  </SessionContent>`,
})

export const Default = StoryTemplate.bind({})
