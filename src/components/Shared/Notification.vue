<template>
  <div :class="['notification', type]">
    <span>{{ message }}</span>
    <button @click="$emit('close')">X</button>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: { type: String, required: true },
    type: { type: String, default: 'success' },
  },
}
</script>

<style scoped>
.notification {
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.success {
  background-color: #e0f8e9;
  color: #2a7b3a;
}
.error {
  background-color: #fdecea;
  color: #c0392b;
}
button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
</style>
