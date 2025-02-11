<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="loading">
        <span v-if="loading">Entrando...</span>
        <span v-else>Entrar</span>
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import api from '../../services/api'
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: '',
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = ''
      try {
        const response = await api.post('/login', {
          email: this.email,
          password: this.password,
        })
        const token = response.data.access_token
        const decodedToken = this.decodeJWT(token);
        localStorage.setItem('token', token)
        localStorage.setItem('user_type', decodedToken.user_type)
        this.$router.push({ name: 'Dashboard' })
      } catch (err) {
        console.log(err)
        this.error = 'Usuário ou senha inválidos.'
      } finally {
        this.loading = false
      }
    },
    decodeJWT(token) {
      try {
        const [header, payload, signature] = token.split('.');

        const decodedPayload = atob(payload);

        return JSON.parse(decodedPayload);
      } catch (error) {
        console.error('Erro ao decodificar o JWT:', error);
        return null;
      }
    }
  },
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .login-container {
    max-width: 500px;
    padding: 3rem;
    margin: 5% auto;
  }
}

.login-container h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #6a11cb;
  outline: none;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #6a11cb;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #5a0ebc;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
