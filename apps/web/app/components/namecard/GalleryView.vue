<script setup lang="ts">
import type { AttendeeInfo } from '@vuejs-jp/model'

const props = defineProps<{ attendees: AttendeeInfo }>()
</script>

<template>
  <div class="gallery">
    <div class="gallery-namecard-list">
      <VFNamecard24
        v-for="attendee in attendees.list"
        :key="attendee.id"
        :user="attendee"
        class="namecard-item"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('../../assets/base.css');
@import url('../../assets/media.css');

.gallery {
  margin: 0 auto;
  padding: 60px 0 120px;
  width: 100%;
  max-width: 1920px;
  height: 620px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  position: relative;
  overflow: hidden;

  @media (--tablet) {
    padding: 20px 0 60px;
    max-width: 100%;
  }

  a {
    border-radius: 12px;
    overflow: hidden;
    display: block;
  }
}

.gallery-namecard-list {
  display: flex;
  gap: 40px;
  position: absolute;
  top: 0;
  transform: translateX(100%);
  animation: marquee 120s linear infinite;

  @media (--mobile) {
    gap: 20px;
  }
}

.gallery-namecard-list:hover {
  animation-play-state: paused;
  cursor: default;
}

@keyframes marquee {
  0% {
    left: -100%;
    -moz-transform: translateX(0);
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  100% {
    left: 0;
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}
</style>
