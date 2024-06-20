import { ref } from 'vue'
import { Meta, StoryObj } from '@storybook/vue3'
import DropdownField from './DropdownField.vue'

const meta: Meta<typeof DropdownField> = {
  title: 'Forms/DropdownField',
  component: DropdownField,
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    type: {
      control: 'radio',
      options: ['button', 'checkbox', 'text', 'radio'],
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    errorMessage: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof DropdownField>

export const Default: Story = {
  name: 'Default',
  args: {
    id: 'default',
    name: 'default',
    label: 'JavaScriptフレームワーク',
    items: [
      { value: 'angular', text: 'Angular' },
      { value: 'react', text: 'React' },
      { value: 'vue', text: 'Vue' },
      { value: 'svelte', text: 'Svelte' },
    ],
  },
}

export const Error: Story = {
  name: 'Error',
  args: {
    id: 'error',
    name: 'error',
    label: 'JavaScriptフレームワーク',
    items: [
      { value: 'angular', text: 'Angular' },
      { value: 'react', text: 'React' },
      { value: 'vue', text: 'Vue' },
      { value: 'svelte', text: 'Svelte' },
    ],
    errorMessage: 'エラーメッセージが表示されます',
  },
}

export const ModelValue: Story = {
  name: 'ModelValue',
  render: (args) => ({
    components: { DropdownField },
    setup() {
      const modelValue = ref<string>('angular')
      return { args, modelValue }
    },
    template: `<div style="width: 400px;">
      <p>{{ modelValue }}</p>
      <DropdownField :="args" v-model="modelValue" />
    </div>`,
  }),
  args: {
    id: 'modelValue',
    name: 'modelValue',
    label: 'JavaScriptフレームワーク',
    items: [
      { value: 'angular', text: 'Angular' },
      { value: 'react', text: 'React' },
      { value: 'vue', text: 'Vue' },
      { value: 'svelte', text: 'Svelte' },
    ],
  },
}
