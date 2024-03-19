<script setup lang="ts">
import { ButtonHTMLAttributes } from 'vue'
import CssResetButton from './CssResetButton.vue'

type _LinkButtonProps = Omit<ButtonHTMLAttributes, 'disabled' | 'onClick'>
interface LinkButtonProps extends /* @vue-ignore */ _LinkButtonProps {
  url: string,
}

const props = defineProps<LinkButtonProps>()

const isExternal = computed(() => props.url.match(/^https?:\/\//))

</script>

<template>
    <a v-if="isExternal" :href="props.url" class="anchor-root" target="_blank" rel="noreferrer">
      <CssResetButton 
        type="button"
        class="link-button"
        v-bind="props">
        <slot />
      </CssResetButton>
    </a>
    <nuxt-link v-else :to="props.url" class="anchor-root">
      <CssResetButton 
      type="button"
      class="link-button"
      v-bind="props">
        <slot />
      </CssResetButton>
    </nuxt-link>
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
  background-color: var(--color-white);
  border: 2px solid var(--color-vue-blue);
  box-shadow: none;
  color: var(--color-vue-blue);

  &:hover {
    background-color: var(--color-vue-blue-hover);
    transition: 0.2s;
    opacity: 0.4;
  }
}
</style>