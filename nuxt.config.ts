// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  css: ['vuetify/lib/styles/main.sass'],

  build: {
    transpile: ['vuetify'],
  },

  app: {
    head: {
      title: 'Sticker Spammer Replier',
      charset: 'utf-8',
      meta: [
        { charset: 'utf-8' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' },
      ],
    },
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  runtimeConfig: {
    app: {
      baseURL: '/sticker-spammer-replier/',
      buildAssetsDir: '/sticker-spammer-replier/_nuxt/'
    },
  },
})
