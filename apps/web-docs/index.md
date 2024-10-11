---
layout: home
hero:
  name: "@vuejs-jp/web-docs"
  text: "Vue Fes Japan 2024 document website"
  tagline: "We have verbalized the specifications."
  actions:
    - theme: brand
      text: CSS
      link: /css/getting-started
    - theme: brand
      text: Peatix
      link: /peatix/csv-usage
    - theme: brand
      text: Supabase
      link: /supabase/getting-started
---

# 各年のウェブサイト

- [Vue Fes Japan Online 2022](https://vuefes.jp/2022)
- [Vue Fes Japan 2023](https://vuefes.jp/2023)
- [Vue Fes Japan 2024](https://vuefes.jp/2024)

## 各年のウェブサイトの特徴

3 年間のウェブサイトの比較表について。

||Vue Fes Japan Online 2022|Vue Fes Japan 2023|Vue Fes Japan 2024|
|:---|:---|:---|:---|
|Package Manager|npm|pnpm|bun|
|Framework|Nuxt Bridge|Nuxt 3|Nuxt 3|
|CMS|Newt|-|Essentially, fully relying on Supabase|
|Form|Netlify Form|Newt FormApp|Newt FormApp|
|CSS|Tailwind CSS|Pinceau|-|
|Cloud|-|Supabase|Supabase|
|Design System|-|-|Storybook|
|Hosting|Netlify|Netlify|Netlify (+ Cloudflare Pages)|
|Ticket|-|Pass Market|Peatix|
|Namecard|-|Partially automated by Supabase Database Function|Automated by NestJS (Use nest-commander library)|
|OG Image|Static|Use nuxt-og-image|Use Supabase Edge Functions|
|Type Check|-|vue-tsc|vue-tsc|
|Unit/E2E Tests|-|Vitest, Cypress|Vitest, Cypress|
