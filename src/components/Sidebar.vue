<script setup>
import { useUserStore } from '../stores/users';

import { useRouter } from 'vue-router'
const userStore = useUserStore();
const router = useRouter();
function logout() {
  localStorage.setItem('currentLoggedInUser', JSON.stringify(''));
  userStore.currentUsername = ''

  router.push('/')
}
</script>

<template>
  <div class="container padding" @click="logout">Sidebar</div>
</template>
<style scoped>
.container {
  height: 100vh;
}
</style>