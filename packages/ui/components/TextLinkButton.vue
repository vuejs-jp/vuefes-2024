<script setup lang="ts">
import { AnchorHTMLAttributes, ref, computed } from 'vue'
import CssResetButton from './common/CssResetButton.vue'
import type { Color } from '@vuejs-jp/model'       
import { useColor } from '@vuejs-jp/composable'


interface TextLinkButtonProps extends /* @vue-ignore */ AnchorHTMLAttributes {
  /* Text Color */
  color: Color,
  backgroundColor: Color,
  hoveredBackgroundColor: Color,
}
const props = defineProps<TextLinkButtonProps>()
const { color } = useColor()
   

const hover = ref(false)
const hoverIn = () => {
  hover.value = true
}
const hoverOut = () => {
  hover.value = false
}
const style = computed(() =>{
  if (hover.value){
    return { 
      color: color(props.color),
      backgroundColor: color(props.hoveredBackgroundColor),
      borderColor: color(props.color),
    }
  }
  return { 
    color: color(props.color),
    backgroundColor: color(props.backgroundColor),
    borderColor: color(props.color)
  }
})


</script>
<template>
    <a 
      :href
      :target
      @mouseover="hoverIn"
      @mouseleave="hoverOut"
      @focus="{}"
      @blur="{}"
      >
      <CssResetButton 
        class="link-button"
        v-bind="props"
        :style>
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