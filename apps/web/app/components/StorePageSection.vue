<script setup lang="ts">
import { useI18n } from '#imports'
import type { Product } from '@vuejs-jp/model'
import MarkDownText from '~/components/MarkDownText.vue'
import { storeUrl } from '~/utils/constants'

const { t } = useI18n()

const products: Product[] = [
  {
    src: 'store/vue-t-shirt.png',
    alt: '',
    name: t('store.tshirt'),
    price: '¥3,000',
    explain: 'store.tshirt_detail',
    color: t('color.white'),
    size: 'S / M / L / XL',
  },
  {
    src: 'store/vue-parka.png',
    alt: '',
    name: t('store.parka'),
    price: '¥6,000',
    explain: 'store.parka_detail',
    color: t('color.white'),
    size: 'S / M / L / XL',
  },
  {
    src: 'store/pin-badge.png',
    alt: '',
    name: t('store.pin_badge'),
    price: '¥500',
    explain: 'store.pin_badge_detail',
    size: 'W28～35×H25～28mm',
  },
  {
    src: 'store/sticker.png',
    alt: '',
    name: t('store.sticker'),
    price: '¥300',
    explain: `${t('store.sticker_type')}: Vue Fes Japan / Vue.js / Nuxt / Vite\n${t('store.sticker_detail')}`,
    size: 'W206×H118mm',
  },
  {
    src: 'store/kawaii-sticker.png',
    alt: '',
    name: t('store.kawaii_sticker'),
    price: '¥300',
    explain: 'store.kawaii_sticker_detail',
    size: 'W206×H118mm',
  },
  {
    src: 'store/towel.png',
    alt: '',
    name: t('store.towel'),
    price: '¥800',
    explain: 'store.towel_detail',
    size: 'W360×H360mm',
  },
  {
    src: 'store/2way-bag.png',
    alt: '',
    name: t('store.2way_bag'),
    price: '¥2,800',
    explain: 'store.2way_bag_detail',
    color: t('color.black'),
    size: 'W150～350×H190～330mm',
  },
  {
    src: 'store/bag-hangar.png',
    alt: '',
    name: t('store.bag_hanger'),
    price: '¥1,800',
    explain: 'store.bag_hanger_detail',
    size: 'W44×H44mm',
    weight: t('store.approximately_2_5kg'),
  },
  {
    src: 'store/strap-holder.png',
    alt: '',
    name: t('store.strap_holder'),
    price: '¥1,600',
    explain: 'store.strap_holder_detail',
    color: t('color.black'),
    size: 'W53xH31×D0.5mm',
    weight: t('store.approximately_5kg'),
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

        <div class="store-menu">
          <div v-for="product in products" :key="product.name" class="store-card">
            <VFProduct v-bind="product">
              <template #explain>
                <i18n-t :keypath="product.explain" tag="p" style="margin: 0;">
                  <template #kawaiiStickerCreator>
                    <a href="https://x.com/icarusgkx" target="_blank">Icarusさん</a>
                  </template>
                </i18n-t>
              </template>
            </VFProduct>
          </div>
          <p class="store-caution">{{ $t('store.caution') }}</p>
        </div>

        <div class="store-info">
          <div class="store-purchase">
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
  padding: var(--store-padding);
  background: rgba(255, 255, 255);
  backdrop-filter: blur(8px);
  &::before {
    content: "";
    position: absolute;
    display: block;
    inset: 0;
    width: 100%;
    height: 20%;
    background: url(/common/bg_pageheading_pc.jpg) no-repeat right center/cover;
    z-index: -10;
    background-position: 50% 0;
    opacity: 0.4;
    mix-blend-mode: cover;
  }
}

.store-root {
  --store-body-padding: calc(var(--unit) * 6) calc(var(--unit) * 7.5);

  padding: var(--store-body-padding);
}

.title {
  text-align: center;
  line-height: 1.2;
}

.store-body {
  display: flex;
  flex-direction: column;
  gap: calc(var(--unit) * 5);
  justify-content: center;
  margin: 0 auto;
  max-width: calc(960px + 6%);

  @media (--mobile) {
    gap: calc(var(--unit) * 2.5);
  }
}

.store-title {
  display: grid;
  gap: calc(8px * 3);
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
}

.store-caution {
  font-size: 16px;
  font-weight: 400;
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
      background-image: url(/common/bg_pageheading_sp.jpg);
    }
  }

  .store-root {
    --store-padding: calc(var(--unit) * 2) 0;
  }

  .store-body {
    --store-body-padding: calc(var(--unit) * 4) 4.5% calc(var(--unit) * 6);
  }
}

@media (--mobile) {
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
