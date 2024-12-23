// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@sidebase/nuxt-auth'
  ],
  css: ['~/assets/css/main.css'],
  devServer: {
    host: 'reverb-app.test',
    port: 3000,
  },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    // runtimeConfig: {
    //   baseURL: 'http://reverb-app/api'
    // },
    // originEnvKey: 'AUTH_ORIGIN',
    baseURL: 'http://api-reverb-app.test/api',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/user', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/token',
        type: 'Bearer',
        cookieName: 'auth.token',
        headerName: 'Authorization',
        maxAgeInSeconds: 1800,
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      baseUrl: 'http://api-reverb-app.test/api',
      apiBase: 'http://api-reverb-app.test',
      REVERB_APP_KEY: process.env.REVERB_APP_KEY,
      REVERB_HOST: process.env.REVERB_HOST,
      REVERB_PORT: process.env.REVERB_PORT,
    }
  }
})