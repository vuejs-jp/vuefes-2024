<script setup lang="ts">
import { AnchorHTMLAttributes, ref, computed } from 'vue'
import type { Color as ColorType, IconName } from '@vuejs-jp/model'
import { useColor } from '@vuejs-jp/composable'
import Icon from '../icon/Icon.vue'

type _LinkButtonProps = Omit<AnchorHTMLAttributes, 'iconName'>
interface LinkButtonProps extends /* @vue-ignore */ _LinkButtonProps {
  backgroundColor: ColorType
  color: ColorType
  href: string
  target?: string
  iconName?: IconName
}
const props = withDefaults(defineProps<LinkButtonProps>(), {
  target: '_blank',
  iconName: undefined,
})

const { color: updateColor } = useColor()

const hover = ref(false)
const hoverIn = () => {
  hover.value = true
}
const hoverOut = () => {
  hover.value = false
}
const style = computed(() =>{
  if (hover.value) {
    return { 
      color: updateColor(props.backgroundColor),
      backgroundColor: updateColor(props.color),
      boxShadow: `0 2px 10px rgb(53, 73, 95, 0.14), inset 0px 0px 0px 2px ${updateColor(props.color)}`,
    }
  }
  return { 
    backgroundColor: updateColor(props.backgroundColor),
    color: updateColor(props.color),
    boxShadow: `0 2px 10px rgb(53, 73, 95, 0.14), inset 0px 0px 0px 2px ${updateColor(props.color)}`,
  }
})
const iconColor = computed(() =>{
  if (hover.value) {
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
    class="link-button"
    @mouseover="hoverIn"
    @mouseleave="hoverOut"
    @focus="() => {}"
    @blur="() => {}"
  >
    <Icon
      v-if="props.iconName"
      :color="iconColor"
      :name="props.iconName"
      :can-hover="false"
      class="icon"
    />
    <slot />
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
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 2px 10px rgb(53, 73, 95, 0.14);
}
.link-button:hover {
  transition: .2s;
}
.icon {
  margin-right: 8px;
}
</style>
