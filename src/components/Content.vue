<script setup>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';
import { useTaskStore } from '../stores/task';
import { useUserStore } from '../stores/users';
import { ref, onMounted, watch } from 'vue';
import moment from 'moment';


// Variables
const taskStore = useTaskStore();
const userStore = useUserStore();
const category = ref('weekly');
const selectedProject = ref('All');

//For Table Columns Fields
const columns = [
  {
    label: 'Project',
    field: 'project',
    thClass: 'custom-th-class',
    tdClass: 'custom-td-class',
  },
  {
    label: 'Username',
    field: 'username',
    thClass: 'custom-th-class',
    tdClass: 'custom-td-class',
  },
  {
    label: 'Time Entry',
    field: 'timeEntry',
    thClass: 'custom-th-class',
    tdClass: 'custom-td-class',
  },
  {
    label: 'Number of Hours',
    field: 'hours',
    thClass: 'custom-th-class',
    tdClass: 'custom-td-class',
  },
  {
    label: 'Task Description',
    field: 'description',
    thClass: 'custom-th-class',
    tdClass: 'custom-td-class',
    width: '230px',
  },
  {
    label: 'Date & Time',
    field: 'timestamp',
    dateOutputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSSSSXXX',
    thClass: 'custom-th-class',
    tdClass: 'custom-td-class',
  },
];
const rows = ref([]);

// Lifecycle Hook
onMounted(() => {
  if (localStorage.getItem('entries')) {
    taskStore.entries = JSON.parse(localStorage.getItem('entries'));
  } else {
    localStorage.setItem('entries', JSON.stringify(taskStore.entries));
  }

  if (localStorage.getItem('currentLoggedInUser')) {
    userStore.currentUsername = JSON.parse(localStorage.getItem('currentLoggedInUser'));
  } else {
    localStorage.setItem('currentLoggedInUser', JSON.stringify(userStore.currentUsername));
  }
  filterRows();

});

function setCategory(newCategory) {
  category.value = newCategory;
  filterRows();
}

function filterRows() {
  const filteredEntries = taskStore.entries.filter(entry => {
    const timestamp = moment(entry.timestamp, "YYYY-MM-DD HH:mm:ss"); //convert string
    const formattedDate = timestamp.format("YYYY-MM-DD"); //format moment
    const dateTo = moment().format('YYYY-MM-DD');
    const dateFrom = moment().subtract(7, 'd').format('YYYY-MM-DD');
    const diffInDays = moment(formattedDate).isBetween(dateFrom, dateTo, null, '[]'); //check if between the last 7 days

    return diffInDays && entry.username === userStore.currentUsername; //filter by username and weekly task
  });
  if (category.value === 'weekly') {
    rows.value = filteredEntries;
  } else if (category.value === 'total') {
    rows.value = taskStore.entries.filter(entry => entry.username === userStore.currentUsername); //If total, filter by username only
  }
}


watch(taskStore, (newRows) => { //Update data on newTask entry
  filterRows();
});


watch(selectedProject, () => { //Update table data filter on select change
  rows.value = taskStore.entries.filter(entry => entry.project === selectedProject.value && entry.username === userStore.currentUsername)
});


</script>

<template>
  <div class="content">
    <div class="float_right">
      <div class="tabs">
        <div class="tab_container" :class="category == 'weekly' ? 'active' : ''" @click="setCategory('weekly')">
          <v-icon name="bi-calendar-week" />
          <div class="tab_title">Weekly</div>
        </div>
        <div class="tab_container" :class="category == 'total' ? 'active' : ''" @click="setCategory('total')">
          <v-icon name="bi-calendar3" />
          <div class="tab_title">Total</div>
        </div>
      </div>
      <div class="select_container" v-if="category == 'total'">
        <select v-model="selectedProject" class="select">
          <option value="All">All</option>
          <template v-for="project in taskStore.projects" :key="project">
            <option :value="project">{{ project }}</option>
          </template>
        </select>
      </div>
    </div>

    <div class="tab_content">
      <template v-if="category == 'weekly'">
        <vue-good-table :columns="columns" :rows="rows" max-height="500px" compactMode />
      </template>
      <template v-if="category == 'total'">
        <vue-good-table :columns="columns" :rows="rows" max-height="500px" compactMode />
      </template>
    </div>
  </div>
</template>

<style>
.custom-th-class {
  font-size: 13px;
}

.vgt-responsive::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
.vgt-responsive::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.vgt-responsive::-webkit-scrollbar-thumb {
  background: #6dab4e;
}

@media (max-width: 1300px) {
  .custom-th-class {
    width: 250px;
  }

  .vgt-compact tr {
    background-color: #a5e6851e;
    margin-bottom: 0px;
    margin: 15px 0px;
  }
}


.vgt-table thead th {
  background: #a5e6851e !important;
}

.custom-td-class {
  font-size: 13px;
  vertical-align: middle;
}
</style>
<style scoped>
* {
  font-family: 'Open Sans', sans-serif;
}

.float_right {
  display: flex;
  justify-content: space-between;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 5px;
  width: 150px;
  padding: 10px;
  font-family: 'Open Sans', sans-serif;
  margin: 4px 0;
  display: inline-block;
  border: 1px solid #517C3B;
  color: #517C3B;
  border-radius: 15px;
  background-color: transparent;
  box-sizing: border-box;
}

.container {
  height: 100vh;
}

#app {
  display: flex;
  flex-direction: row;
  margin: 0;
}

.grid_container {
  display: grid;
  grid-template-columns: 2fr 8fr 3fr;
  grid-gap: 10px;
  width: 100vw;
}

.content {
  padding: 50px 25px;
}

.tabs {
  display: flex;
  width: fit-content;
}

.tab_container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border: 1px solid #517c3b00;
  margin-right: 10px;
}

.active {
  border: 1px solid #517C3B;
  border-radius: 5px;
  color: #517C3B;
  background-color: #a5e6851e;
}

.tab_title {
  vertical-align: middle;
  margin-left: 10px;
}

.tab_content {
  width: 100%;
  border: 1px solid #517C3B;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  max-height: 80vh;
}


@media (max-width: 1300px) {
  .content {
    order: 2;
    padding: 10px 25px;
  }
}
</style>