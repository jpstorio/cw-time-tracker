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
const columns = [
  {
    label: 'Project',
    field: 'project',
  },
  {
    label: 'Username',
    field: 'username',
  },
  {
    label: 'Time Entry',
    field: 'timeEntry',
  },
  {
    label: 'Number of Hours',
    field: 'hours',
  },
  {
    label: 'Task Description',
    field: 'description',
  },
  {
    label: 'Date & Time',
    field: 'timestamp',
    dateOutputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSSSSXXX',
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
    rows.value = taskStore.entries.filter(entry => entry.username === userStore.currentUsername);
  }
}


watch(taskStore, (newRows) => {
  filterRows();
});


</script>

<template>
  <div class="content">
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
    <div class="tab_content">
      <template v-if="category == 'weekly'">
        <vue-good-table :columns="columns" :rows="rows" max-height="500px" />
      </template>
      <template v-if="category == 'total'">
        <vue-good-table :columns="columns" :rows="rows" max-height="500px" />
      </template>
    </div>
  </div>
</template>


<style scoped>
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
  padding: 25px;
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
</style>