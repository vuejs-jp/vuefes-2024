<script setup lang="ts">
import { useI18n, useRuntimeConfig } from '#imports'
import TicketSection from '~/components/ticket/TicketSection.vue'
import NamecardSection from '~/components/ticket/NamecardSection.vue'
import VolunteerSection from '~/components/ticket/VolunteerSection.vue'
import ChildCareSection from '~/components/ticket/ChildCareSection.vue'
import PersonalSponsorSection from '~/components/ticket/PersonalSponsorSection.vue'
import HandsonSection from '~/components/ticket/HandsonSection.vue'
import FaqSection from '~/components/ticket/FaqSection.vue'

const config = useRuntimeConfig()
const { locale } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="ticket">
    <TicketSection />
    <NamecardSection v-if="config.public.enableRegisterNamecard" />
    <VolunteerSection v-if="config.public.enableRegisterTicket && locale === 'ja'" />
    <ChildCareSection />
    <PersonalSponsorSection />
    <HandsonSection />
    <FaqSection />
  </div>
</template>

<style scoped>
.ticket {
  --ticket-padding: calc(var(--unit) * 5) 0;

  display: grid;
  place-items: center;
  background-image: url('/sponsor/sponsor-bg-grid.png'),
    linear-gradient(to bottom, #35495e, #353b5e);
  background-position: top -1px left -1px;
  background-size: 30px;
  background-blend-mode: overlay;
  padding: var(--ticket-padding);
  color: var(--color-vue-blue);
}

@media (--tablet) {
  .ticket {
    --ticket-padding: calc(var(--unit) * 2) 0;
  }
}
</style>
