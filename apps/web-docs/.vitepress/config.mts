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
      { text: 'Peatix', link: '/peatix/csv-usage' },
      {
        text: 'Supabase',
        items: [
          {
            text: 'Getting Started',
            link: '/supabase/getting-started',
          },
          {
            text: 'Database',
            items: [
              { text: 'Speaker, Paneler', link: '/supabase/db/speaker' },
              { text: 'Sponsor', link: '/supabase/db/sponsor' },
              { text: 'Job for jobboard', link: '/supabase/db/job' },
              { text: 'Attendee for namecard', link: '/supabase/db/attendee' },
              { text: 'Staff (Core, Volunteer)', link: '/supabase/db/staff' },
            ],
          },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'CSS', link: '/css/getting-started' },
          { text: 'Peatix', link: '/peatix/csv-usage' },
          {
            text: 'Supabase',
            items: [
              {
                text: 'Getting Started',
                link: '/supabase/getting-started',
              },
              {
                text: 'Database',
                items: [
                  { text: 'Speaker, Paneler', link: '/supabase/db/speaker' },
                  { text: 'Sponsor', link: '/supabase/db/sponsor' },
                  { text: 'Job for jobboard', link: '/supabase/db/job' },
                  { text: 'Attendee for namecard', link: '/supabase/db/attendee' },
                  { text: 'Staff (Core, Volunteer)', link: '/supabase/db/staff' },
                ],
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'x', link: 'https://x.com/vuefes' },
      { icon: 'github', link: 'https://github.com/vuejs-jp/vuefes-2024' },
    ],
  },
})
