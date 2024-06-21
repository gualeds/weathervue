<template>
  <v-responsive class="border rounded">
    <v-container class="app-header">
      <MainTitle title="WeatherVue" />
    </v-container>

    <v-main>
      <v-container>
        <SubTitle subtitle="Adicionar Cidade" />
        <v-container class="city-input">
          <v-autocomplete
            v-model="city"
            :items="citySuggestions"
            clearable
            variant="outlined"
            density="compact"
            color="secondary"
            no-data-text="Nada a exibir."
            placeholder="Digite o nome de uma cidade"
            class="custom-text-field"
            @update:search-input="fetchCitySuggestions"
          ></v-autocomplete>
          <div class="btn-container">
            <v-btn color="secondary" class="btn-plus" @click="addCity">
              <v-icon size="15px">mdi-map-marker-plus</v-icon>
            </v-btn>
            <v-btn
              color="secondary"
              class="btn-reset"
              @click="removeLocalStorage"
            >
              <v-icon size="15px">mdi-reload</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-container>
      <v-container class="card-container">
        <div v-for="(city, index) in displayedCities" :key="index" class="card">
          <CityCard
            :temperature="kelvinToCelsius(city?.temperature).toFixed(0)"
            :humidity="city.humidity"
            :weatherDescription="city.weatherDescription"
            :cityName="city.cityName"
            :stateName="city.stateName"
            :icon="city.icon"
            :latitude="city.latitude"
            :longitude="city.longitude"
            @go-to-city-view="goToCityView"
          />
        </div>
      </v-container>
    </v-main>
  </v-responsive>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";

const OPENWEATHER_API_KEY = "6f75677a7bc055206bcec8c6f7d150b3";

interface CityInfo {
  temperature: number;
  humidity: number;
  weatherDescription: string;
  cityName: string;
  stateName: string;
  icon: string;
  latitude: number;
  longitude: number;
}
export default Vue.extend({
  name: "HomeView",
  components: {
    MainTitle: () => import("@/components/MainTitle.vue"),
    SubTitle: () => import("@/components/SubTitle.vue"),
    CityCard: () => import("@/components/CityCard.vue"),
  },

  data: () => ({
    city: "",
    citySuggestions: [] as Array<string>,
    selectedCities: [] as CityInfo[],
  }),
  computed: {
    displayedCities(): CityInfo[] {
      const preDefinedCities = this.selectedCities.slice(0, 5);
      const userAddedCities = this.selectedCities.slice(5);
      return [...preDefinedCities, ...userAddedCities];
    },
  },
  created() {
    this.retrieveSelectedCities();
  },
  mounted() {
    this.fetchPredefinedCities();
  },

  methods: {
    retrieveSelectedCities() {
      const selectedCities = localStorage.getItem("selectedCities");
      if (selectedCities) {
        this.selectedCities = JSON.parse(selectedCities);
      }
    },
    kelvinToCelsius(kelvin: number): number {
      return kelvin - 273.15;
    },
    async fetchPredefinedCities() {
      const citiesCoordinates = [
        { latitude: 40.7128, longitude: -74.006 },
        { latitude: -8.0584933, longitude: -34.8848193 },
        { latitude: -8.2829702, longitude: -35.9722852 },
        { latitude: -7.976317, longitude: -35.5817327 },
        { latitude: -7.2246743, longitude: -35.8771292 },
      ];

      for (const coords of citiesCoordinates) {
        try {
          // Verificar se a cidade já está presente em selectedCities
          const exists = this.selectedCities.some(
            (city) =>
              city.latitude === coords.latitude &&
              city.longitude === coords.longitude
          );

          // Se a cidade não estiver presente, buscar informações e adicionar a selectedCities
          if (!exists) {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather`,
              {
                params: {
                  lat: coords.latitude,
                  lon: coords.longitude,
                  appid: "6f75677a7bc055206bcec8c6f7d150b3",
                },
              }
            );

            const cityInfo: CityInfo = {
              temperature: response?.data?.main?.temp,
              humidity: response?.data?.main?.humidity?.toString(),
              weatherDescription: response?.data?.weather[0].description,
              cityName: response?.data?.name,
              stateName: response?.data?.sys?.country,
              icon: response?.data?.weather[0]?.icon,
              latitude: coords?.latitude,
              longitude: coords?.longitude,
            };

            this.selectedCities.push(cityInfo);
          }
        } catch (error) {
          console.error("Erro ao obter informações da cidade:", error);
        }
      }
    },

    async fetchCitySuggestions(query: string) {
      if (typeof query === "string" && query.length > 2) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct`,
            {
              params: {
                q: query,
                limit: 5,
                appid: OPENWEATHER_API_KEY,
              },
            }
          );

          this.citySuggestions = response.data.map(
            (location: any) =>
              `${location.name}, ${location.state}, ${location.country}`
          );
        } catch (error) {
          console.error("Error fetching city suggestions:", error);
        }
      } else {
        this.citySuggestions = [];
      }
    },
    async addCity() {
      if (this.city) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct`,
            {
              params: {
                q: this.city,
                limit: 1,
                appid: OPENWEATHER_API_KEY,
              },
            }
          );

          if (response?.data?.length > 0) {
            const { lat, lon } = response?.data[0];

            const exists = this.selectedCities.some(
              (city) => city.latitude === lat && city.longitude === lon
            );

            if (!exists) {
              await this.fetchWeatherData(lat, lon);
            } else {
              console.log("Cidade já adicionada.");
            }
          } else {
            console.log(`Nenhuma coordenada para a cidade ${this?.city}`);
          }
        } catch (error) {
          console.error("Erro ao obter coordenadas:", error);
        }
      } else {
        console.log("Campo de pesquisa vazio.");
      }
    },
    async removeLocalStorage() {
      localStorage.removeItem("selectedCities");
      this.selectedCities = [];
    },

    async fetchWeatherData(lat: number, lon: number) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              lat,
              lon,
              appid: "6f75677a7bc055206bcec8c6f7d150b3",
            },
          }
        );

        const cityInfo: CityInfo = {
          temperature: response?.data?.main.temp,
          humidity: response?.data?.main?.humidity?.toString(),
          weatherDescription: response?.data?.weather[0].description,
          cityName: response?.data?.name,
          stateName: response?.data?.sys?.country,
          icon: response?.data?.weather[0]?.icon,
          latitude: lat,
          longitude: lon,
        };
        this.selectedCities.unshift(cityInfo);
        // Save selectedCities to localStorage
        localStorage.setItem(
          "selectedCities",
          JSON.stringify(this.selectedCities)
        );
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    goToCityView({
      latitude,
      longitude,
    }: {
      latitude: number;
      longitude: number;
    }) {
      this.$router.push(`/city/${latitude}/${longitude}`);
    },
  },
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
.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 10px;
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

  @media (max-width: 1024px) {
    max-width: calc(50% - 20px);
  }
  @media (max-width: 768px) {
    max-width: calc(100% - 20px);
  }
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
</style>
