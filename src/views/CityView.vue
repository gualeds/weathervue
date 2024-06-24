<template>
  <v-container class="city-view">
    <router-link to="/" class="go-back"
      >Voltar para a lista de cidades</router-link
    >
    <MainTitle title="WeatherVue" class="main-title" />
    <SubTitle :subtitle="'Previsão de 5 dias para ' + cityName" />
    <v-main class="main-container">
      <v-container class="weather-chart-container">
        <div class="weather-chart" v-if="forecastChartData.length > 0">
          <WeatherChart :chartData="forecastChartData" />
        </div>
        <div v-else>
          <p>Aguardando dados da previsão do tempo...</p>
        </div>
      </v-container>
      <v-container class="forecast-data">
        <MainTitle title="Temperaturas máximas e mínimas a cada 3h" />
        <v-container class="forecast-items">
          <div
            class="forecast-item"
            v-for="(forecast, index) in forecastChartData"
            :key="index"
          >
            <p class="forecast-date">{{ formatDateTime(forecast.dt_txt) }}</p>
            <p>Temperatura Máx.: {{ forecast.main.temp_max }}°C</p>
            <p>Temperatura Mín.: {{ forecast.main.temp_min }}°C</p>
          </div>
        </v-container>
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
import WeatherChart from "../components/WeatherChart.vue";
import WeatherService from "../services/WeatherService";

export default {
  name: "CityView",
  components: {
    WeatherChart,
    MainTitle: () => import("../components/MainTitle.vue"),
    SubTitle: () => import("../components/SubTitle.vue"),
  },
  data() {
    return {
      cityName: "",
      forecastData: null,
      forecastChartData: [],

      OPENWEATHER_API_KEY: process.env.VUE_APP_OPENWEATHER_API_KEY,
    };
  },
  async created() {
    const { lat, lon } = this.$route.params;
    await this.fetchForecastData(lat, lon);
  },
  methods: {
    formatDateTime(dateTimeString) {
      const dateTime = new Date(dateTimeString);

      const date = dateTime.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      const time = dateTime.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${date} ás ${time}`;
    },
    async fetchForecastData(lat, lon) {
      try {
        this.clearData();
        const data = await WeatherService.fetchForecastData(lat, lon);
        this.cityName = data.city.name;
        this.forecastData = data;
        this.extractChartData();
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    },
    clearData() {
      this.cityName = "";
      this.forecastData = null;
      this.forecastChartData = [];
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString();
    },
    extractChartData() {
      if (this.forecastData && this.forecastData.list) {
        this.forecastChartData = this.forecastData.list.map((forecast) => ({
          dt_txt: forecast.dt_txt,
          main: forecast.main,
          weather: forecast.weather,
        }));
        console.log("Forecast Chart Data:", this.forecastChartData);
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.forecast-data {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 100px;
}
.forecast-date {
  font-weight: bold;
}
.main-title {
  margin-top: 10px;
}
.go-back {
  margin-bottom: 20px;
  text-decoration: none;
  font-size: 15px;
  font-weight: bold;
  background-image: linear-gradient(90deg, #8e78e7f6 0%, #32577ce3 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  border: 2px solid;
  border-image: linear-gradient(90deg, #8e78e7f6 0%, #32577ce3 100%);
  border-image-slice: 1;
  padding: 5px;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    background: linear-gradient(90deg, #8e78e7f6 0%, #32577ce3 100%);
    color: white;
  }
}

.forecast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 10px;
  border: 1px solid #ffffff;
  background: linear-gradient(90deg, #e0d8fff6 0%, #a9b9c973 100%);
}

.forecast-items {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  padding: 10px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
    margin-top: 0;

    .forecast-item {
      margin: 10px 0;
    }
  }
}
.city-view {
  padding: 20px;
  width: 100%;
}
.weather-chart {
  width: 800px;
  max-width: 100%;
  @media (max-width: 480px) {
    width: 100%;
  }
}

.weather-chart-container {
  display: flex;
  justify-content: center;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: -230px;
  }
}
</style>
