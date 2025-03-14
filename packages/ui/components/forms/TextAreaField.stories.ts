import { ref } from 'vue'
import { Meta, StoryObj } from '@storybook/vue3'
import TextAreaField from './TextAreaField.vue'

const meta: Meta<typeof TextAreaField> = {
  title: 'Forms/TextAreaField',
  tags: ['autodocs'],
  component: TextAreaField,
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: { expanded: true } },
    rows: { control: { type: 'range', min: 5, max: 30, step: 1 } },
    label: { control: 'text' },
    errorMessage: { control: 'text' },
  },
  render: (args) => ({
    components: { TextAreaField },
    setup() {
      const detail = ref<string>()
      return { args,detail }
    },
    template: `<div style="width: 400px;">
      <p>v-model value: {{ detail }}</p>
      <TextAreaField v-model:inputted-text="detail" :="args" />
    </div>`,
  })
}

export default meta

type Story = StoryObj<typeof TextAreaField>

export const Default: Story = {
  name: 'default',
  args: {
    id: 'detail',
    name: 'detail',
    label: 'お問い合わせ内容/Content',
  },
}

export const Disabled: Story = {
  name: 'disabled',
  args: {
    id: 'detail',
    name: 'detail',
    label: 'お問い合わせ内容/Content',
    disabled: true,
  },
}

export const withPlaceholder: Story = {
  name: 'with placeholder',
  args: {
    id: 'detail',
    name: 'detail',
    label: 'お問い合わせ内容/Content',
    placeholder: 'placeholderを設定できます',
  },
}

export const withErrorMessage: Story = {
  name: 'with error message',
  args: {
    id: 'detail',
    name: 'detail',
    label: 'お問い合わせ内容/Content',
    errorMessage: 'エラーメッセージを表示します',
  },
}
