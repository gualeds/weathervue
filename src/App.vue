<template>
  <v-responsive class="border rounded">
    <v-app id="app">
      <v-container class="app-header">
        <MainTitle title="WeatherVue" />
      </v-container>

      <v-main>
        <v-container>
          <SubTitle subtitle="Adicionar Cidade" />
          <v-container class="city-input">
            <v-text-field
              clearable
              variant="outlined"
              density="compact"
              color="secondary"
              placeholder="Digite o nome de uma cidade"
              class="custom-text-field"
            ></v-text-field>
            <v-btn color="secondary" class="btn-plus">
              <v-icon size="15px">mdi-map-marker-plus</v-icon>
            </v-btn>
          </v-container>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script lang="ts">
import Vue from "vue";
import MainTitle from "./components/MainTitle.vue";
import SubTitle from "./components/SubTitle.vue";

export default Vue.extend({
  name: "App",

  components: {
    MainTitle,
    SubTitle,
  },

  data: () => ({
    //
  }),
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

.city-input {
  padding: 0;
  display: flex;
  align-items: center;
}

.custom-text-field {
  margin-right: 10px;
  max-width: 350px;
}

.btn-plus {
  margin-left: 5px;
  height: 20px;
}

#app {
  background-image: url("./assets/texture.svg");
  background-repeat: repeat;
}
</style>
