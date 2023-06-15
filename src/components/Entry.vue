<script setup>
import { useTaskStore } from '../stores/task';
import { useUserStore } from '../stores/users';
import { onMounted } from 'vue';

// Variables
const taskStore = useTaskStore();
const userStore = useUserStore();

onMounted(() => {

  //taskStore.addTaskEntry(userStore.currentUsername, '	18:35', '5', '3', 'Project 3', '2023-05-15 15:36:11')
  localStorage.setItem('entries', JSON.stringify(taskStore.entries))
  if (localStorage.getItem('entries')) {
    //If users exists store it to users state
    taskStore.entries = JSON.parse(localStorage.getItem('entries'));
  } else {
    //Create new local storage data
    localStorage.setItem('entries', JSON.stringify(taskStore.entries));
  }

  if (localStorage.getItem('currentLoggedInUser')) {
    userStore.currentUsername = JSON.parse(localStorage.getItem('currentLoggedInUser'));
  } else {
    localStorage.setItem('currentLoggedInUser', JSON.stringify(userStore.currentUsername));
  }
})

function addEntry() {
  // Validate Entries
  if (taskStore.timeEntry === '' || taskStore.hours === '' || taskStore.description === '' || taskStore.project === '') {
    return alert('Fill in the fields!')
  } else {
    taskStore.addTaskEntry(userStore.currentUsername, taskStore.timeEntry, taskStore.hours, taskStore.description, taskStore.project);
    localStorage.setItem("entries", JSON.stringify(taskStore.entries));
    reset()
  }
}

function reset() {
  taskStore.timeEntry = '';
  taskStore.hours = '';
  taskStore.description = '';
  taskStore.project = '';
}
</script>
<template>
  <div class="container padding">
    <div class="heading">John Patrick Torio</div>

    <div class="input_container">
      <div class="title">Project</div>

      <select v-model="taskStore.project">
        <template v-for="project in taskStore.projects" :key="project">
          <option :value="project">{{ project }}</option>
        </template>
      </select>

    </div>
    <div class="input_container">
      <div class="title">Time Entry</div>
      <input type="time" placeholder="Enter your name" v-model="taskStore.timeEntry">
    </div>
    <div class="input_container">
      <div class="title">Number of Hours</div>
      <input type="number" placeholder="" v-model="taskStore.hours">
    </div>
    <div class="input_container">
      <div class="title">Task Description</div>
      <textarea name="" id="" cols="30" rows="10" v-model="taskStore.description"></textarea>
    </div>
    <div class="submit_btn" @click="addEntry">
      Create Task
    </div>
  </div>
</template>
<style scoped>
.container {
  height: 100vh;
}

.submit_btn {
  cursor: pointer;
}
</style>