<script setup lang="ts">
interface TicketCardProps {
  title: string
  imgSrc: string
  alt: string
}
const props = defineProps<TicketCardProps>()
</script>

<template>
  <div class="ticket-card">
    <img class="ticket-img" :src="props.imgSrc" alt="props.alt" />
    <div class="ticket-title">{{ props.title }}</div>
    <div class="ticket-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ticket-card {
  width: 464px;
  height: 456px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.ticket-img {
  height: 260px;
  object-fit: cover;
}

.ticket-title {
  position: absolute;
  height: 50px;
  background-color: #35495e;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 10%);
  padding: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 336px;
}

.ticket-content {
  background-color: #e7eff7;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
