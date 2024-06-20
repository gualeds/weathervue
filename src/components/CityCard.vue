<template>
  <v-card class="card">
    <v-card-item class="illustration">
      <div>
        <img src="../assets/sunny.svg" class="card-img" />
      </div>
    </v-card-item>
    <v-card-item class="maininfo">
      <v-card-title class="temperature">{{ temperature }}</v-card-title>
      <v-card-title class="subinfo"
        ><v-icon color="white" size="15px">mdi-water</v-icon>{{ humidity }}% |
        {{ weatherDescription }}</v-card-title
      >
      <v-card-title class="subinfo"
        >{{ cityName }}, {{ stateName }}</v-card-title
      >
      <v-btn class="btn" color="#545B5A" height="25px" width="auto"
        >Previsão de 5 dias</v-btn
      >
    </v-card-item>

    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CityCard",
  props: {
    temperature: String,
    humidity: String,
    weatherDescription: String,
    cityName: String,
    stateName: String,
  },
});
</script>

<style scoped>
.card {
  background: linear-gradient(90deg, #aad4a3 0%, #8ac6ba 100%);
  min-width: 290px;
  max-width: 450px;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
  padding: 10px;
}
.card-img {
  width: 80px;
  height: 80px;
}
.maininfo {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  width: 60%;
  letter-spacing: 0;
  padding: 0;
}
.subinfo {
  color: white;
  font-family: "Opem Sans", sans-serif;
  font-size: 1rem;
  letter-spacing: 0;
  width: 100%;
  padding: 0;
  line-height: 1.2;
}
.temperature {
  color: white;
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: 300; /* Condensed Light */
  font-size: 4rem;
  letter-spacing: 0;
  padding: 0;
  line-height: 1.4;
}

.illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
}

.btn {
  border-radius: 30px;
  margin-top: 10px;
  color: white;
  height: 10px;
}

@media (max-width: 480px) {
  .btn {
    width: 300px;
  }
}
</style>
