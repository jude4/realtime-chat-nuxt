<script setup lang="ts">

useSeoMeta({
  title: 'Dashboard',
})

const { $echo } = useNuxtApp()
const {getSession} = useAuth()
onMounted(async () => {
  const user : any= await getSession();
  $echo.private(`user.${user.id}`)
  .listen('OrderDispatched', (event: any) => {
      console.log(event)
    })
})
</script>

<template>
  <h1>Dashboard Page</h1>
</template>