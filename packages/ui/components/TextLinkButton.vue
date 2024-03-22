<script setup lang="ts">
import { AnchorHTMLAttributes, ref, computed } from 'vue'
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
      :href="props.href"
      :target="props.target"
      >
      <CssResetButton 
        class="link-button"
        v-bind="props"
        :style="{
          color: color('vue-blue'),
          backgroundColor: color('white'),
          borderColor: color('vue-blue')
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
}
</style>