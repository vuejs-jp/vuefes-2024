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
      <div class="image">
        <slot />
      </div>
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
  position: relative;
  display: grid;
  place-items: center;
  padding-bottom: calc(var(--unit) * 1);
  width: 224px;
  height: 126px;
  background: var(--color-white);
}

.image {
  text-align: center;
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
    width: 343px;
    height: 228px;
  }

  .image {
    margin: 0 auto;
    width: 343px;
    display: flex;
    justify-content: center;
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
