<template>
  <div class="layout">
    <aside class="sidebar">
      <nav>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/about">Sobre</router-link>
          </li>
          <li>
            <router-link to="/contact">Contato</router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
}

/* Menu lateral fixo para telas maiores */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 1rem;
}

/* Estilo do menu */
.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav ul li {
  margin: 1rem 0;
}

.sidebar nav ul li a {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
}

.sidebar nav ul li a:hover {
  text-decoration: underline;
}

/* Conteúdo principal */
.content {
  flex: 1;
  padding: 2rem;
  color: #2c3e50;
  background-color: #ecf0f1;
}

/* Responsividade: para telas menores (por exemplo, até 768px) */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
  
  /* Ajusta a sidebar para ocupar toda a largura */
  .sidebar {
    width: 100%;
    /* Se desejar que o menu fique abaixo do conteúdo, troque a ordem */
    order: 2;
    text-align: center;
  }
  
  /* Ajusta o conteúdo principal */
  .content {
    order: 1;
    padding: 1rem;
  }
}
</style>
