<template>
  <div class="notification-icon" ref="notificationIcon">
    <button @click="toggleNotifications" class="icon-button">
      <font-awesome-icon :icon="['fas', 'bell']" />
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>

    <div v-if="showNotifications" class="notification-dropdown" ref="notificationDropdown">
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

import api from '../../services/api'


export default {
  name: "Notification",
  data() {
    return {
      showNotifications: false,
      notifications: [],
      unreadCount: 0,
    };
  },
  methods: {
    async toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        this.unreadCount = 0;
        await api.post('/notifications/mark-as-read', {});
        this.unreadCount = 0;
      }
    },

    fetchNotifications() {
      setTimeout(async () => {
        const response = await api.get('/notifications');
        const notifyData = response.data;

        let filte = notifyData.filter(function(notification) {
          return !notification.read_at
        });
        
        this.unreadCount = filte.length;


        filte.forEach(element => {
          this.notifications.push({id: element.data.id,message:element.data.message }) 

        });

        this.unreadCount = this.notifications.length;
      }, 1000);
    },

    handleClickOutside(event) {
      if (
        this.$refs.notificationDropdown &&
        !this.$refs.notificationDropdown.contains(event.target) &&
        !this.$refs.notificationIcon.contains(event.target)
      ) {
        this.showNotifications = false; 
      }
    },
  },
  mounted() {
    this.fetchNotifications();
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
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