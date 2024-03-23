import { StoryFn } from '@storybook/vue3'
import Button from './Button.vue'

export default {
  title: 'Button',
  component: Button,
  args: {},
}

const Template: StoryFn<unknown> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  viewport: { defaultViewport: 'iphonex' },
  components: { Button },
  setup() {
    return { args }
  },
  template: `
  <h2>Buttons</h2>

  <div>
    <p style="padding: 10px">
      <Button :="args">あ</Button>
      &emsp;通常
    </p>
    <p style="padding: 10px">
      <Button :="args" fixed-width>申し込む</Button>
      &emsp;長さ固定
    </p>
    <p style="padding: 10px">
      <Button :="args">あいうえおかきくけこたちつてと</Button>
      &emsp;ラベルに沿って伸長
    </p>
    <p style="padding: 10px">
      <Button :="args" disabled>あ</Button>
      &emsp;disabled
    </p>
  </div>
  <h2>RouterLinks</h2>
  <div>
    <p style="padding: 10px">
      <Button :="args" to="/">あ</Button>
      &emsp;通常
    </p>
    <p style="padding: 10px">
      <Button :="args" fixed-width to="/">申し込む</Button>
      &emsp;長さ固定
    </p>
    <p style="padding: 10px">
      <Button :="args" to="/">あいうえおかきくけこたちつてと</Button>
      &emsp;ラベルに沿って伸長
    </p>
    <p style="padding: 10px">
      <Button :="args" to="/" disabled>あ</Button>
      &emsp;disabled
    </p>
  </div>
  <h2>AnchorLinks</h2>
  <div>
    <p style="padding: 10px">
      <Button :="args" href="/">あ</Button>
      &emsp;通常
    </p>
    <p style="padding: 10px">
      <Button :="args" fixed-width href="/">申し込む</Button>
      &emsp;長さ固定
    </p>
    <p style="padding: 10px">
      <Button :="args" href="/">あいうえおかきくけこたちつてと</Button>
      &emsp;ラベルに沿って伸長
    </p>
    <p style="padding: 10px">
      <Button :="args" href="/" disabled>あ</Button>
      &emsp;disabled
    </p>
  </div>`,
})

export const Default = Template.bind({})
Default.args = {}

export const Secondary = Template.bind({})
Secondary.args = {
  secondary: true,
}

// export const SubLinkButton = Template.bind({})
// SubLinkButton.args = {
//   backgroundColor: 'white',
//   color: 'vue-blue',
//   iconName: 'note',
// }
