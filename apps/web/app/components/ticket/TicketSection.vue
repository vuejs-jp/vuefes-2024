<script setup lang="ts">
import { useI18n } from '#imports'
import { endedApplyEarly, endedApplyHandson, endedApplyNormal, ticketUrl } from '~/utils/constants'

const { t } = useI18n()

const ticketCards = {
  ippan: {
    title: t('ticket.card.ippan.title'),
    imgSrc: '/ticket/ippan.png',
    imgAlt: t('ticket.card.ippan.imgAlt'),
  },
  ippanParty: {
    title: t('ticket.card.ippanParty.title'),
    imgSrc: '/ticket/ippan-party.png',
    imgAlt: t('ticket.card.ippanParty.imgAlt'),
  },
  handsOn: {
    title: t('ticket.card.handsOn.title'),
    imgSrc: '/ticket/hands-on.png',
    imgAlt: t('ticket.card.handsOn.imgAlt'),
  },
  individualSponsor: {
    title: t('ticket.card.individualSponsor.title'),
    imgSrc: '/ticket/individual-sponsor.png',
    imgAlt: t('ticket.card.individualSponsor.imgAlt'),
  },
}
</script>

<template>
  <article class="ticket-body">
    <VFTitle id="ticket" color="white" class="title">
      {{ $t('ticket.title') }}
    </VFTitle>

    <div class="ticket-text">
      <MarkDownText path="ticket" />
    </div>

    <div class="ticket-button-wrapper">
      <VFLinkButton
        class="purchase-ticket-button"
        :href="ticketUrl"
        background-color="vue-green/200"
        color="white"
        :disabled="endedApplyNormal"
      >
        {{ $t('ticket.purchaseButton') }}
      </VFLinkButton>
    </div>

    <section class="ticket-cards">
      <h3 class="ticket-cards-title">
        {{ $t('ticket.ticketTypes') }}
      </h3>
      <div class="ticket-cards-container">
        <VFTicketCard
          :title="ticketCards.ippan.title"
          :img-src="ticketCards.ippan.imgSrc"
          :img-alt="ticketCards.ippan.imgAlt"
          :is-close="endedApplyNormal"
        >
          <div class="ticket-details ippan-details">
            <div v-if="!endedApplyEarly" class="early-purchase">
              <span class="cost">
                {{ $t('ticket.card.ippan.early') }}
              </span>
              <span class="cost-details">
                {{ $t('ticket.card.ippan.earlySub') }}
              </span>
            </div>
            <div v-else class="early-purchase">
              <span class="cost">
                <template v-if="!endedApplyNormal">{{ $t('ticket.card.ippan.regular') }}</template>
                <s v-else>{{ $t('ticket.card.ippan.regular') }}</s>
              </span>
              <span class="cost-details">
                <span v-if="endedApplyNormal">
                  {{ $t('ticket.ended_explain') }}
                </span>
              </span>
            </div>
          </div>
        </VFTicketCard>
        <VFTicketCard
          :title="ticketCards.ippanParty.title"
          :img-src="ticketCards.ippanParty.imgSrc"
          :img-alt="ticketCards.ippanParty.imgAlt"
          :is-close="endedApplyNormal"
        >
          <div class="ticket-details ippan-party-details">
            <div v-if="!endedApplyEarly" class="early-purchase">
              <span class="cost">
                {{ $t('ticket.card.ippanParty.early') }}
              </span>
              <span class="cost-details">
                {{ $t('ticket.card.ippanParty.earlySub') }}
              </span>
            </div>
            <div v-else class="early-purchase">
              <span class="cost">
                <template v-if="!endedApplyNormal">{{ $t('ticket.card.ippanParty.regular') }}</template>
                <s v-else>{{ $t('ticket.card.ippanParty.regular') }}</s>
              </span>
              <span class="cost-details">
                <span v-if="endedApplyNormal">
                  {{ $t('ticket.sold_out_explain') }}
                </span>
              </span>
            </div>
          </div>
        </VFTicketCard>
        <VFTicketCard
          :title="ticketCards.handsOn.title"
          :img-src="ticketCards.handsOn.imgSrc"
          :img-alt="ticketCards.handsOn.imgAlt"
          :is-close="endedApplyHandson"
        >
          <div class="ticket-details hands-on-details">
            <div class="cost">
              <template v-if="!endedApplyHandson">{{ $t('ticket.card.handsOn.cost') }}</template>
              <s v-else>{{ $t('ticket.card.handsOn.cost') }}</s>
            </div>
            <div class="cost-details">
              <span v-if="!endedApplyHandson">
                {{ $t('ticket.card.handsOn.details1') }}
              </span>
              <span v-else>
                {{ $t('ticket.sold_out_explain') }}
              </span>
              <span>
                {{ $t('ticket.card.handsOn.details2') }}
              </span>
            </div>
          </div>
        </VFTicketCard>
        <VFTicketCard
          :title="ticketCards.individualSponsor.title"
          :img-src="ticketCards.individualSponsor.imgSrc"
          :img-alt="ticketCards.individualSponsor.imgAlt"
          :is-close="endedApplyNormal"
        >
          <div class="ticket-details individual-sponsor-details">
            <div class="cost">
              <template v-if="!endedApplyNormal">{{ $t('ticket.card.individualSponsor.cost') }}</template>
              <s v-else>{{ $t('ticket.card.individualSponsor.cost') }}</s>
            </div>
            <div class="cost-details">
              <span v-if="!endedApplyNormal">
                {{ $t('ticket.card.individualSponsor.details1') }}
              </span>
              <span v-else>
                {{ $t('ticket.ended_explain') }}
              </span>
              <span>
                {{ $t('ticket.card.individualSponsor.details2') }}
              </span>
            </div>
          </div>
        </VFTicketCard>
      </div>
      <div class="ticket-button-wrapper">
        <VFLinkButton
          class="purchase-ticket-button"
          :href="ticketUrl"
          background-color="vue-green/200"
          color="white"
          :disabled="endedApplyNormal"
        >
          {{ $t('ticket.purchaseButton') }}
        </VFLinkButton>
      </div>
    </section>
  </article>
