<script setup lang="ts">
// import PolygonSvg from '~/assets/sponsor/polygon.svg'

interface MeritProps {
  id?: number
  title: string
  detail: string
  caution?: string
}

const props = defineProps<MeritProps>()
</script>

<template>
  <div class="merit">
    <div class="merit-card">
      <!--
      <div class="merit-id">
        {{ id }}
      </div>
      <div class="polygon">
        <PolygonSvg />
      </div>
      -->
      <div class="image">
        <slot />
      </div>
    </div>
    <div class="merit-item">
      <h4>{{ title }}</h4>
      <p class="detail">{{ detail }}</p>
      <p class="caution">{{ caution }}</p>
    </div>
  </div>
</template>

<style scoped>
.merit {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: calc(var(--unit) * 2);
  min-height: 150px;
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

/*.merit-id {
  position: absolute;
  top: 2%;
  left: 2%;
  z-index: 1;
  color: var(--color-white);
  font-size: 18px;
  font-weight: 800;
}

.polygon {
  position: absolute;
  top: 0;
  left: 0;
}

.polygon ::v-deep(svg) {
  width: 80px;
  height: 80px;
}*/

.image {
  text-align: center;
}

.image ::v-deep(svg) {
  width: 160px;
}

.image ::v-deep(a) {
  display: block;
  width: 300px;
  margin: 0 auto;
  background: var(--color-vue-blue);
  color: var(--color-white);
  padding: calc(var(--unit) * 1) 0;
  border-radius: calc(var(--unit) * 6.25);
}

.merit-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.merit-item ::v-deep(h4) {
  font-size: 24px;
  font-weight: 800;
}

.detail {
  font-size: 16px;
  font-weight: 500;
  white-space: pre-wrap;
}

.caution {
  font-size: 12px;
  font-weight: 500;
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
    width: 114px;
    height: 83px;
  }

  /*.merit-id {
    font-size: 14px;
  }

  .polygon ::v-deep(svg) {
    width: 48px;
    height: 48px;
  }*/

  .image ::v-deep(img) {
    width: 100%;
  }

  .image ::v-deep(svg) {
    width: 40px;
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
