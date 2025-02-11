<template>
  <div class="action-buttons" v-if="isAdmin">
    <!-- Botão para aprovar -->
    <button
      :disabled="disabled"
      :class="{ disabled: disabled }"
      @click="onApprove"
      class="status-icon btn-approve"
      title="Aprovar"
    >
      <font-awesome-icon :icon="['fas', 'check']" />
    </button>
    <!-- Botão para reprovar/cancelar -->
    <button
      :disabled="disabled"
      :class="{ disabled: disabled }"
      @click="onCancel"
      class="status-icon btn-cancel"
      title="Reprovar"
    >
      <font-awesome-icon :icon="['fas', 'times']" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Actions',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    userType() {
      return localStorage.getItem('user_type') || '';
    },
    isAdmin() {
      return this.userType === 'admin';
    },
  },
  methods: {
    onApprove() {
      this.$emit('action', 'APPROVED');
    },
    onCancel() {
      this.$emit('action', 'CANCELED');
    },
  },
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 0.2rem;
}

.status-icon {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-approve {
  background-color: #4CAF50; /* Verde */
  color: white;
  margin: 0 0.2rem;
}

.btn-approve:hover:not(.disabled) {
  background-color: #45a049;
}

.btn-cancel {
  background-color: #f44336;
  margin: 0 0.2rem;
  color: white;
}

.btn-cancel:hover:not(.disabled) {
  background-color: #e53935;
}

.disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
