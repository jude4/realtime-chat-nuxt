import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { useRuntimeConfig, useCookie } from '#app'

// Make Pusher available globally
window.Pusher = Pusher

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const token = useCookie('auth.token')


  window.Echo = new Echo({
    broadcaster: 'reverb',
    key: config.public.REVERB_APP_KEY,
    wsHost: config.public.REVERB_HOST || 'localhost',
    wsPort: config.public.REVERB_PORT || 8080,
    forceTLS: false,
    debug: true,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: `${config.public.baseUrl}/broadcasting/auth`,
    auth: {
      headers: { 
        Authorization: `Bearer ${token.value}`,
        Accept: 'application/json'
      }
    }
  })

  nuxtApp.provide('echo', window.Echo)
})

