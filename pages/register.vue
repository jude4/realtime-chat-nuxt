<template>
  <div class="container mx-auto p-4 max-w-md">
    <h1 class="text-3xl font-bold mb-4">Register</h1>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name" type="text" v-model="name" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email" type="email" v-model="email" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password" type="password" v-model="password" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password_confirmation">Confirm Password</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password_confirmation" type="password" v-model="password_confirmation" />
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">

const { $axios } = useNuxtApp()

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

interface Credentails {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
/**
 * Registers a new user
 * @returns {Promise<void>}
 */
const register = async (): Promise<void> => {
  const credentials: Credentails = {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  }
  try {
    const response = await $axios.post<{
      token: string;
    }>('/register', credentials);

    if (response && response.token) {
      navigateTo({
        path: '/login',
        replace: true
      });
    }

  } catch (error) {
    console.log(error);
  }
};
</script>