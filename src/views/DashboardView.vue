<script setup>
import Sidebar from '../components/Sidebar.vue';
import Entry from '../components/Entry.vue';
import Content from '../components/Content.vue';
</script>

<template>
  <div class="grid_container">
    <Sidebar />
    <Content />
    <Entry />
  </div>
</template>
  
<style scoped>
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
</style>
  