<script setup>

useSeoMeta({
  title: 'Dashboard',
})

const messages = ref([])
const { $echo } = useNuxtApp()
const { getSession } = useAuth()
const channelStatus = ref('Disconnected')

onMounted(async () => {
  publicChannel()
  privateChannel()
})

const privateChannel = async () => {
  const user = await getSession()
  // Connect to private channel with detailed logging
  const channel = $echo.private(`users.${user.id}`)

  // Listen for connection events
  channel.subscribed(() => {
    console.log('Successfully connected to private channel')
    channelStatus.value = 'Connected'
  })

  channel.error((error) => {
    console.error('Private channel error:', error)
    channelStatus.value = 'Error'
  })

  // Listen for your specific event
  channel.listen('.OrderDispatched', (event) => {
    console.log('Received event on private channel:', event)
    messages.value.push(event)
  })

  // Listen for all events on this channel (helpful for debugging)
  $echo.connector.pusher.connection.bind('message', (msg) => {
    console.log('Raw WebSocket message:', msg)
  })

  // Monitor connection status
  $echo.connector.pusher.connection.bind('state_change', (states) => {
    console.log('Connection state changed from', states.previous, 'to', states.current)
  })
}

const publicChannel = () => {
    $echo.connector.pusher.connection.bind('connected', () => {
    console.log('Connected to WebSocket server')
    connectionStatus.value = 'Connected'
  })

  $echo.connector.pusher.connection.bind('disconnected', () => {
    console.log('Disconnected from WebSocket server')
    connectionStatus.value = 'Disconnected'
  })

  // Subscribe to channel with detailed logging
  const channel = $echo.channel('chat')

  // Log successful subscription
  channel.subscribed(() => {
    console.log('Successfully subscribed to channel')
  })

  // Log subscription error
  channel.error((error) => {
    console.error('Channel subscription error:', error)
  })

  // Listen for event with detailed logging
  channel.listen('.Example', (event) => {
    console.log('Raw event received:', event)
    messages.value.push(event)
  })

  // Listen without dot prefix (try both ways)
  channel.listen('Example', (event) => {
    console.log('Raw event received (no dot prefix):', event)
    messages.value.push(event)
  })

  // Log all incoming events for debugging
  $echo.connector.pusher.connection.bind('message', (msg) => {
    console.log('Raw WebSocket message:', msg)
  })

}

</script>

<template>
  <h1>Dashboard Page</h1>
</template>