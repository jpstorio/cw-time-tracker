<script setup>
import { useTaskStore } from '../stores/task';
import { useUserStore } from '../stores/users';
import { onMounted } from 'vue';

// Variables
const taskStore = useTaskStore();
const userStore = useUserStore();

onMounted(() => {

  // Initialize only when local storage entries is empty
  if ((JSON.parse(localStorage.getItem('entries')).length) == 0) {
    //If users exists store it to users state
    taskStore.addTaskEntry(userStore.currentUsername, '	18:35', '5', 'Finished Technical Exam Requirements', 'Project 3', '2023-05-15 15:36:11');
    localStorage.setItem('entries', JSON.stringify(taskStore.entries))
  }

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
    <div class="inner_container">
      <div class="heading"> <span class="current_user">Current User:</span> {{ userStore.currentUsername }}</div>

      <div class="input_container">
        <div class="title">Project</div>

        <select v-model="taskStore.project" class="select">
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
        Create Task ✨
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  font-family: 'Open Sans', sans-serif;
}

.heading {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.current_user {
  background-color: #6dab4e;
  border-radius: 15px;
  padding: 0px 10px;
  color: white;
}

.title {
  font-weight: 700;
  color: #517C3B;
}

.container {
  height: 100vh;
  padding: 25px;
  display: flex;
  align-items: center;
}

.inner_container {
  border: 1px solid #517C3B;
  padding: 25px;
  border-radius: 25px;
}

.submit_btn {
  cursor: pointer;
}

.input_container {
  margin: 10px 0px;
}

input[type=time],
input[type=number] {
  padding: 10px;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  margin: 4px 0;
  display: inline-block;
  border: 1px solid #ccc;
  color: #517C3B;
  border-radius: 15px;
  background-color: transparent;
  box-sizing: border-box;
}

.select,
textarea {
  padding: 10px;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  margin: 4px 0;
  display: inline-block;
  border: 1px solid #ccc;
  color: #517C3B;
  border-radius: 15px;
  background-color: transparent;
  box-sizing: border-box;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 8px;
}

.submit_btn {
  text-align: center;
  padding: 10px;
  background-color: #517C3B;
  border: none;
  color: white;
  border-radius: 25px;
  width: 100%;
  font-family: 'Open Sans', sans-serif;
  margin: 10px 0px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.submit_btn:hover {
  transform: scale(1.03);
}


@media (max-width: 1300px) {
  .container {
    order: 1;
    height: auto;
    display: flex;
    justify-content: center;
  }

  .input_container {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .title {
    width: 200px;
  }
}
</style>