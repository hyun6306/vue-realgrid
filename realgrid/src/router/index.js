import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Logout from "../views/UserLogout.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/logout",
    component: Logout,
  },
  {
    path: "/manager/list",
    component: () => import("@/views/manager/DataList.vue"),
  },
  {
    path: "/manager/findPassword",
    component: () => import("@/views/manager/FindPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
