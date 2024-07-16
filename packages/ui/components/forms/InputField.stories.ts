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
      options: ['button', 'checkbox', 'text', 'radio'],
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
    label: 'お名前',
    placeholder: '山田太郎',
  },
}

export const Error: Story = {
  name: 'Error',
  args: {
    id: 'error',
    name: 'error',
    label: 'お名前',
    placeholder: '山田太郎',
    errorMessage: 'エラーメッセージが表示されます',
    annotation:'※全角12文字（半角24文字）まで'
  },
}

export const ModelValue: Story = {
  name: 'ModelValue',
  render: (args) => ({
    components: { InputField },
    setup() {
      const modelValue = ref<string>('init value')
      return { args, modelValue }
    },
    template: `<div style="width: 400px;">
      <p>{{ modelValue }}</p>
      <InputField :="args" v-model="modelValue" />
    </div>`,
  }),
  args: {
    id: 'modelValue',
    name: 'modelValue',
    label: 'お名前',
  },
}
