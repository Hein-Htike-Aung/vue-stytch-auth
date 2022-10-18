import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./views/HomeView.vue"),
    meta: {
      requiresAuth: {
        requiresAuth: true,
      },
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./views/RegisterView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Authentication check

    const token = localStorage.getItem("token");

    if (token) {
      // check if the token is valid
      return next();
    }

    return next("/login");
  }

  next();
});

export default router;
