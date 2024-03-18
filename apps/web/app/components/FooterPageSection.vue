<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'

//#region types
type LinkList = {
  href: string
  text: string
}
//#endregion

//#region composable
const { color } = useColor()
const { fontSize } = useTypography()
//#endregion

//#region private variables
const snsLinkList: LinkList[] = [
  {
    href: 'https://twitter.com/vuefes',
    text: 'x',
  },
  {
    href: 'https://note.com/vuejs_jp/',
    text: 'note',
  },
  {
    href: 'https://www.youtube.com/channel/UC6KPwA1kZJtQYdlh8_2hxCA',
    text: 'YouTube',
  },
  {
    href: 'https://github.com/vuejs-jp',
    text: 'GitHub',
  },
]
const internalLinkList: LinkList[] = [
  {
    href: '/privacy',
    text: 'プライバシーポリシー',
  },
  {
    href: '/conduct',
    text: '行動規範',
  },
]
const vueFesLinkList: LinkList[] = [
  {
    href: 'https://vuefes.jp/2023/',
    text: 'Vue Fes Japan 2023',
  },
  {
    href: 'https://vuefes.jp/2022/',
    text: 'Vue Fes Japan Online 2022',
  },
  {
    href: 'https://vuefes.jp/2020/',
    text: 'Vue Fes Japan 2020',
  },
  {
    href: 'https://vuefes.jp/2019/',
    text: 'Vue Fes Japan 2019',
  },
  {
    href: 'https://vuefes.jp/2018/',
    text: 'Vue Fes Japan 2018',
  },
]
//#endregion
</script>

<template>
  <footer id="footer">
    <div class="footer-container footer-main">
      <div class="footer-information">
        <VFLogo color="white" />
        <ul class="footer-list footer-sns-list">
          <li v-for="(link, index) in snsLinkList" :key="index">
            <VFIconButton :href="link.href" color="white" :name="link.text" />
          </li>
        </ul>
      </div>
      <div
        class="footer-link"
        :style="{
          fontSize: fontSize('link/100'),
        }"
      >
        <ul class="footer-list">
          <li v-for="(link, index) in internalLinkList" :key="index">
            <VFTextLink :href="link.href" color="white">
              <VFTypography variant="link/100" color="white">
                {{ link.text }}
              </VFTypography>
            </VFTextLink>
          </li>
        </ul>
        <ul class="footer-list">
          <li v-for="(link, index) in vueFesLinkList" :key="index">
            <VFTextLink :href="link.href" target="_blank" color="white">
              <VFTypography variant="link/100" color="white">
                {{ link.text }}
              </VFTypography>
            </VFTextLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-container footer-copyrights">
      <small
        :style="{
          fontSize: fontSize('body/100'),
        }"
      >
        © 2018-2024 Vue.js Japan Users Group some rights reserved.<br />
        Vue.js artworks by Evan You is licensed under a Creative Commons Attribution 4.0
        International License.
      </small>
    </div>
  </footer>
</template>

<style scoped>
@import url('../assets/media.css');

#footer {
  --padding-block: 5rem;
  --gap-link-item: 0.875rem;
  --size-icon: 1.75rem;
  @media (--mobile) {
    --padding-block: 3.75rem;
    --gap-link-item: 0.25rem;
    --size-icon: 2.5rem;
  }
  background-color: v-bind(color('vue-blue'));
  color: v-bind(color('white'));
  line-height: 1.2;
}
.footer-container {
  margin-inline: auto;
  max-width: 74.5rem;
  padding-inline: 1.25rem;
  &:first-of-type {
    padding-top: var(--padding-block);
  }
  &:last-of-type {
    padding-bottom: var(--padding-block);
  }
  & + & {
    margin-top: 1.25rem;
  }
  @media (--mobile) {
    & + & {
      margin-top: 2.5rem;
    }
  }
}
.footer-list {
  margin: 0;
  padding: 0;
  li {
    list-style-type: none;
  }
}
.footer-main {
  display: grid;
  grid-template-columns: 1fr auto;
  @media (--mobile) {
    display: block;
  }
}
.footer-sns-list {
  margin-top: 1.25rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(v-bind(snsLinkList.length), var(--size-icon));
  .icon-wrapper {
    aspect-ratio: 1;
    display: grid;
    place-items: center;
  }
  @media (--mobile) {
    :deep(svg) {
      scale: 1.4;
    }
  }
}
.footer-link {
  display: grid;
  gap: 3.75rem;
  grid-template-columns: 1fr 1fr;
  li + li {
    margin-top: var(--gap-link-item);
  }
  @media (--tablet) {
    grid-template-columns: 1fr;
    gap: var(--gap-link-item);
  }
  @media (--mobile) {
    margin-top: 1.25rem;
    li {
      display: flex;
      height: 2.5rem;
      align-items: center;
    }
  }
}
</style>
