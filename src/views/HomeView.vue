<template>
  <v-responsive class="border rounded">
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
      <v-container class="card-container">
        <div class="card">
          <CityCard
            temperature="20°"
            humidity="50"
            weatherDescription="Nublado"
            cityName="São Paulo"
            stateName="SP"
          />
        </div>
        <div class="card">
          <CityCard
            temperature="20°"
            humidity="50"
            weatherDescription="Nublado"
            cityName="São Paulo"
            stateName="SP"
          />
        </div>
        <div class="card">
          <CityCard
            temperature="20°"
            humidity="50"
            weatherDescription="Nublado"
            cityName="São Paulo"
            stateName="SP"
          />
        </div>
        <div class="card">
          <CityCard
            temperature="20°"
            humidity="50"
            weatherDescription="Nublado"
            cityName="São Paulo"
            stateName="SP"
          />
        </div>
        <div class="card">
          <CityCard
            temperature="20°"
            humidity="50"
            weatherDescription="Nublado"
            cityName="São Paulo"
            stateName="SP"
          />
        </div>
        <div class="card">
          <CityCard
            temperature="20°"
            humidity="50"
            weatherDescription="Nublado"
            cityName="São Paulo"
            stateName="SP"
          />
        </div>
        <div class="card">
          <CityCard
            temperature="20°"
            humidity="50"
            weatherDescription="Nublado"
            cityName="São Paulo"
            stateName="SP"
          />
        </div>
      </v-container>
    </v-main>
  </v-responsive>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    MainTitle: () => import("@/components/MainTitle.vue"),
    SubTitle: () => import("@/components/SubTitle.vue"),
    CityCard: () => import("@/components/CityCard.vue"),
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

.card-container {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  width: 100%;
  align-items: start;
  justify-content: start;
  align-content: start;
}

.card {
  flex: 1 1 calc(33.333% - 20px);
  padding: 10px;
  box-sizing: border-box;
  justify-content: left;
  display: flex;
  max-width: 33%;
}

@media (max-width: 768px) {
  .card {
    flex: 1 1 calc(50% - 20px);
    max-width: 50%;
  }
}

@media (max-width: 480px) {
  .card {
    flex: 1 1 calc(100% - 20px);
    max-width: 100%;
  }
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
