import { ref } from 'vue'
import { Meta, StoryObj } from '@storybook/vue3'
import TextAreaFieldCopy from './TextAreaFieldCopy.vue'

const meta: Meta<typeof TextAreaFieldCopy> = {
  title: 'Forms/TextAreaFieldCopy',
  tags: ['autodocs'],
  component: TextAreaFieldCopy,
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
    components: { TextAreaFieldCopy },
    setup() {
      const detail = ref<string>()
      return { args,detail }
    },
    template: `<div style="width: 400px;">
      <p>v-model value: {{ detail }}</p>
      <TextAreaFieldCopy v-model:inputted-text="detail" :="args" />
    </div>`,
  })
}

export default meta

type Story = StoryObj<typeof TextAreaFieldCopy>

export const Default: Story = {
  name: 'default',
  args: {
    id: 'detail',
    name: 'detail',
    label: 'お問い合わせ内容/Content',
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
