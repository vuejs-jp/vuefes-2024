<script setup lang="ts">
import { useI18n } from '#imports'
import type { Product } from '@vuejs-jp/model'
import MarkDownText from '~/components/MarkDownText.vue'
import { storeUrl } from '~/utils/constants'

const { t } = useI18n()

// TODO: Replace with actual product data
const products: Product[] = [
  {
    src: 'store/vue-t-shirt.png',
    alt: '',
    name: t('store.tshirt'),
    price: '¥2,500',
    explain: t('store.tshirt_detail'),
    color: 'ネイビー',
    size: 'S / M / L / XL',
  },
  {
    src: 'store/vue-parka.png',
    alt: '',
    name: t('store.parka'),
    price: '¥5,500',
    explain: t('store.parka_detail'),
    color: 'グレー',
    size: 'S / M / L / XL',
  },
  {
    src: 'store/vue-badge.png',
    alt: '',
    name: t('store.vue_badge'),
    price: '¥600',
    explain: t('store.vue_badge_detail'),
    size: 'W19×H17mm',
  },
  {
    src: 'store/nuxt-badge.png',
    alt: '',
    name: t('store.nuxt_badge'),
    price: '¥600',
    explain: t('store.nuxt_badge_detail'),
    size: 'W19×H14mm',
  },
  {
    src: 'store/vite-badge.png',
    alt: '',
    name: t('store.vite_badge'),
    price: '¥600',
    explain: t('store.vite_badge_detail'),
    size: 'W18×H18mm',
  },
  {
    src: 'store/vue-sticker.png',
    alt: '',
    name: t('store.sticker'),
    price: '¥300',
    explain: t('store.sticker_detail'),
    size: 'W200×H122mm',
  },
  {
    src: 'store/vue-cushion.png',
    alt: '',
    name: t('store.cushion'),
    price: '¥5,000',
    explain: t('store.cushion_detail'),
    size: 'W360×H360mm',
  },
  {
    src: 'store/vue-tape.png',
    alt: '',
    name: t('store.tape'),
    price: '¥1,100',
    explain: t('store.tape_detail'),
    size: 'W15mm',
  },
]
</script>

<template>
  <section>
    <div class="store-root">
      <div class="store-body">
      <div class="store-title">
        <VFComment :title="$t('store.do_again_this_year')" />
        <VFTitle id="store" class="title">
          Vue Fes Store
        </VFTitle>
        <div class="explain">
          <MarkDownText path="store" />
        </div>
      </div>

      <div class="store-menu">
        <div v-for="product in products" :key="product.name" class="store-card">
          <VFProduct v-bind="product" />
        </div>
      </div>

      <div class="store-info">
        <div class="store-purchase">
          <div class="sub-title">
            <h6>{{ $t('store.payment_method') }}</h6>
            <p>{{ $t('store.payment_method_explain') }}</p>
          </div>
          <div class="pre-order">
            <MarkDownText path="store_preorder" />
          </div>
          <div class="button">
            <VFLinkButton
              :href="storeUrl"
              target="_blank"
              rel="noreferrer"
              background-color="vue-green/200"
              color="white"
            >
              {{ $t('store.preorder') }}
            </VFLinkButton>
          </div>
          <div class="same-day-sales">
            <MarkDownText path="store_samedaysales" />
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<style scoped>
@import url('~/assets/media.css');

section {
  --store-padding: calc(var(--unit) * 7.5) 0;

  position: relative;
  padding: var(--store-padding) 0;
  background: rgba(255, 255, 255);
  backdrop-filter: blur(8px);
  &::before {
    content: "";
    position: absolute;
    display: block;
    inset: 0;
    width: 100%;
    height: 20%;
    background-image: url('/main-visual.png');
    background-size: 100% auto;
    z-index: -10;
    background-position: 50% 0;
    opacity: 0.4;
    mix-blend-mode: cover;
  }
}

.store-root {
  --store-padding: calc(var(--unit) * 7.5) 0;

  --store-body-padding: calc(var(--unit) * 6) calc(var(--unit) * 7.5);

  padding: var(--store-padding) 0;
  display: flex;
  flex-direction: column;
  gap: calc(8px * 10);
  justify-content: center;
}

.title {
  text-align: center;
  line-height: 1.2;
}

.store-body {
  margin: 0 auto;
  max-width: calc(960px + 6%);
}

.store-title {
  display: grid;
  gap: calc(8px * 3);
  text-align: center;
  margin: calc(-8px * 8) auto 0;
  max-width: 760px;
}

.store-title h3 {
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
}

.explain {
  max-width: 760px;
  display: flex;
  justify-content: center;
}

.explain p {
  line-height: 1.8;
  text-align: left;
  margin-bottom: 2em;
}

.store-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
}

.store-info {
  display: flex;
  justify-content: center;
}

.store-purchase {
  display: flex;
  flex-direction: column;
  max-width: 768px;
  gap: 2em;
}

.store-purchase h6 {
  font-size: 22px;
  font-weight: bold;
  line-height: 1;
}

.sub-title {
  display: grid;
  gap: calc(8px * 1);
}

.pre-order,
.same-day-sales {
  display: grid;
  gap: calc(8px * 1);
}

.pre-order p,
.same-day-sales p {
  text-align: left;
}

.button {
  display: block;
  width: 100%;
  max-width: 260px;
  margin: 0 auto;
}
.button a {
  --height-button: 66px;

  height: var(--height-button);
}

@media (--tablet) {
  section {
    &::before {
      height: 10%;
    }
  }

  .store-root {
    --store-padding: calc(var(--unit) * 2) 0;
  }

  .store-body {
    --store-body-padding: calc(var(--unit) * 4) 4.5% calc(var(--unit) * 6);
  }
}

@media (max-width: 480px) {
  section {
    &::before {
      height: 5%;
    }
  }

  .store-root {
    padding: 20px;
    gap: calc(8px * 0);
  }

  .store-title h3 {
    font-size: 24px;
  }
}
</style>
