<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import TicketSection from '~/components/ticket/TicketSection.vue'
import NamecardSection from '~/components/ticket/NamecardSection.vue'
// import VolunteerSection from '~/components/ticket/VolunteerSection.vue'
import ChildCareSection from '~/components/ticket/ChildCareSection.vue'
import PersonalSponsorSection from '~/components/ticket/PersonalSponsorSection.vue'
import HandsonSection from '~/components/ticket/HandsonSection.vue'
import FaqSection from '~/components/ticket/FaqSection.vue'

const config = useRuntimeConfig()
</script>

<template>
  <section class="ticket">
    <TicketSection />
    <NamecardSection v-if="config.public.enableRegisterNamecard" />
    <!--
    <VolunteerSection v-if="config.public.enableRegisterTicket && locale === 'ja'" />
    -->
    <ChildCareSection />
    <HandsonSection />
    <HandsonSection />
    <PersonalSponsorSection />
    <FaqSection />
  </section>
</template>

<style scoped>
.ticket {
  --ticket-padding: calc(var(--unit) * 5) 0;

  display: flex;
  justify-content: center;
  flex-direction: column;
  place-items: center;
  background-image: url('/sponsor/sponsor-bg-grid.png'),
    linear-gradient(to bottom, #35495e, #353b5e);
  background-position: top -1px left -1px;
  background-size: 30px;
  background-blend-mode: color-dodge;
  padding: var(--ticket-padding);
  color: var(--color-vue-blue);
}

@media (--tablet) {
  .ticket {
    --ticket-padding: calc(var(--unit) * 2) 0;
  }
}
</style>
