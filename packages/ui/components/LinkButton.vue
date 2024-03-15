<script setup lang="ts">
import { ButtonHTMLAttributes, ref, computed } from 'vue'
import CssResetButton from './CssResetButton.vue'
import Icon from './Icon.vue'
import type { Color as ColorType, IconName } from '@vuejs-jp/model'
import { useColor } from '@vuejs-jp/composable'

type _LinkButtonProps = Omit<ButtonHTMLAttributes, 'onClick'>
interface LinkButtonProps extends /* @vue-ignore */ _LinkButtonProps {
  backgroundColor: ColorType
  color: ColorType
  href: string
  target: string
  iconName: IconName
}
const props = defineProps<LinkButtonProps>()

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
      color: color(props.backgroundColor),
      backgroundColor: color(props.color),
      borderSize:'1px',
      borderColor:props.backgroundColor
    }
  }
  return { 
    backgroundColor: color(props.backgroundColor),
    color: color(props.color)
  }
})
const iconColor = computed(() =>{
  if (hover.value){
    return props.backgroundColor
  }
  return props.color
})
</script>

<template>
  <a :href="props.href" :target="target" @mouseover="hoverIn" @mouseleave="hoverOut" @focus="{}" @blur="{}">
    <CssResetButton 
      type="button"
      :style="style"
      class="link-button"
      :="props"
    >
      <Icon
        :color="iconColor"
        :name="props.iconName"
        class="icon"
      />
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
  padding: 22px 66px;
  border-radius: 40px;
  font-weight: bold;
  font-size: 20px;  
  cursor: pointer;
  border-style: solid;
}
.link-button:hover {
  transition: .2s;
}
.icon {
  margin-right: 8px;
}
</style>
