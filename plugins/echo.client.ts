import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { useRuntimeConfig, useCookie } from '#app'

// Make Pusher available globally
window.Pusher = Pusher

export default defineNuxtPlugin(async(nuxtApp) => {
  const config = useRuntimeConfig()

  // const token = (useCookie('auth.token').value)

  // console.log(useCookie('XSRF-TOKEN').value)
  const { data } = await useFetch('/sanctum/csrf-cookie'); // Laravel Example
  const xsrfToken = useCookie('XSRF-TOKEN');
  console.log('Fetched XSRF-TOKEN:', xsrfToken.value);

  window.Echo = new Echo({
    broadcaster: 'reverb',
    key: config.public.REVERB_APP_KEY,
    wsHost: config.public.REVERB_HOST || 'localhost',
    wsPort: config.public.REVERB_PORT || 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: `${config.public.baseUrl}/broadcasting/auth`,
    auth: {
      headers: {
        'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
        // 'Content-Type': 'application/json',
        Accept: 'application/json',
        // Autorization: `Bearer ${token}`
      }
    }
  })

  nuxtApp.provide('echo', window.Echo)
})