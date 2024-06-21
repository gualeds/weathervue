import axios from "axios";

export const OPENWEATHER_API_KEY = "6f75677a7bc055206bcec8c6f7d150b3";
export interface CityInfo {
  temperature: number;
  humidity: number;
  weatherDescription: string;
  cityName: string;
  stateName: string;
  icon: string;
  latitude: number;
  longitude: number;
}

const WeatherService = {
  async fetchForecastData(lat: number, lon: number) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            lat,
            lon,
            appid: OPENWEATHER_API_KEY,
            units: "metric",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      throw error;
    }
  },
};

export default WeatherService;
