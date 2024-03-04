import { ref } from 'vue'
import { Meta, StoryObj } from '@storybook/vue3'
import InputField from './InputField.vue'

const meta: Meta<typeof InputField> = {
  title: 'Forms/InputField',
  component: InputField,
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    type: { 
      control: 'radio',
      options: ['button', 'checkbox', 'text', 'radio']
    },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    errorMessage: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof InputField>

export const Default: Story = {
  name: 'Default',
  args: {
    id: 'default',
    name: 'default',
    label: 'ラベル',
  },
}

export const Error: Story = {
  name: 'Error',
  args: {
    id: 'error',
    name: 'error',
    label: 'ラベル',
    errorMessage: 'エラーメッセージが表示されます',
  },
}

export const Model: Story = {
  name: 'Model',
  render: (args) => ({
    components: { InputField },
    setup() {
      const modelValue = ref<string>('init value')
      return { args, modelValue }
    },
    template: `
      <p>{{ modelValue }}</p>
      <InputField :="args" v-model="modelValue" />
    `,
  }),
  args: {
    id: 'model',
    name: 'model',
    label: 'ラベル',
  },
}
