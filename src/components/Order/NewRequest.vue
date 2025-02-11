<template>

  <div class="new-request">
    <app-header title="Novo Pedido de Viagem" />

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="destination">Destino:</label>
        <input
          id="destiny"
          v-model="destiny"
          placeholder="Digite o destino"
          required
        />
      </div>

      <div class="form-group">
        <label for="departureDate">Data de Ida:</label>
        <input
          id="departureDate"
          type="date"
          v-model="departureDate"
          required
        />
      </div>

      <div class="form-group">
        <label for="returnDate">Data de Retorno:</label>
        <input
          id="returnDate"
          type="date"
          v-model="returnDate"
          required
        />
      </div>

      <div class="buttons">
        <button type="button" :disabled="loading" class="cancel-button"  @click="cancel" >
          <span v-if="loading">Enviando...</span>
          <span v-else>Cancelar</span>
        </button>
        <button type="submit" :disabled="loading" class="submit-button">
          <span v-if="loading">Enviando...</span>
          <span v-else>Enviar Pedido</span>
        </button>
      </div>

    </form>

    <notification
      v-if="notification.message"
      :type="notification.type"
      :message="notification.message"
      @close="notification.message = ''"
    />
  </div>
</template>

<script>
import api from '../../services/api';
import Notification from '../Shared/Notification.vue';
import AppHeader from '../Shared/AppHeader.vue';

export default {
  name: 'NewRequest',
  components: {
    Notification,
    AppHeader,
  },
  data() {
    return {
      destiny: '',
      departureDate: '',
      returnDate: '',
      loading: false,
      notification: {
        message: '',
        type: '',
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        await api.post('/order', {
          user_id: localStorage.getItem("user_id"), 
          destiny: this.destiny,
          departure_date: this.departureDate,
          return_date: this.returnDate,
        });
        this.notification.message = 'Pedido criado com sucesso!';
        this.notification.type = 'success';
        setTimeout(() => {
          this.$router.push({ name: 'Dashboard' });
        }, 1500);
      } catch (error) {
        this.notification.message = 'Erro ao criar pedido.';
        this.notification.type = 'error';
      } finally {
        this.loading = false;
      }
    },
    cancel(){
      this.$router.push({ name: 'Dashboard' });
    }
  },
};
</script>

<style scoped>
.new-request {
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}


.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #333;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #4CAF50;
  outline: none;
}

.submit-button {
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button {
  padding: 0.75rem;
  background-color: #d8372c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


.submit-button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  background-color: #45a049;
}

.cancel-button:hover:not(:disabled) {
  background-color: #f37665;
}

.buttons {
  display: flex; 
  flex-direction: row;
  justify-content: space-between;
} 
</style>