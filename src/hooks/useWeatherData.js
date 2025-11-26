import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchAirQuality,
  fetchCurrentWeatherByCity,
  fetchCurrentWeatherByCoords,
  fetchOneCallForecast,
} from "../utils/weatherApi";

const INITIAL_CITY = "Mumbai";

const useWeatherData = () => {
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resolvedCity, setResolvedCity] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [lastQuery, setLastQuery] = useState(INITIAL_CITY);

  const handleResponse = useCallback((current) => {
    setWeather(current);
    const formattedCity = [current?.name, current?.sys?.country].filter(Boolean).join(", ");
    setResolvedCity(formattedCity || "");
  }, []);

  const loadForecastBundles = useCallback(async (lat, lon) => {
    const [forecast, aqi] = await Promise.all([fetchOneCallForecast(lat, lon), fetchAirQuality(lat, lon)]);
    setHourly(forecast?.hourly || []);
    setDaily(forecast?.daily || []);
    setAirQuality(aqi?.list?.[0] || null);
  }, []);

  const loadByCity = useCallback(
    async (city) => {
      const trimmed = city?.trim();
      if (!trimmed) {
        setError("Type a city to search.");
        return;
      }
      setIsLoading(true);
      setError("");
      try {
        const current = await fetchCurrentWeatherByCity(trimmed);
        handleResponse(current);
        setLastQuery(trimmed);
        await loadForecastBundles(current.coord.lat, current.coord.lon);
      } catch (err) {
        const msg =
          err?.response?.status === 404
            ? `City "${trimmed}" was not found.`
            : err?.message || "Unable to fetch weather data right now.";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [handleResponse, loadForecastBundles],
  );

  const loadByCoords = useCallback(
    async (lat, lon) => {
      if (lat == null || lon == null) return;
      setIsLoading(true);
      setError("");
      try {
        const current = await fetchCurrentWeatherByCoords(lat, lon);
        handleResponse(current);
        await loadForecastBundles(lat, lon);
      } catch (err) {
        setError("Unable to fetch weather for your location.");
      } finally {
        setIsLoading(false);
      }
    },
    [handleResponse, loadForecastBundles],
  );

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        loadByCoords(latitude, longitude).finally(() => setIsDetectingLocation(false));
      },
      () => {
        setError("We couldn't access your location. Please allow permissions or search manually.");
        setIsDetectingLocation(false);
      },
    );
  }, [loadByCoords]);

  useEffect(() => {
    loadByCity(INITIAL_CITY);
  }, [loadByCity]);

  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  const summary = useMemo(
    () => ({
      weather,
      hourly,
      daily,
      airQuality,
      resolvedCity,
      isLoading,
      error,
      lastQuery,
      loadByCity,
      detectLocation,
      isDetectingLocation,
      refresh: () => {
        if (weather?.coord) {
          loadByCoords(weather.coord.lat, weather.coord.lon);
        } else if (lastQuery) {
          loadByCity(lastQuery);
        }
      },
    }),
    [
      airQuality,
      daily,
      detectLocation,
      error,
      hourly,
      isDetectingLocation,
      isLoading,
      lastQuery,
      loadByCity,
      loadByCoords,
      resolvedCity,
      weather,
    ],
  );

  return summary;
};

export default useWeatherData;

