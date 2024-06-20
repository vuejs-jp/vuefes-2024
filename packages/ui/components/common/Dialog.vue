<template>
  <div class="mask" @click="$emit('on-close')">
    <div class="root" role="document" @click="(e) => e.stopPropagation()">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.root {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 80%;
  max-width: 960px;
  transition: .2s;
  background-color: #fff;
}
.mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
