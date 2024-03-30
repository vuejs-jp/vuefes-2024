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
const style = computed(() => {
  if (hover.value) {
    return {
      color: updateColor(props.backgroundColor),
      backgroundColor: updateColor(props.color),
      boxShadow: `0 0 0 2px ${updateColor(props.backgroundColor)} inset`,
    }
  }
  return {
    backgroundColor: updateColor(props.backgroundColor),
    color: updateColor(props.color),
    boxShadow: `0 2px 10px rgb(53, 73, 95, 0.14), inset 0px 0px 0px 2px ${updateColor(props.color)}`,
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
  <a
    :href
    :target
    :style
    class="link-button"
    @mouseover="hoverIn"
    @mouseleave="hoverOut"
    @focus="hoverIn"
    @blur="hoverOut"
  >
    <div class="icon-wrapper">
      <Icon
        v-if="props.iconName"
        :color="iconColor"
        :name="props.iconName"
        :can-hover="false"
        class="icon"
      />
    </div>
    <span class="text">
      <slot />
    </span>
  </a>
</template>

<style scoped>
@import url('~/assets/media.css');

.link-button {
  --icon-wrapper-size: 22px;
  --height-button: 66px;

  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: var(--height-button);
  border-radius: var(--height-button);
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 2px 10px rgb(53, 73, 95, 0.14);
}
.link-button:hover {
  transition: 0.2s;
}
.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--icon-wrapper-size);
  height: var(--icon-wrapper-size);
  margin-right: calc(var(--unit) * 1);
}
.icon {
  transform-origin: center;
  transform: scale(0.77) translateY(0.02em);
}
.text {
  font-size: var(--font-size-body400);
  line-height: var(--icon-wrapper-size);
}

@media (--tablet) {
  .link-button {
    --icon-wrapper-size: 17px;
    --height-button: 49px;
  }
  .icon-wrapper {
    margin-right: calc(var(--unit) * 0.5);
  }
  .icon {
    transform: scale(0.6) translateY(0.02em);
  }
  .text {
    font-size: var(--font-size-body200);
  }
}
</style>
