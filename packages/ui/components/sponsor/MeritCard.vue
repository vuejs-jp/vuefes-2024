<script setup lang="ts">
interface MeritProps {
  title: string
  detail: string
  caution?: string
}

const props = defineProps<MeritProps>()
</script>

<template>
  <div class="merit">
    <div class="merit-card">
      <slot />
    </div>
    <div class="merit-item">
      <h4 class="merit-title">{{ title }}</h4>
      <p class="detail">{{ detail }}</p>
      <p class="caution">{{ caution }}</p>
    </div>
  </div>
</template>

<style scoped>
.merit {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: calc(var(--unit) * 3);
}

.merit-card {
  width: 224px;
  height: 126px;
  object-fit: cover;
}

.merit-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.merit-item ::v-deep(h4) {
  font-size: 24px;
  font-weight: 800;
}

.merit-title {
  margin-bottom: 8px;
}

.detail {
  font-size: 16px;
  white-space: pre-wrap;
}

.caution {
  font-size: 12px;
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .merit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .merit-card {
    width: 100%;
    height: auto;
    max-width: 232px;
  }

  .merit-item ::v-deep(h4) {
    font-size: 18px;
    line-height: 1.3;
    text-align: center;
  }

  .detail {
    line-height: 1.5;
    margin-top: calc(var(--unit) * 1);
    text-align: center;
  }

  .caution {
    line-height: 1.5;
    margin-top: calc(var(--unit) * 1);
    text-align: center;
  }
}
</style>
