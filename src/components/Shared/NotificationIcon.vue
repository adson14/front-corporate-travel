<template>
  <div class="notification-icon">
    <button @click="toggleNotifications" class="icon-button">
      <i class="fas fa-bell"></i>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>

    <div v-if="showNotifications" class="notification-dropdown">
      <div v-if="notifications.length > 0">
        <div v-for="notification in notifications" :key="notification.id" class="notification-item">
          {{ notification.message }}
        </div>
      </div>
      <div v-else class="notification-empty">
        Nenhuma notificação nova.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationIcon",
  data() {
    return {
      showNotifications: false,
      notifications: [],
      unreadCount: 0, 
    };
  },
  methods: {
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        this.unreadCount = 0;
      }
    },

    fetchNotifications() {

      setTimeout(() => {
        this.notifications = [
          { id: 1, message: "Nova mensagem recebida" },
          { id: 2, message: "Sua encomenda foi enviada" },
        ];
        this.unreadCount = this.notifications.length;
      }, 1000);
    },
  },
  mounted() {
    this.fetchNotifications();
  },
};
</script>

<style scoped>
.notification-icon {
  position: relative;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #2c3e50;
  position: relative;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
}

.notification-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.notification-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-empty {
  padding: 10px;
  text-align: center;
  color: #888;
}
</style>