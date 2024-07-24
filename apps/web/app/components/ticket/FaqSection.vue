<script setup lang="ts"></script>

<template>
  <article class="faq-body">
    <h3 id="faq">{{ 'FAQ' }}</h3>
    <div class="faq-body-text">
      <MarkDownText path="faq" />
    </div>
  </article>
</template>

<style scoped>
@import url('~/assets/media.css');

.faq-body {
  --faq-body-padding: calc(var(--unit) * 6) calc(var(--unit) * 7.5);

  margin: 0 auto;
  padding: var(--faq-body-padding);
  margin: 0 1.5%;
  max-width: 960px;
  width: 100%;
}

.faq-body h3 {
  text-align: center;
  color: var(--color-white);
  font-size: 36px;
  font-weight: 700;
}

.faq-body-text {
  margin-top: calc(var(--unit) * 4);
  line-height: 1.8;
  color: white;

  &::v-deep h4 {
    --body-h4-margin-bottom: calc(var(--unit) * 1.5);

    font-size: 18px;
    font-weight: 700;
    margin-bottom: var(--body-h4-margin-bottom);
  }

  &::v-deep a {
    color: var(--color-white);
    text-decoration: underline;
  }

  &::v-deep a:hover {
    opacity: 0.4;
    transition: 0.2s;
  }

  &:deep(p) {
    --body-p-margin-bottom: calc(var(--unit) * 1.5);
    font-size: 18px;
    font-weight: 500;

    margin-bottom: var(--body-p-margin-bottom);
  }

  &::v-deep ul {
    --body-p-margin-bottom: calc(var(--unit) * 1.5);

    list-style-type: disc;
    margin-bottom: var(--body-p-margin-bottom);
  }
}

@media (--tablet) {
  .faq {
    --faq-body-padding: calc(var(--unit) * 4) calc(var(--unit) * 2) calc(var(--unit) * 6);
  }

  .faq-body-text {
    &::v-deep h4 {
      font-size: 20px;
      font-weight: 500;
    }
  }
}

@media (--mobile) {
  .faq h3 {
    font-size: 32px;
  }
  
  .faq p {
    font-size: 16px;
  }
}
</style>
