<template>
  <v-card :id="'weather-icon-' + icon" class="card">
    <v-card-title class="illustration">
      <div>
        <img :src="getWeatherIcon(icon)" class="card-img" />
      </div>
    </v-card-title>
    <v-card-title class="maininfo">
      <v-card-title class="temperature">{{ temperature }}°C</v-card-title>
      <v-card-title class="subinfo"
        ><v-icon class="iconweather" color="white" size="15px">mdi-water</v-icon
        >{{ humidity.toString() }}% |
        {{ getWeatherDescription(icon) }}</v-card-title
      >
      <v-card-title class="subinfo"
        >{{ cityName }}, {{ stateName }}</v-card-title
      >
      <div class="btn-container">
        <v-btn
          class="btn"
          color="#545B5A"
          height="25px"
          width="auto"
          @click="redirectToCityView"
          >Previsão de 5 dias</v-btn
        >
      </div>
    </v-card-title>
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
    icon: String,
    latitude: Number,
    longitude: Number,
    goToCityView: Function,
  },
  methods: {
    redirectToCityView() {
      this.$emit("go-to-city-view", {
        latitude: this.latitude,
        longitude: this.longitude,
      });
    },
    getWeatherIcon(icon: string): string {
      // Mapeie o ícone retornado pela API OpenWeatherMap para o caminho da imagem local
      switch (icon) {
        case "01d":
          return require("@/assets/cloudy.svg");
        case "01n":
          return require("@/assets/cloudy.svg");
        case "02d":
          return require("@/assets/cloudy.svg");
        case "02n":
          return require("@/assets/cloudy.svg");
        case "03d":
          return require("@/assets/sunny.svg");
        case "03n":
          return require("@/assets/sunny.svg");
        case "04d":
          return require("@/assets/cloudy.svg");
        case "04n":
          return require("@/assets/cloudy.svg");
        case "09d":
          return require("@/assets/rainy.svg");
        case "09n":
          return require("@/assets/rainy.svg");
        case "10d":
          return require("@/assets/rainy.svg");
        case "10n":
          return require("@/assets/rainy.svg");
        case "11d":
          return require("@/assets/thunderstorm.svg");
        case "11n":
          return require("@/assets/thunderstorm.svg");
        case "13d":
          return require("@/assets/snowy.svg");
        case "13n":
          return require("@/assets/snowy.svg");
        case "50d":
          return require("@/assets/misty.svg");
        case "50n":
          return require("@/assets/misty.svg");
        default:
          return require("@/assets/sunny.svg");
      }
    },
    getWeatherDescription(weatherDescription: string): string {
      // Mapeie o ícone retornado pela API OpenWeatherMap para o caminho da imagem local
      switch (weatherDescription) {
        case "01d":
          return "Céu Limpo";
        case "01n":
          return "Céu Limpo";
        case "02d":
          return "Poucas nuvens";
        case "02n":
          return "Poucas nuvens";
        case "03d":
          return "Nuvens dispersas";
        case "03n":
          return "Nuvens dispersas";
        case "04d":
          return "Nublado";
        case "04n":
          return "Nublado";
        case "09d":
          return "Chuva fraca";
        case "09n":
          return "Chuva fraca";
        case "10d":
          return "Chuva";
        case "10n":
          return "Chuva";
        case "11d":
          return "Tempestade";
        case "11n":
          return "Tempestade";
        case "13d":
          return "Nevando";
        case "13n":
          return "Nevando";
        case "50d":
          return "Névoa";
        case "50n":
          return "Névoa";
        default:
          return require("@/assets/sunny.svg");
      }
    },
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

  &:hover {
    cursor: pointer;
  }
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
  font-weight: 300;
  font-size: 4rem;
  letter-spacing: 0;
  padding: 0;
  line-height: 1.4;
  text-align: left;
  width: 100%;
}

.illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
}
.btn-container {
  display: flex;
  align-items: left;
  justify-content: left;
  width: 100%;
}
.btn {
  border-radius: 30px;
  margin-top: 10px;
  color: white;
  height: 10px;

  @media (max-width: 480px) {
    width: 100%;
    height: 20px;
    font-size: 0.7rem;
  }
}
/* Estilos dos cards */
#weather-icon-01d,
#weather-icon-01n {
  background: linear-gradient(90deg, #f6f7e2f6 0%, rgb(132, 157, 160) 100%);
}

#weather-icon-02d,
#weather-icon-02n {
  background: linear-gradient(90deg, #f6f7e2f6 0%, rgb(132, 157, 160) 100%);
}
#weather-icon-03d,
#weather-icon-03n {
  background: linear-gradient(90deg, #aad4a3 0%, #8ac6ba 100%);
}
#weather-icon-04d,
#weather-icon-04n {
  background: linear-gradient(90deg, #f6f7e2f6 0%, rgb(132, 157, 160) 100%);
}
#weather-icon-09d,
#weather-icon-09n {
  background: linear-gradient(90deg, #b2c8f7f6 0%, rgb(83, 129, 255) 100%);
}
#weather-icon-10d,
#weather-icon-10n {
  background: linear-gradient(90deg, #b2c8f7f6 0%, rgb(83, 129, 255) 100%);
}
#weather-icon-11d,
#weather-icon-11n {
  background: linear-gradient(90deg, #1f033af6 0%, rgb(0, 31, 114) 100%);
}
#weather-icon-13d,
#weather-icon-13n {
  background: linear-gradient(
    90deg,
    #4d555fb4 0%,
    rgba(234, 222, 252, 0.836) 100%
  );
}
#weather-icon-50d,
#weather-icon-50n {
  background: linear-gradient(90deg, #8f8d97f6 0%, #a9b9c9 100%);
}

@media (max-width: 480px) {
  .btn {
    width: 300px;
  }
}
</style>
