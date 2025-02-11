<template>
  <div class="header">
    <h1 class="header-title">{{ title }}</h1>
    <div class="header-link">
      <a href="#" @click.prevent="logout">Sair</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user_type');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
}

.header-title {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.header-link a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  cursor: pointer;
}
</style>
