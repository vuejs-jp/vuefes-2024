<script setup lang="ts">
import { ButtonHTMLAttributes, ref, computed } from 'vue'
import type { Color as ColorType, IconName } from '@vuejs-jp/model'
import { useColor } from '@vuejs-jp/composable'
import Icon from './icon/Icon.vue'

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
  <a
    :href
    :target
    :style
    class="button-link"
    @mouseover="hoverIn"
    @mouseleave="hoverOut"
    @focus="{}"
    @blur="{}"
  >
    <Icon v-if="props.iconName" :color="iconColor" :name="props.iconName" class="icon" />
    <slot />
  </a>
</template>

<style scoped>
.button-link {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 22px 66px;
  border-radius: 40px;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;
  border-style: solid;
}
.button-link:hover {
  transition: .2s;
}
.icon {
  margin-right: 8px;
}
</style>
