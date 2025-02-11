import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard/index.vue";
import Login from "../components/Auth/Login.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "/",
          name: "Dashboard",
          component: Dashboard,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(!isAuthenticated());

  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
