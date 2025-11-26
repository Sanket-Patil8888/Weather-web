import Axios from "axios";

const API_BASE_URL = process.env.REACT_APP_OPENWEATHER_BASE_URL || "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const DEFAULT_UNITS = "metric";

const client = Axios.create({
  baseURL: API_BASE_URL,
  params: {
    appid: API_KEY,
    units: DEFAULT_UNITS,
  },
});

function ensureKey() {
  if (!API_KEY) {
    throw new Error("Missing OpenWeather API key. Set REACT_APP_OPENWEATHER_API_KEY in your environment.");
  }
}

export async function fetchCurrentWeatherByCity(city) {
  ensureKey();
  const response = await client.get("/weather", {
    params: { q: city },
  });
  return response.data;
}

export async function fetchCurrentWeatherByCoords(lat, lon) {
  ensureKey();
  const response = await client.get("/weather", {
    params: { lat, lon },
  });
  return response.data;
}

export async function fetchOneCallForecast(lat, lon) {
  ensureKey();
  const response = await client.get("/onecall", {
    params: {
      lat,
      lon,
      exclude: "minutely,alerts",
    },
  });
  return response.data;
}

export async function fetchAirQuality(lat, lon) {
  ensureKey();
  const response = await client.get("/air_pollution", {
    params: { lat, lon },
  });
  return response.data;
}

export const weatherApiConfig = {
  API_BASE_URL,
  API_KEY,
  DEFAULT_UNITS,
};

