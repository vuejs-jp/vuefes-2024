<script setup lang="ts">
import NamecardAvatar from './NamecardAvatar.vue'
import type { NamecardUser } from '@vuejs-jp/model'
import { defineAsyncComponent } from 'vue'

type NamecardProps = {
  user: NamecardUser
  opacity?: number
}

const props = withDefaults(defineProps<NamecardProps>(), {
  opacity: 1,
})

const SpBlock = defineAsyncComponent(() => import('../../assets/namecard/2023/pc/block.svg?component'))
const Hook = defineAsyncComponent(() => import('../../assets/namecard/2023/hook.svg?component'))
const Sponsor = defineAsyncComponent(() => import('../../assets/namecard/2023/sponsor.svg?component'))
const NamecardTitle1 = defineAsyncComponent(() => import('../../assets/namecard/2023/title1.svg?component'))
const NamecardTitle2 = defineAsyncComponent(() => import('../../assets/namecard/2023/title2.svg?component'))
const VueFesLogo = defineAsyncComponent(() => import('../../assets/namecard/2023/vuefes_logo.svg?component'))
const SpBg = defineAsyncComponent(() => import('../../assets/namecard/2023/pc/wave.svg?component'))
</script>

<template>
  <div class="namecard-root" :style="{ opacity }">
    <div class="components-wrapper">
      <component :is="VueFesLogo" class="vuefes" />
      <component :is="Hook" class="hook" />
      <component :is="SpBg" class="wave-bg" />
      <component :is="NamecardTitle1" class="title-bg1" />
      <component :is="NamecardTitle2" class="title-bg2" />
      <component :is="Sponsor" class="sponsor" />
      <component :is="SpBlock" class="block-bg" />
    </div>
    <div class="avatar-wrapper">
      <h2>Hello!! I am</h2>
      <NamecardAvatar :user="user" />
    </div>
  </div>
</template>

<style scoped>
.namecard-root {
  position: relative;
  background-color: var(--color-vue-blue);
  width: 319px;
  height: 502px;
  border-radius: calc(var(--unit) * 2.25);
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
  transform: translate(-50%, 0);
  width: 60%;
  height: 20%;
  z-index: 2;
}

.title-bg2 {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 30%;
  height: 12%;
  z-index: 2;
}

.sponsor {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 60%;
  height: 10%;
  z-index: 2;
}

.vuefes {
  position: absolute;
  top: 1%;
  left: 4%;
  width: 8%;
  height: 8%;
  z-index: 2;
}

.hook {
  position: absolute;
  top: 2%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 20%;
  height: 16%;
  z-index: 2;
}

.avatar-wrapper {
  display: grid;
  place-items: center;
  gap: calc(var(--unit) * 1);
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  position: absolute;
  z-index: 3;
}

.avatar-wrapper h2 {
  color: var(--color-white);
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
