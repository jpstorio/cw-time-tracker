<script setup>
import { useUserStore } from '../stores/users';
import { useTaskStore } from '../stores/task';
import { useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue';

const userStore = useUserStore();
const taskStore = useTaskStore();
const router = useRouter();
const total_hours = ref(0);
const resolved_tasks = ref(0);

function logout() {
  localStorage.setItem('currentLoggedInUser', JSON.stringify(''));
  userStore.currentUsername = ''
  router.push('/')
}

onMounted(() => {
  calculate();
})

function calculate() {
  // Filter by username and get array length
  resolved_tasks.value = taskStore.entries.filter(entry => entry.username === userStore.currentUsername).length;

  // Filter by username
  const filteredEntries = taskStore.entries.filter(entry => entry.username === userStore.currentUsername);
  // Then calculate the sum of hours field
  total_hours.value = filteredEntries.reduce((sum, entry) => sum + parseFloat(entry.hours), 0);
}

watch(taskStore, () => { //Recalculate on newTask entry
  calculate();
});
</script>

<template>
  <div class="container padding">
    <div @click="logout" class="logout"> <v-icon name="co-account-logout" />
      Logout</div>

    <div class="card_container card1">
      <div class="active_projects">
        <div class="label">
          <div class="active_projects_number">{{ taskStore.projects.length }}</div>
          <div class="active_projects_title">Active Projects</div>
        </div>
        <img src="../assets/images/active_projects.png" alt="" width="50" height="50">
      </div>
    </div>
    <div class="card_container card2">
      <div class="active_projects">
        <div class="label">
          <div class="active_projects_number">{{ resolved_tasks }}</div>
          <div class="active_projects_title">Resolved Tasks</div>
        </div>
        <img src="../assets/images/resolved_tasks.png" alt="" width="50" height="50">
      </div>
    </div>
    <div class="card_container card3">
      <div class="active_projects">
        <div class="label">
          <div class="active_projects_number">{{ total_hours + 'h ' }}</div>
          <div class="active_projects_title">Total Hours</div>
        </div>
        <img src="../assets/images/total_hours.png" alt="" width="50" height="50">
      </div>
    </div>
  </div>
</template>
<style scoped>
.card_container.card1 {
  margin-top: 40px;
  background-color: #dd8c9523;
}

.card_container.card2 {
  background-color: #797ddf4f;
}

.card_container.card3 {
  background-color: #afd4db4e;
}

.card_container {
  background-color: #ffe9e1;
  padding: 20px;
  border-radius: 25px;
  font-size: 12px;
  width: 100%;
  margin: 5px 0px;
}

.active_projects_number {
  font-size: 20px;
  font-weight: bold;
}

.label {
  margin-right: 20px;
}

.active_projects {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout {
  text-align: center;
  padding: 10px;
  border: 1px solid #a60f0f;
  color: #a60f0f;
  border-radius: 15px;
  width: fit-content;
  padding: 5px 30px;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.logout:hover {
  background-color: #a60f0f;
  color: white;
  transform: scale(1.03);
}

.container {
  height: 100vh;
  padding: 50px 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

@media (max-width: 1300px) {
  .container {
    order: 3;
    height: 100%;
    padding: 10px 25px;
  }

  .card_container.card1 {
    margin-top: 10px
  }

  .logout {
    order: 4;
    margin: 30px 0px;
  }
}
</style>