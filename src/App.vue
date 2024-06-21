<template>
  <v-responsive class="border rounded">
    <v-app id="app">
      <router-view></router-view>
    </v-app>
  </v-responsive>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/HomeView.vue"),
  },
  {
    path: "/city/:lat/:lon",
    name: "City",
    component: () => import("./views/CityView.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default Vue.extend({
  name: "App",
  components: {},
  router,
});
</script>

<style lang="scss">
.app-header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: left;
  align-content: start;
}

#app {
  background-image: url("/public/texture.svg");
  background-repeat: repeat;
  font-family: "Open Sans", sans-serif;
}
body {
  background-image: url("/public/texture.svg");
  background-repeat: repeat;
  font-family: "Open Sans", sans-serif;
}
</style>
