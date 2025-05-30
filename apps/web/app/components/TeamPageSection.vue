<script setup lang="ts">
import { team as teamData, volunteers } from '~/utils/constants'
import type { StaffCategory, StaffInfo } from '@vuejs-jp/model'
import { useRuntimeConfig } from '#imports'

type Staffs = Record<StaffCategory, StaffInfo>

const props = defineProps<{
  data: Staffs
}>()

const config = useRuntimeConfig()

const coreTeam =
  config.public.staffDatasource === 'supabase' ? props.data.coreStaffs.list : teamData
const volunteerTeam =
  config.public.staffDatasource === 'supabase'
    ? props.data.volunteerStaffs.list.map((staff) => staff.name)
    : volunteers
// const team = teamData
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
        <div v-for="member in coreTeam" :key="member.name" class="team-member-wrapper">
          <template v-if="member.x_id !== ''">
            <a
              :href="`https://x.com/${member.x_id}`"
              target="_blank"
              :aria-label="member.name"
              class="team-member-link"
            >
              <VFAvatar :src="member.image_url" :alt="member.name" size="medium" />
            </a>
            <div class="team-member-info">
              <VFTextLink
                class="team-member-name"
                target="_blank"
                :href="`https://x.com/${member.x_id}`"
                color="vue-blue"
              >
                {{ member.x_id ?? member.github_id }}
              </VFTextLink>
            </div>
          </template>
          <template v-else>
            <VFAvatar :src="member.image_url" :alt="member.name" size="medium" />
            <div class="team-member-info">
              <span class="team-member-name">{{ member.name }} </span>
            </div>
          </template>
        </div>
      </div>
    </article>

    <article class="volunteer-section-body">
      <VFTitle id="volunteer" class="volunteer-title">
        {{ $t('team.volunteer_title') }}
      </VFTitle>

      <div class="volunteer-members-container">
        <VFCreditList :list="volunteerTeam" />
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

.title,
.volunteer-title {
  text-align: center;
  line-height: 1.2;
}

.volunteer-section-body {
  max-width: 988px;
  margin: 0 auto;
  padding-top: calc(var(--unit) * 10);

  @media (--mobile) {
    padding-top: calc(var(--unit) * 5);
  }
}

.team-section-body,
.volunteer-section-body {
  display: flex;
  flex-direction: column;
  gap: 40px;
  isolation: isolate;
  align-items: center;
}

.team-section-text {
  --team-section-text-padding: 0 calc(var(--unit) * 10 + 6%);
  --team-section-text-font-size: 1.125rem;
  --team-section-text-font-weight: 500;

  padding: var(--team-section-text-padding);
  color: var(--color-vue-blue);
  font-size: var(--team-section-text-font-size);
  font-weight: var(--team-section-text-font-weight);
  line-height: 1.8;
}

.team-members-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 172px);
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

.team-member-link {
  width: 100%;
}

.team-member-name {
  --team-member-name-font-size: 0.875rem;

  font-size: var(--team-member-name-font-size);
  text-decoration: none;
}

.volunteer-members-container {
  --team-section-text-padding: 0 calc(var(--unit) * 10 + 6%);

  padding: var(--team-section-text-padding);
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
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    max-width: calc(130px * 3);
    column-gap: 15px;
    row-gap: 15px;
  }

  .team-member-wrapper {
    gap: 4px;
  }

  .team-member-name {
    --team-member-name-font-size: 0.75rem;
  }

  .volunteer-members-container {
    --team-section-text-padding: 0 4.5%;
  }
}
</style>
