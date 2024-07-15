<script setup lang="ts">
import type { NamecardUser } from '@vuejs-jp/model'
import NamecardAvatar from './NamecardAvatar.vue'
import { defineAsyncComponent } from 'vue'

type OgCardProps = {
  user: NamecardUser
  opacity?: number
}

const props = withDefaults(defineProps<OgCardProps>(), {
  opacity: 1,
})

const PcBlock = defineAsyncComponent(() => import('../../assets/namecard/2023/pc/block.svg?component'))
const NamecardTitle1 = defineAsyncComponent(() => import('../../assets/namecard/2023/title1.svg?component'))
const NamecardTitle2 = defineAsyncComponent(() => import('../../assets/namecard/2023/title2.svg?component'))
const Sponsor = defineAsyncComponent(() => import('../../assets/namecard/2023/sponsor.svg?component'))
const VueFesLogo = defineAsyncComponent(() => import('../../assets/namecard/2023/vuefes_logo.svg?component'))
const PcBg = defineAsyncComponent(() => import('../../assets/namecard/2023/pc/wave.svg?component'))
</script>

<template>
  <div class="og-card-root">
    <div class="components-wrapper">
      <component :is="VueFesLogo" class="vuefes" />
      <component :is="PcBg" class="wave-bg" />
      <component :is="NamecardTitle1" class="title-bg1" />
      <component :is="NamecardTitle2" class="title-bg2" />
      <component :is="Sponsor" class="sponsor" />
      <component :is="PcBlock" class="block-bg" />
    </div>
    <div class="avatar-wrapper">
      <h2>Hello!! I am</h2>
      <NamecardAvatar :user="user" use-share />
    </div>
  </div>
</template>

<style scoped>
.og-card-root {
  position: relative;
  background-color: var(--color-vue-blue);
  width: 1200px;
  height: 630px;
}

.components {
  width: 100%;
  height: 100%;
}

.components-wrapper {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
}

.wave-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.block-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0.6;
}

.title-bg1 {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24%;
  height: 32%;
  z-index: 3;
}

.title-bg2 {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 8%;
  height: 24%;
  z-index: 3;
}

.sponsor {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 12%;
  z-index: 3;
}

.vuefes {
  position: absolute;
  top: 2%;
  left: 50%;
  transform: translateX(-50%);
  width: 4%;
  height: 4%;
  z-index: 2;
}

.avatar-wrapper {
  display: grid;
  place-items: center;
  gap: calc(var(--unit) * 1);
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  position: absolute;
  z-index: 3;
}

.avatar-wrapper h2 {
  color: var(--color-white);
  font-size: 36px;
  font-weight: 700;
  text-transform: uppercase;
}
</style>