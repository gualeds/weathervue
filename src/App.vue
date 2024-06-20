<template>
  <div id="container">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
export default Vue.extend({
  name: "App",
  components: {
    HelloWorld,
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#container {
  margin: 0;
  padding: 0;
  background-color: aqua;
  box-sizing: border-box;
}
</style>
