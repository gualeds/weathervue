import axios from "axios";

const OPENWEATHER_API_KEY = process.env.API_WEATHER_KEY;

// Função para obter a latitude e longitude de uma cidade
export const getCoordinates = async (
  city: string,
  state = "",
  country = "",
  limit = 1
) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct`,
    {
      params: {
        q: `${city},${state},${country}`,
        limit: limit,
        appid: OPENWEATHER_API_KEY,
      },
    }
  );
  if (response.data.length > 0) {
    const { lat, lon } = response.data[0];
    return { lat, lon };
  }
  throw new Error("City not found");
};

// Função para obter o clima com base nas coordenadas
export const getWeather = async (lat: number, lon: number) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        lat: lat,
        lon: lon,
        appid: OPENWEATHER_API_KEY,
        units: "metric",
      },
    }
  );
  return response.data;
};
