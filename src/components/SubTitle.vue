<template>
  <h1 class="subtitle">{{ subtitle }}</h1>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "SubTitle",
  props: {
    subtitle: String,
  },
});
</script>

<style scoped>
.subtitle {
  text-align: left;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  font-size: 15px;
  text-transform: uppercase;
}
</style>
