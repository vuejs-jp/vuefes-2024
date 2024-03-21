<script setup lang="ts">
import { AnchorHTMLAttributes } from 'vue'
import CssResetButton from './common/CssResetButton.vue'
import type { Color } from '@vuejs-jp/model'       
import { useColor } from '@vuejs-jp/composable'


interface TextLinkButtonProps extends /* @vue-ignore */ AnchorHTMLAttributes {
  /* Text Color */
  color: Color,
  backgroundColor: Color,
}
const props = defineProps<TextLinkButtonProps>()
const { color } = useColor()
             
</script>
<template>
    <a 
      :href
      :target>
      <CssResetButton 
        class="link-button"
        v-bind="props"
        :style="{
          color: color(props.color),
          backgroundColor: color(props.backgroundColor),
          borderColor: color(props.color)
        }">
        <slot />
      </CssResetButton>
    </a>
</template>

<style scoped>
.link-button {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px 0px;
  border-radius: 40px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  border: 2px solid;
  box-shadow: none;
  &:hover {
    transition: 0.2s;
    opacity: 0.4;
  }
}
</style>