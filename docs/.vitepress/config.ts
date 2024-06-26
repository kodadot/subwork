import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import { defineConfig } from 'vitepress'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const links = []

// https://vitepress.dev/reference/site-config
export default defineConfig({
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated
      })
  },
  // generates sitemap
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: 'https://subwork.xyz/'
    })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    await new Promise((r) => writeStream.on('finish', r))
  },
  
  // transformHead({ assets }) {
  //   // adjust the regex accordingly to match your font
  //   const myFontFile = assets.find(file => /Raleway-Light\.\w+\.ttf/)
  //   if (myFontFile) {
  //     return [
  //       [
  //         'link',
  //         {
  //           rel: 'preload',
  //           href: myFontFile,
  //           as: 'font',
  //           type: 'font/ttf',
  //           crossorigin: ''
  //         }
  //       ]
  //     ]
  //   }
  // },
  head: [
    [
      'script', { src: 'https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js'}
    ],
    [
      'meta',
      { property: 'og:type', content: 'website'}
    ],
    [
      'meta',
      { property: 'og:title', content: 'SubWork - coworking in nature'}
    ],
    [
      'meta',
      { property: 'og:image', content: 'https://subwork.xyz/subwork_header_jungle_logo.png.webp'}
    ],
    [
      'meta',
      { property: 'og:description', content: 'Beautiful coworking space in nature of Julian Alps in Bled, Slovenia'}
    ],
    [
      'meta',
      { property: 'og:url', content: 'https://subwork.xyz'}
    ],
    [
      'meta',
      { name: 'twitter:card', content: 'summary_large_image'}
    ]
  ],
  lastUpdated: true,
  title: 'SubWork', // remove to use :title when using <h1> on each page, but change all pages
  titleTemplate: ':title - coworking in nature',
  description: 'Minimum Viable Community in Julian Alps',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/kodadot/subwork/edit/main/docs/:path'
    },
    footer: {
      message: 'VitePress content crafted at SubWork. <a href="https://shop.kodadot.xyz/p/subwork-t-shirt/-coworkinginnature/">$50 reward for first 30 attentive readers</a>',
      copyright: 'Copyright © 2023-present by SubWork members. Some pictures from Unsplash.',
      url: 'https://shop.kodadot.xyz/p/subwork-t-shirt/-coworkinginnature/'
    },
    nav: [
      { text: 'SubWork', link: '/' },
      { text: 'coworking space', link: '/home' },
      { text: 'book', link: '/book-subwork' },
      { text: 'contact', link: '/contact' },
    ],
    sidebar: [
      {
        text: 'coworking space at Bled',
        items: [
          { text: 'amenities', link: '/amenities-in-coworking-space' },
          { text: 'book coworking space', link: '/book-subwork'},
          { text: 'company retreat', link: '/company-retreat' },
          { text: 'contact', link: '/contact' },
          { text: 'family members', link: '/family-members-in-subwork' },
          { text: 'meeting rooms', link: '/book-meeting-room-bled' },
          { text: 'membership', link: '/membership' },
        ]
      },
      {
        text: 'concept',
        items: [
          { text: 'why Bled', link: '/why-did-we-choose-bled' },
          { text: 'who we are', link: '/who-we-are' },
          { text: 'building up space', link: '/building-up-space' },
          { text: 'scalability vision charter city', link: '/scalability-vision-to-be-charter-city' },
        ],
      },
      {
        text: 'what can I do in Bled?',
        collapsed: true,
        items: [
          { text: 'bike trail bled-bohinj', link: '/bled-bohinj-bike-trail' },
          { text: 'mountain peaks and cabins', link: '/mountain-peaks-and-alpine-cabins' },
          { text: 'standup paddle & canoe', link: '/rent-standup-paddle-in-bled-bohinj' },
          { text: 'sport activities', link: '/sports-activities-around-bled' },
          { text: 'surroundings', link: '/surroundings' }
        ]
      },
      {
        text: 'accommodation',
        collapsed: true,
        items: [
          { text: 'accomodation', link: '/hotels-hostels-in-bled' },
          { text: 'coliving in bled', link: '/coliving-in-bled' },
          { text: 'location of SubWork', link: '/location-of-subwork' },
          { text: 'long term stay in bled', link: '/long-term-stay-in-bled' },
        ]
      },
      {
        text: 'transportation',
        collapsed: true,
        items: [
          { text: 'coming by car', link: '/coming-by-car-to-subwork-bled' },
          { text: 'location of SubWork', link: '/location-of-subwork' },
          { text: 'transportation', link: '/transportation-to-subwork-bled-slovenia' },
        ]
      },
      {
        text: 'members',
        collapsed: true,
        items: [
          { text: 'first time in Subwork', link: '/first-time-in-subwork' },
          { text: 'book subwork', link: '/book-subwork' },
          { text: 'governance', link: '/rules-for-coworkers'},
        ]
      },
      {
        text: 'community',
        collapsed: true,
        items: [
          { text: 'contribute', link: '/contribute-and-improve-subwork' },
          { text: 'events', link: '/events-in-subwork' },
          { text: 'fellowship', link: '/subwork-fellowship' },
          { text: 'friday & saturday hustle', link: '/friday-saturday-free-hustle' },
          { text: 'gym equipment', link: '/basic-gym-equipment-in-coworking-space-subwork'},
          { text: 'partner with SubWork', link: '/partner-with-coworking-space-subwork'},
          { text: 'slovenian products', link: '/famous-slovenian-products' },
          { text: 'specialty coffee gear', link: '/specialty-coffee-in-bled'},
          { text: 'triathlon', link: '/training-for-triathlon' },
          { text: 'writings', link: '/writings-about-subwork' },
          { text: 'ZuBled', link: '/zuzalu-bled' },
        ]
      },
      {
        text: 'SubWork - Ljubljana',
        collapsed: true,
        items: [
          { text: 'Metalka', link: '/subwork-metalka' },
        ]
      },
    ],
    socialLinks: [
      { icon: {
              svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M470.435 45.423L16.827 221.249c-18.254 8.188-24.428 24.585-4.412 33.484l116.37 37.173l281.368-174.79c15.363-10.973 31.091-8.047 17.557 4.024L186.053 341.075l-7.591 93.076c7.031 14.371 19.905 14.438 28.117 7.295l66.858-63.589l114.505 86.187c26.595 15.826 41.066 5.613 46.788-23.394l75.105-357.47c7.798-35.705-5.5-51.437-39.4-37.757z"/></svg>'
              },
              link: 'https://t.me/+VoZsr7MEds84ZjQ0'
      },
      { icon: 'twitter', link: 'https://twitter.com/subworkbled' },
      { icon: { 
              svg: '<svg width="1000" height="1000" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M257.778 155.556H742.222V844.445H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.445H257.778V155.556Z" fill="#855DCD" /><path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.445H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z" fill = "#855DCD" /><path d="M675.556 746.667C663.283 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.445H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.94 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z" fill = "#855DCD" /> </svg>'
              },
              link: 'https://warpcast.com/~/channel/subwork' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/subwork/' },
      { icon: {
              svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M31.969 26.984c-.401-2.572-5.163-.593-5.459-3.411c-.417-4 5.531-12.615 5.063-15.964c-.417-3.005-2.453-3.64-4.219-3.677c-1.715-.025-2.167.245-2.745.584c-.339.192-.817.577-1.484-.057c-.443-.423-.745-.713-1.208-1.089c-.24-.192-.62-.432-1.261-.525c-.629-.099-1.463 0-1.984.219c-.532.229-.937.625-1.369 1c-.433.375-1.532 1.599-2.548 1.145c-.448-.192-1.948-.943-3.031-1.405c-2.084-.901-5.093.557-6.183 2.489C3.926 9.157.745 20.428.254 21.913c-1.077 3.333 1.381 6.052 4.683 5.895c1.401-.067 2.333-.572 3.213-2.181c.511-.928 5.308-13.448 5.667-14.057c.261-.432 1.125-1.005 1.855-.636c.735.38.88 1.161.771 1.896c-.183 1.193-3.557 8.839-3.693 9.699c-.219 1.473.48 2.285 2.011 2.369c1.043.052 2.089-.317 2.912-1.88c.464-.871 5.797-11.557 6.265-12.271c.521-.781.937-1.043 1.475-1.011c.411.02 1.061.125.9 1.353c-.161 1.209-4.452 9.043-4.9 10.959c-.605 2.573.801 5.167 3.124 6.308c1.48.728 7.959 1.968 7.433-1.371z"/></svg>'
              },
              link: 'https://meetup.com/subwork'
              },
      { icon: 'github', link: 'https://github.com/kodadot/subwork' }
    ]
  }
})
  
