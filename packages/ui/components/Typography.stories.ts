import { StoryFn } from '@storybook/vue3'
import Typography from './Typography.vue'

export default {
  title: 'common/Typography',
  component: Typography,
  args: {
    variant: 'heading/800',
    color: 'vue-blue',
  },
  argTypes: {
    variant: {
      description: 'The variant property',
      control: {
        type: 'text',
      },
    },
    color: {
      description: 'The color property',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Typography },
  setup() {
    return { args }
  },
  template: `<div style="display: grid; gap: 2px;">
    <Typography v-bind="args">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="heading/700">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="heading/600">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="heading/500">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="heading/400">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="heading/300">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="heading/200">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="heading/100">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="subtitle">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="body/400">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="body/300">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="body/200">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="body/100">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="link/200">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="link/100">
      Vue Fes Japan 2024
    </Typography>
    <Typography v-bind="args" variant="other/200">
      Vue Fes Japan 2024
    </Typography>
  </div>`,
})

export const Default = Template.bind({})
