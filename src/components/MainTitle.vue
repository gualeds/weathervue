<template>
  <h1 class="title">{{ title }}</h1>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MainTitle",
  props: {
    title: String,
  },
});
</script>

<style scoped>
.title {
  text-align: left;
  font-family: "Raleway", sans-serif;
  font-size: 25px;
  text-transform: uppercase;
}
</style>
