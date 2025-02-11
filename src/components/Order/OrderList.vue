<template>
  <div class="orderlist">
    <app-header title="Pedidos de Viagem" />
    <div class="new-request" v-if="user_type !== 'admin'">
      <button @click="goToNewRequest" class="btn btn-primary">Novo Pedido</button>
    </div>
    
    <!-- Card para os filtros -->
    <div class="filters-card">
      <div class="filters">
        <!-- Filtro por status -->
        <label for="filter">Status:</label>
        <select id="filter" v-model="filters.status">
          <option value="">Todos</option>
          <option v-for="(label, key) in options.status" :key="key" :value="key">
            {{ label }}
          </option>
        </select>

        <!-- Filtro por período de tempo -->
        <label for="startDate">Partida de:</label>
        <input type="date" id="startDate" v-model="filters.startDate" />

        <label for="endDate">Partida até:</label>
        <input type="date" id="endDate" v-model="filters.endDate" />

        <div class="destiny-search">
        <!-- Filtro por destino -->
        <label for="destination">Destino: </label>
          <input
            type="text"
            id="destination"
            v-model="filters.destination"
            placeholder="Digite o destino"
          />
        </div>
        <button @click="fetchRequests" class="btn btn-primary">Buscar</button>
      
      </div>
    </div>
  

    <loading-spinner v-if="loading" />

    <table v-if="!loading && filteredRequests.length > 0" class="styled-table">
      <thead>
        <tr>
          <th>Solicitante</th>
          <th>Destino</th>
          <th>Data de partida</th>
          <th>Data de retorno</th>
          <th>Status</th>
          <th v-if="user_type === 'admin'">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in filteredRequests" :key="request.id">
          <td>{{ request.user.name }}</td>
          <td>{{ request.destiny }}</td>
          <td>{{ dataBrasileira(request.departure_date) }}</td>
          <td>{{ dataBrasileira(request.return_date) }}</td>
          <td>
            <span :class="`status-badge status-${request.status_order}`">
              {{ request.status_order }}
            </span>
          </td>
          <td v-if="user_type === 'admin'">
            <request-action-buttons
              :disabled="request.status_order !== 'PENDING'"
              @action="(action) => updateStatus(request, action)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="notfound" v-else-if="!loading && filteredRequests.length === 0">
      <p>Nenhum pedido encontrado.</p>

    </div>

    <notification
      v-if="notification.message"
      :type="notification.type"
      :message="notification.message"
      @close="notification.message = ''"
    />
  </div>
</template>

<script>
import api from '../../services/api'
import LoadingSpinner from '../Shared/LoadingSpinner.vue'
import Notification from '../Shared/Notification.vue'
import { formatarDataParaBrasileiro } from '../../utils/dateFormatter';
import AppHeader from '../Shared/AppHeader.vue';
import RequestActionButtons from './Actions.vue';


export default {
  name: 'OrderList',
  components: {
    LoadingSpinner,
    Notification,
    AppHeader,
    RequestActionButtons
  },
  data() {
    return {
      requests: [],
      user_type: '',
      selectedStatus: '',
      loading: false,
      notification: {
        message: '',
        type: '',
      },
      filters: {
        startDate: "",
        endDate: "",
        destination: "",
        status: "",
      },
      options: {
        status: {
          PENDING: "Solicitado",
          APPROVED: "Aprovado",
          CANCELED: "Cancelado"
        }
      }
    }
  },
  computed: {
    filteredRequests() {
      if (this.selectedStatus) {
        return this.requests.filter(r => r.status === this.selectedStatus)
      }
      return this.requests
    },
  },
  created() {
    this.user_type = localStorage.getItem("user_type");
    this.fetchRequests()
  },
  methods: {
    async fetchRequests() {
      this.loading = true
      try {
        const filters = {
          status: this.filters.status,
          departure_date_ini: this.filters.startDate,
          departure_date_end: this.filters.endDate,
          destiny: this.filters.destination,
        };
        const validFilters = Object.fromEntries(
          Object.entries(filters).filter(([key, value]) => value)
        );

        const queryString = new URLSearchParams(validFilters).toString();
        const response = await api.get('/order?' + queryString)
        this.requests = response.data.orders
        this.options.status = response.data.options.status
      } catch (error) {
        this.showNotification('Erro ao buscar pedidos.', 'error')
      } finally {
        this.loading = false
      }
    },
    async updateStatus(request, status) {
      let route = status === 'APPROVED' ? 'approve' : 'cancel'
      try {
        await api.put(`/order/${request.id}/${route}`)
        request.status_order = status
        this.showNotification('Status atualizado com sucesso!', 'success')
      } catch (error) {
        this.showNotification('Erro ao atualizar status.', 'error')
      }
    },
    goToNewRequest() {
      this.$router.push({ name: 'NewRequest' })
    },
    showNotification(message, type) {
      this.notification.message = message
      this.notification.type = type
      setTimeout(() => {
        this.notification.message = ''
      }, 3000)
    },
    dataBrasileira(date) {
      return formatarDataParaBrasileiro(date);
    }
  },
}
</script>

<style scoped>
.orderlist {
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}

/* Card de filtros */
.filters-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 20px;
}

/* Estilização dos filtros */
.filters {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filters label {
  font-weight: bold;
  color: #555;
}

.filters select,
.filters input[type="date"],
.filters input[type="text"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.styled-table th,
.styled-table td {
  padding: 1rem;
  text-align: left;
}

.styled-table th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.styled-table tbody tr {
  border-bottom: 1px solid #ddd;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: capitalize;
}

.status-PENDING {
  background-color: #ffc107;
  color: #333;
}

.status-APPROVED {
  background-color: #28a745;
  color: white;
}

.status-CANCELED {
  background-color: #dc3545;
  color: white;
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
  background-color: #f44336; /* Vermelho */
  margin: 0 0.2rem;
  color: white;
}

.btn-cancel:hover:not(.disabled) {
  background-color: #e53935;
}

.disabled {
  background-color: #cccccc; /* Cinza */
  cursor: not-allowed;
  opacity: 0.7;
}

.notification {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 1rem;
  border-radius: 4px;
  color: white;
  font-weight: bold;
}

.notification.success {
  background-color: #28a745;
}

.notification.error {
  background-color: #dc3545;
}

.new-request {
  margin-bottom: 1rem;
} 

.notfound {
  text-align: center;
  margin-top: 1rem;
}

h1 {
  margin-bottom: 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.header-title {
  margin: 0;
}

.header-link a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

</style>
