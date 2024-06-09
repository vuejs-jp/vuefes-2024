import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@vuejs-jp/web-docs',
  description: 'Vue Fes Japan 2024 document website',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Top', link: '/' },
      { text: 'CSS', link: '/css/getting-started' },
      { text: 'Supabase', link: '/supabase/getting-started' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'CSS', link: '/css/getting-started' },
          { text: 'Supabase', link: '/supabase/getting-started' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'x', link: 'https://twitter.com/vuejsfes' },
      { icon: 'github', link: 'https://github.com/vuejs-jp/vuefes-2024' },
    ],
  },
})
