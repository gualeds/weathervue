import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import CityView from "./views/CityView.vue";
import HomeView from "./views/HomeView.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/city/:cityName",
    name: "City",
    component: CityView,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
