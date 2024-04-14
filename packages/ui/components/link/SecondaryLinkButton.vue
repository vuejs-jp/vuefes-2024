<script setup lang="ts">
import { AnchorHTMLAttributes, ref, computed } from 'vue'
import type { IconName } from '@vuejs-jp/model'
import { useColor, useTypography } from '@vuejs-jp/composable'
import Icon from '../icon/Icon.vue'

type _SecondaryLinkButtonProps = Omit<AnchorHTMLAttributes, 'iconName'>
interface SecondaryLinkButtonProps extends /* @vue-ignore */ _SecondaryLinkButtonProps {
  href: string
  target?: string
  iconName?: IconName
}
const props = withDefaults(defineProps<SecondaryLinkButtonProps>(), {
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
  return {
    fontWeight: fontWeight('heading/200'),
    '--primaryColor': updateColor('white'),
    '--secondaryColor': updateColor('vue-blue-gradation'),
  }
})
const iconColor = computed(() => {
  if (hover.value) {
    return 'white'
  }
  return 'vue-blue-gradation'
})
</script>

<template>
  <a
    :href
    :target
    :style
    class="secondary-link-button"
    @mouseover="hoverIn"
    @mouseleave="hoverOut"
    @focus="hoverIn"
    @blur="hoverOut"
  >
    <span class="content">
      <Icon
        v-if="props.iconName"
        :color="iconColor"
        :name="props.iconName"
        :can-hover="false"
        class="icon"
      />
      <span class="text">
        <slot />
      </span>
    </span>
  </a>
</template>

<style scoped>
.secondary-link-button {
  --icon-size: 22px;
  --height-button: 66px;

  position: relative;
  padding: 2px;
  height: 100%;
  border-radius: var(--height-button);
  text-decoration: none;
  cursor: pointer;
  background: var(--secondaryColor);
  color: var(--secondaryColor);
  box-shadow: 0 2px 10px rgb(53, 73, 95, 0.14);
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: var(--height-button);
  text-align: center;
  background: var(--primaryColor);
  color: var(--secondaryColor);
}
.content:hover {
  background: var(--secondaryColor);
  color: var(--primaryColor);
  transition: 0.2s;
}
.icon {
  margin-right: calc(var(--unit) * 1);
  width: var(--icon-size);
  height: 100%;
}
.text {
  font-size: var(--font-size-body400);
  line-height: var(--icon-size);
}

@media screen and (max-width: 768px) {
  .secondary-link-button {
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
