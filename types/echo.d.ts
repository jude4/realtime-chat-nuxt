import 'vue'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
    interface Window {
        Echo: Echo;
        Pusher: typeof Pusher;
    }
}

declare module '#app' {
    interface NuxtApp {
        $echo: Echo
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $echo: Echo
    }
}