<script setup lang="ts">
import { computed } from 'vue'
import { NuxtLink } from '#components'

const emit = defineEmits(['click'])
const props = defineProps({
  secondary: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '',
  },
  rel: {
    type: String,
    default: 'noreferrer',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fixedWidth: {
    type: Boolean,
    default: false,
  },
})

const isLink = Boolean(props.href)
const isRouterLink = Boolean(props.to)
const myclass = computed(() => {
  const cls = ['button']
  if (props.secondary) {
    cls.push('-secondary')
  }
  if (props.disabled) {
    cls.push('-disabled')
  }
  if (props.fixedWidth) {
    cls.push('-fixedWidth')
  }
  return cls.join(' ')
})

const onClick = (e: Event) => {
  emit('click', e)
}

const tag = computed(() => {
  if (isRouterLink) {
    return NuxtLink
  }
  if (isLink) {
    return 'a'
  }
  return 'button'
})
const bindProps = computed(() => {
  if (isRouterLink) {
    return { to: props.to, }
  }
  if (isLink) {
    return {
      href: props.href,
      rel: props.rel,
      target: props.target,
    }
  }
  return {
    onClick,
  }
})
</script>


<template>
  <component
    :is="tag"
    :class="myclass"
    :disabled="props.disabled || null"
    :aria-disabled="props.disabled || null"
    v-bind="{ ...bindProps }">
    <span class="button-label">
      <slot />
    </span>
  </component>
</template>

<style scoped>
.button {
  display: inline-flex;
  justify-content: center;
  min-width: 198px;
  background: var(--color-vue-green-gradation);
  font-size: 18px;
  white-space: nowrap;
  border-radius: 40px;
  padding: 0;
  cursor: pointer;
  color: white;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  box-shadow: var(--box-shadow);
  font-family: 'din-2014',
    'Yu Gothic Medium',
    '游ゴシック体',
    YuGothic,
    '游ゴシック',
    'Yu Gothic',
    sans-serif;
}

.button:hover {
  background: white;
  color: var(--color-vue-green);
  box-shadow: var(--box-shadow), inset 0px 0px 0px 2px var(--color-vue-green);
}

.button.-fixedWidth {
  width: 100%;
  max-width: 260px;
}

.button.-secondary {
  background: white;
  box-shadow: var(--box-shadow), inset 0px 0px 0px 2px var(--color-vue-blue);
  color: var(--color-vue-blue);

  &:hover {
    background: var(--color-vue-blue);
    color: white;
    box-shadow: none;
  }
}

.button[disabled] {
  pointer-events: none;
  background: var(--color-disabled);
  box-shadow: var(--box-shadow);
  color: white;
}

.button.-secondary[disabled] {

  color: var(--color-disabled);
  box-shadow: var(--box-shadow), inset 0px 0px 0px 2px var(--color-disabled);
  background: white;
}

.button-label {
  padding: 24px 66px;
  line-height: 1;
}

@media (width <=768px) {

  .button,
  .button.-fixedWidth {
    width: 100%;
    max-width: none;
  }
}
</style>