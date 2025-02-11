<template>
  <div class="dashboard">
    <order-list/>
  </div>
</template>

<script>

import OrderList from '../Order/OrderList.vue';


export default {
  name: 'Dashboard',
  components: {
    OrderList
  },
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