</template>

<style scoped>
@import url('~/assets/media.css');

.title {
  text-align: center;
  line-height: 1.2;
}

.ticket-body {
  --ticket-body-padding: calc(var(--unit) * 6) calc(var(--unit) * 7.5);

  margin: 0 auto;
  padding: var(--ticket-body-padding);
  padding-bottom: 0;
  max-width: 960px;
  width: 100%;
}

.ticket-text {
  margin-top: calc(var(--unit) * 4);
  line-height: 1.8;
  color: white;

  &::v-deep(a) {
    color: var(--color-vue-green200);
    text-decoration: underline;
  }

  &::v-deep(a:hover) {
    opacity: 0.4;
    transition: 0.2s;
  }

  &:deep(p) {
    --body-p-margin-bottom: calc(var(--unit) * 4);

    margin-bottom: var(--body-p-margin-bottom);
  }
}

.ticket-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 80px 0 80px;
}

.ticket-cards-title {
  color: white;
  font-weight: 700;
  font-size: 36px;
}

.ticket-cards-container {
  display: grid;
  column-gap: 25px;
  row-gap: 32px;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  padding: 40px 0;
}

.ticket-details,
.early-purchase {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ticket-details {
  gap: 8px;
}

.cost {
  font-weight: 700;
  font-size: 32px;
}

.cost-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;
}

.ticket-button-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.purchase-ticket-button {
  --height-button: 66px;

  width: 100%;
  max-width: 260px;
  height: var(--height-button);
  border-radius: var(--height-button);
}

@media (--tablet) {
  .ticket-body {
    --ticket-body-padding: calc(var(--unit) * 3) 6%;
  }

  .ticket-cards-title {
    font-size: 24px;
  }

  .ticket-cards-container {
    grid-template-columns: repeat(1, auto);
  }

  .purchase-ticket-button {
    --height-button: 58px;
  }
}
</style>
