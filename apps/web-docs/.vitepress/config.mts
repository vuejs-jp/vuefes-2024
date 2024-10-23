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
      { text: 'Path Design', link: '/path-design' },
      { text: 'Namecard Debug', link: '/namecard-debug' },
      {
        text: 'RPA',
        items: [
          {
            text: 'Getting Started',
            link: '/rpa/getting-started',
          },
          {
            text: 'Peatix',
            items: [
              { text: 'Download CSV', link: '/rpa/peatix/csv' },
            ],
          },
        ],
      },
      {
        text: 'Admin for Staff',
        items: [
          {
            text: 'Specification',
            link: '/admin/specification',
          },
          {
            text: 'Page',
            items: [
              { text: 'Speaker, Paneler', link: '/admin/page/speaker' },
              { text: 'Sponsor', link: '/admin/page/sponsor' },
              { text: 'Job for jobboard', link: '/admin/page/job' },
              { text: 'Namecard', link: '/admin/page/namecard' },
              { text: 'Staff (Core, Volunteer)', link: '/admin/page/staff' },
            ],
          },
        ],
      },
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
          { text: 'Path Design', link: '/path-design' },
          { text: 'Namecard Debug', link: '/namecard-debug' },
          {
            text: 'RPA',
            items: [
              {
                text: 'Getting Started',
                link: '/rpa/getting-started',
              },
              {
                text: 'Peatix',
                items: [
                  { text: 'Download CSV', link: '/rpa/peatix/csv' },
                  { text: 'Fetch JSON data', link: '/rpa/peatix/json' },
                ],
              },
            ],
          },
          {
            text: 'Admin for Staff',
            items: [
              {
                text: 'Specification',
                link: '/admin/specification',
              },
              {
                text: 'Page',
                items: [
                  { text: 'Speaker, Paneler', link: '/admin/page/speaker' },
                  { text: 'Sponsor', link: '/admin/page/sponsor' },
                  { text: 'Job for jobboard', link: '/admin/page/job' },
                  { text: 'Namecard', link: '/admin/page/namecard' },
                  { text: 'Staff (Core, Volunteer)', link: '/admin/page/staff' },
                ],
              },
            ],
          },
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
      {
        icon: {
          svg: '<svg width="48.000000pt" height="48.000000pt" viewBox="0 0 48.000000 48.000000" version="1.0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M315 398 c-11 -6 -24 -17 -28 -25 -11 -19 -25 -16 -32 7 -9 30 -17 25 -46 -28 l-27 -48 27 -47 c14 -26 28 -47 31 -47 3 0 21 28 40 63 34 60 37 62 79 65 l43 3 -26 -47 c-14 -26 -24 -49 -22 -52 13 -12 57 12 71 38 22 43 19 68 -14 101 -31 30 -62 36 -96 17z"/><path d="M92 146 c-23 -40 -42 -76 -42 -80 0 -3 42 -6 94 -6 l95 0 -46 80 c-25 44 -48 80 -52 80 -4 0 -26 -33 -49 -74z"/><path d="M292 146 c-23 -40 -42 -76 -42 -80 0 -3 42 -6 94 -6 l95 0 -46 80 c-25 44 -48 80 -52 80 -4 0 -26 -33 -49 -74z"/></g></svg>',
        },
        link: 'https://vuefes.jp/2024',
      },
      {
        icon: {
          svg: '<svg width="800px" height="800px" viewBox="-31.5 0 319 319" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><defs><path d="M9.87245893,293.324145 L0.0114611411,30.5732167 C-0.314208957,21.8955842 6.33948896,14.5413918 15.0063196,13.9997149 L238.494389,0.0317105427 C247.316188,-0.519651867 254.914637,6.18486163 255.466,15.0066607 C255.486773,15.339032 255.497167,15.6719708 255.497167,16.0049907 L255.497167,302.318596 C255.497167,311.157608 248.331732,318.323043 239.492719,318.323043 C239.253266,318.323043 239.013844,318.317669 238.774632,318.306926 L25.1475605,308.712253 C16.8276309,308.338578 10.1847994,301.646603 9.87245893,293.324145 L9.87245893,293.324145 Z" id="path-1"></path></defs><g><mask id="mask-2" fill="white"><use xlink:href="#path-1"></use></mask><use fill="#FF4785" fill-rule="nonzero" xlink:href="#path-1"></use><path d="M188.665358,39.126973 L190.191903,2.41148534 L220.883535,0 L222.205755,37.8634126 C222.251771,39.1811466 221.22084,40.2866846 219.903106,40.3327009 C219.338869,40.3524045 218.785907,40.1715096 218.342409,39.8221376 L206.506729,30.4984116 L192.493574,41.1282444 C191.443077,41.9251106 189.945493,41.7195021 189.148627,40.6690048 C188.813185,40.2267976 188.6423,39.6815326 188.665358,39.126973 Z M149.413703,119.980309 C149.413703,126.206975 191.355678,123.222696 196.986019,118.848893 C196.986019,76.4467826 174.234041,54.1651411 132.57133,54.1651411 C90.9086182,54.1651411 67.5656805,76.7934542 67.5656805,110.735941 C67.5656805,169.85244 147.345341,170.983856 147.345341,203.229219 C147.345341,212.280549 142.913138,217.654777 133.162291,217.654777 C120.456641,217.654777 115.433477,211.165914 116.024438,189.103298 C116.024438,184.317101 67.5656805,182.824962 66.0882793,189.103298 C62.3262146,242.56887 95.6363019,257.990394 133.753251,257.990394 C170.688279,257.990394 199.645341,238.303123 199.645341,202.663511 C199.645341,139.304202 118.683759,141.001326 118.683759,109.604526 C118.683759,96.8760922 128.139127,95.178968 133.753251,95.178968 C139.662855,95.178968 150.300143,96.2205679 149.413703,119.980309 Z" fill="#FFFFFF" fill-rule="nonzero" mask="url(#mask-2)"></path></g></svg>',
        },
        link: 'https://vuefes-2024-designsystem.pages.dev/',
      },
    ],
  },
})
