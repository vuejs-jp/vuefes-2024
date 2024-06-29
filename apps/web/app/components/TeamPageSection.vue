<script setup lang="ts">
import { team } from '~/utils/constants'
</script>

<template>
  <section class="team-section">
    <article class="team-section-body">
      <VFTitle id="team" class="title">
        {{ $t('team.title') }}
      </VFTitle>

      <div class="team-section-text">
        <MarkDownText path="team" />
      </div>

      <div class="team-members-container">
        <div v-for="member in team" :key="member.name" class="team-member-wrapper">
          <VFAvatar :src="member.image" :alt="member.name" />
          <div class="team-member-info">
            <VFTextLink
              class="team-member-name"
              target="_blank"
              :href="member.snsLink"
              color="vue-blue"
              >{{ member.name }}
            </VFTextLink>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
@import url('~/assets/media.css');

.team-section {
  --team-section-padding: calc(var(--unit) * 7.5) 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--team-section-padding);
  color: var(--color-vue-blue);
  position: relative;
  background-image: linear-gradient(#ebf0f5, #fff);

  &::before {
    content: '';
    position: absolute;
    display: block;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: url('/form-bg.png');
    background-size: auto;
    background-repeat: repeat;
    background-position: top left;
    opacity: 0.8;
    mix-blend-mode: overlay;
  }
}

.title {
  text-align: center;
  line-height: 1.2;
}

.team-section-body {
  display: flex;
  flex-direction: column;
  gap: 40px;
  isolation: isolate;
}

.team-section-text {
  --team-section-text-padding: 0 calc(var(--unit) * 10 + 6%);
  --team-section-text-font-size: 1.125rem;
  --team-section-text-font-weight: 500;

  text-align: center;
  padding: var(--team-section-text-padding);
  color: var(--color-vue-blue);
  font-size: var(--team-section-text-font-size);
  font-weight: var(--team-section-text-font-weight);
  line-height: 1.8;
}

.team-members-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 170px);
  column-gap: 25px;
  row-gap: 32px;
  place-content: center;
}

.team-member-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.team-member-name {
  --team-member-name-font-size: 0.875rem;

  font-size: var(--team-member-name-font-size);
  text-decoration: none;
}

@media (--tablet) {
  .team-section-body {
    --team-section-body-padding: calc(var(--unit) * 4) 4.5% calc(var(--unit) * 6);
  }

  .team-section-text {
    --team-section-text-padding: 0 4.5%;
    --team-section-text-font-size: 1rem;
  }

  .team-members-container {
    grid-template-columns: repeat(auto-fill, 100px);
  }

  .team-member-wrapper {
    gap: 4px;
  }

  .team-member-name {
    --team-member-name-font-size: 0.75rem;
  }
}
</style>
