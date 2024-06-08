import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore";

import HomeView from "../views/HomeView.vue";

import RegisterWithFirebase from "../views/auth/firebase/Register.vue";
import LoginWithFirebase from "../views/auth/firebase/Login.vue";
import UserWithFirebase from "../views/auth/firebase/User.vue";

import RegisterWithLaravel from "../views/auth/laravel/Register.vue";
import LoginWithLaravel from "../views/auth/laravel/Login.vue";
import UserWithLaravel from "../views/auth/laravel/User.vue";

import RegisterWithWordpress from "../views/auth/wordpress/Register.vue";
import LoginWithWordpress from "../views/auth/wordpress/Login.vue";
import UserWithWordpress from "../views/auth/wordpress/User.vue";

const redirectToHomeOnLoggedIn = (to, from, next) => {
  if (useAuthStore().loggedIn) next({ name: "index" });
  else next();
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/register-with-firebase",
    name: "register-with-firebase",
    component: RegisterWithFirebase,
    beforeEnter: redirectToHomeOnLoggedIn,
  },
  {
    path: "/login-with-firebase",
    name: "login-with-firebase",
    component: LoginWithFirebase,
    beforeEnter: redirectToHomeOnLoggedIn,
  },
  {
    path: "/user-with-firebase",
    name: "user-with-firebase",
    component: UserWithFirebase,
    meta: { requireAuth: true },
  },
  {
    path: "/register-with-laravel",
    name: "register-with-laravel",
    component: RegisterWithLaravel,
    beforeEnter: redirectToHomeOnLoggedIn,
  },
  {
    path: "/login-with-laravel",
    name: "login-with-laravel",
    component: LoginWithLaravel,
    beforeEnter: redirectToHomeOnLoggedIn,
  },
  {
    path: "/user-with-laravel",
    name: "user-with-laravel",
    component: UserWithLaravel,
    meta: { requireAuth: true },
  },
  {
    path: "/register-with-wordpress",
    name: "register-with-wordpress",
    component: RegisterWithWordpress,
    beforeEnter: redirectToHomeOnLoggedIn,
  },
  {
    path: "/login-with-wordpress",
    name: "login-with-wordpress",
    component: LoginWithWordpress,
    beforeEnter: redirectToHomeOnLoggedIn,
  },
  {
    path: "/user-with-wordpress",
    name: "user-with-wordpress",
    component: UserWithWordpress,
    meta: { requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !useAuthStore().loggedIn) next({ name: "home" });
  else next();
});

export default router;
