import { StoryFn } from '@storybook/vue3'
import DragDropArea from './DragDropArea.vue'

export default {
  title: 'common/DragDropArea',
  component: DragDropArea,
  args: {
    default: 'Drag & drop a file',
    fileName: 'profiledata',
    fileAccept: 'image/*',
  },
  argTypes: {
    default: {
      description: 'The default Vue slot',
      control: {
        type: 'text',
      },
      table: {
        category: 'Slots',
        type: {
          summary: 'html',
        },
      },
    },
    fileName: { control: 'text' },
    fileAccept: { control: 'text' },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DragDropArea },
  setup() {
    return { args }
  },
  template: '<DragDropArea v-bind="args">{{ args.default }}</DragDropArea>',
})

export const Default = Template.bind({})
