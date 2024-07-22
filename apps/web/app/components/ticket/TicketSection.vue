<script setup lang="ts"></script>

<template>
  <div class="ticket">
    <article class="ticket-body">
      <VFTitle color="white" class="title">
        {{ $t('ticket.title') }}
      </VFTitle>

      <div class="ticket-text">
        <MarkDownText path="ticket" />
      </div>

      <div class="ticket-button-wrapper">
        <VFLinkButton
          class="purchase-ticket-button"
          href="https://forms.gle/paxZqz55oXLE4Njn9"
          background-color="vue-green/200"
          color="white"
        >
          {{ $t('ticket.purchaseButton') }}
        </VFLinkButton>
      </div>

      <section class="ticket-cards">
        <h3 class="ticket-cards-title">
          {{ $t('ticket.ticketTypes') }}
        </h3>
        <div class="ticket-cards-container">
          <VFTicketCard :title="$t('ticket.card.ippan.title')" img-src="ticket/ippan.jpg">
            <div class="ticket-details ippan-details">
              <div class="early-purchase">
                <span class="cost">
                  {{ $t('ticket.card.ippan.early') }}
                </span>
                <span class="cost-details">
                  {{ $t('ticket.card.ippan.earlySub') }}
                </span>
              </div>
              <div class="standard-purchase">
                <span class="cost">
                  {{ $t('ticket.card.ippan.regular') }}
                </span>
              </div>
            </div>
          </VFTicketCard>
          <VFTicketCard
            :title="$t('ticket.card.ippanParty.title')"
            img-src="ticket/ippan-party.jpg"
          >
            <div class="ticket-details ippan-party-details">
              <div class="early-purchase">
                <span class="cost">
                  {{ $t('ticket.card.ippanParty.early') }}
                </span>
                <span class="cost-details">
                  {{ $t('ticket.card.ippanParty.earlySub') }}
                </span>
              </div>
              <div class="standard-purchase">
                <span class="cost">
                  {{ $t('ticket.card.ippanParty.regular') }}
                </span>
              </div>
            </div>
          </VFTicketCard>
          <VFTicketCard :title="$t('ticket.card.handsOn.title')" img-src="ticket/hands-on.jpg">
            <div class="ticket-details hands-on-details">
              <div class="cost">
                {{ $t('ticket.card.handsOn.cost') }}
              </div>
              <div class="cost-details">
                <span>
                  {{ $t('ticket.card.handsOn.details1') }}
                </span>
                <span>
                  {{ $t('ticket.card.handsOn.details2') }}
                </span>
              </div>
            </div>
          </VFTicketCard>
          <VFTicketCard
            :title="$t('ticket.card.individualSponsor.title')"
            img-src="ticket/individual-sponsor.jpg"
          >
            <div class="ticket-details individual-sponsor-details">
              <div class="cost">
                {{ $t('ticket.card.individualSponsor.cost') }}
              </div>
              <div class="cost-details">
                <span>
                  {{ $t('ticket.card.individualSponsor.details1') }}
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
            href="https://forms.gle/paxZqz55oXLE4Njn9"
            background-color="vue-green/200"
            color="white"
          >
            {{ $t('ticket.purchaseButton') }}
          </VFLinkButton>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.ticket {
  --sponsor-padding: calc(var(--unit) * 5.25) 0;
  --sponsor-body-padding: calc(var(--unit) * 6) calc(var(--unit) * 7.5);
  --sponsor-term-margin: calc(var(--unit) * 5) auto 0;

  display: flex;
  justify-content: center;
  background-image: url('/sponsor/sponsor-bg-grid.png'),
    linear-gradient(to bottom, #35495e, #353b5e);
  background-position: top -1px left -1px;
  background-size: 30px;
  background-blend-mode: overlay;
  padding: var(--sponsor-padding);
  color: var(--color-vue-blue);
}

.title {
  text-align: center;
  line-height: 1.2;
}

.ticket-body {
  margin: 0 auto;
  padding: var(--sponsor-body-padding);
  margin: 0 1.5%;
  max-width: 960px;
  width: 100%;
}

.ticket-text {
  margin-top: calc(var(--unit) * 4);
  line-height: 1.8;
  color: white;

  &::v-deep a {
    color: var(--color-vue-green200);
    text-decoration: underline;
  }

  &::v-deep a:hover {
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
  padding: 80px;
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
  .ticket-cards-container {
    grid-template-columns: repeat(1, auto);
  }

  .ticket {
    --sponsor-padding: calc(var(--unit) * 2) 0;
    --sponsor-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 6);
    --sponsor-term-margin: calc(var(--unit) * 5) auto 0;
  }

  .purchase-ticket-button {
    --height-button: 58px;
  }
}
</style>
