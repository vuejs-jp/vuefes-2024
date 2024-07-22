<script setup lang="ts"></script>

<template>
  <div class="ticket">
    <article class="ticket-body">
      <VFTitle id="sponsors" color="white" class="title">
        {{ $t('ticket.title') }}
      </VFTitle>

      <div class="ticket-text">
        <MarkDownText path="ticket" />
      </div>

      <div class="sponsor-buttons">
        <!-- 申し込む -->
        <VFLinkButton
          class="sponsor-button"
          href="https://forms.gle/paxZqz55oXLE4Njn9"
          background-color="vue-green/200"
          color="white"
        >
          {{ $t('ticket.purchaseButton') }}
        </VFLinkButton>
      </div>

      <div class="ticket-cards-container">
        <VFTicketCard title="Regular" img-src="ticket/ippan.jpg">
          <div class="ippan-details">
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
        <VFTicketCard title="Regular + Party" img-src="ticket/ippan-party.jpg">
          <div class="ippan-party-details">
            <div class="early-purchase">
              <span class="cost">
                {{ $t('ticket.card.ippan-party.early') }}
              </span>
              <span class="cost-details">
                {{ $t('ticket.card.ippan-party.earlySub') }}
              </span>
            </div>
            <div class="standard-purchase">
              <span class="cost">
                {{ $t('ticket.card.ippan-party.regular') }}
              </span>
            </div>
          </div>
        </VFTicketCard>
        <VFTicketCard title="Hands On" img-src="ticket/hands-on.jpg">
          <div class="hands-on-details">
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
        <VFTicketCard title="Individual Sponsor" img-src="ticket/individual-sponsor.jpg">
          <div class="individual-sponsor-details">
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

.ticket-cards-container {
  display: grid;
  column-gap: 25px;
  row-gap: 32px;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  padding: 40px 0;
}

.sponsor-subtitle {
  text-align: center;
  line-height: 1.2;
  margin-top: calc(var(--unit) * 5);
  margin-bottom: calc(var(--unit) * 2.5);
  background: var(--color-vue-green-gradation);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.sponsor-subtitle-category {
  text-align: center;
  line-height: 1.2;
  margin-top: calc(var(--unit) * 2.5);
  margin-bottom: calc(var(--unit) * 0.625);
}

.sponsor-term {
  display: block;
  margin: var(--sponsor-term-margin);
}

.sponsor-buttons {
  display: flex;
  justify-content: center;
  margin-top: calc(var(--unit) * 5);
}

.sponsor-button {
  --height-button: 66px;

  width: 100%;
  max-width: 260px;
  height: var(--height-button);
  border-radius: var(--height-button);
}

.sponsor-list-layout-separate {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

@media (--tablet) {
  .sponsor {
    --sponsor-padding: calc(var(--unit) * 2) 0;
    --sponsor-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 6);
    --sponsor-term-margin: calc(var(--unit) * 5) auto 0;
  }

  .sponsor-subtitle {
    margin-top: calc(var(--unit) * 3.75);
  }

  .sponsor-buttons {
    margin-top: calc(var(--unit) * 3.75);
    display: block;
  }

  .sponsor-button:first-child {
    margin-bottom: calc(var(--unit) * 2);
  }

  .sponsor-button {
    --height-button: 58px;

    width: 100%;
    max-width: none;
  }
  .sponsor-list-layout-separate {
    display: contents;
  }
}

@media (--mobile) {
  .sponsor-button {
    --height-button: 58px;
  }
}
</style>
