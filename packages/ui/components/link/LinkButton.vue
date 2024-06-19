<script setup lang="ts">
import { AnchorHTMLAttributes, ref, computed } from 'vue'
import type { Color as ColorType, IconName } from '@vuejs-jp/model'
import { useColor, useTypography } from '@vuejs-jp/composable'
import Icon from '../icon/Icon.vue'

type _LinkButtonProps = Omit<AnchorHTMLAttributes, 'iconName'>
interface LinkButtonProps extends /* @vue-ignore */ _LinkButtonProps {
  is?: 'a' | 'button'
  backgroundColor: ColorType
  color: ColorType
  href?: string
  target?: string
  iconName?: IconName
}
const props = withDefaults(defineProps<LinkButtonProps>(), {
  is: 'a',
  href: '',
  target: '_blank',
  iconName: undefined,
})

const { color: updateColor } = useColor()
const { fontWeight } = useTypography()

const hover = ref(false)
const hoverIn = () => {
  hover.value = true
}
const hoverOut = () => {
  hover.value = false
}
const style = computed(() => {
  if (hover.value) {
    return {
      fontWeight: fontWeight('heading/200'),
      color: updateColor(props.backgroundColor),
      backgroundColor: updateColor(props.color),
      boxShadow: props.backgroundColor === 'white'
        ? '0 2px 10px rgba(53, 73, 94, 14%)'
        : `0 2px 10px rgb(53, 73, 95, 0.14), inset 0px 0px 0px 2px ${updateColor(props.backgroundColor)}`,
    }
  }
  return {
    fontWeight: fontWeight('heading/200'),
    backgroundColor: updateColor(props.backgroundColor),
    color: updateColor(props.color),
    boxShadow: props.backgroundColor === 'white'
      ? `0 2px 10px rgb(53, 73, 95, 0.14), inset 0px 0px 0px 2px ${updateColor(props.color)}`
      : '0 2px 10px rgba(53, 73, 94, 14%)',
  }
})
const iconColor = computed(() => {
  if (hover.value) {
    return props.backgroundColor
  }
  return props.color
})
</script>

<template>
  <component
    :is="is ?? 'a'"
    :href
    :target
    :style
    class="link-button"
    @mouseover="hoverIn"
    @mouseleave="hoverOut"
    @focus="hoverIn"
    @blur="hoverOut"
    ><Icon
      v-if="props.iconName"
      :color="iconColor"
      :name="props.iconName"
      :can-hover="false"
      class="icon"
    />
    <span class="text">
      <slot />
    </span>
  </component>
</template>

<style scoped>
.link-button {
  --icon-size: 22px;
  --height-button: 66px;

  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-color: transparent;
  border-radius: var(--height-button);
  text-decoration: none;
  cursor: pointer;
  box-shadow: var(--box-shadow-button);
}
.link-button:hover {
  transition: 0.2s;
}
.icon {
  margin-right: calc(var(--unit) * 1);
  width: var(--icon-size);
}
.text {
  font-size: var(--font-size-body400);
  line-height: var(--icon-size);
}

@media screen and (max-width: 768px) {
  .link-button {
    --icon-size: 17px;
  }
  .icon {
    margin-right: calc(var(--unit) * 0.5);
  }
  .text {
    font-size: var(--font-size-body200);
  }
}
</style>
